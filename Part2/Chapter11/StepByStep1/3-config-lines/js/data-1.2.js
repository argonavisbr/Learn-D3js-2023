import * as d3 from "https://cdn.skypack.dev/d3@7";
import {app, data} from "./common-1.1.js";

// Global temperatures 1880 to 2023 (Source: https://data.giss.nasa.gov/gistemp/)
const file = "../../data/GLB.Ts.1880.2024.csv";

// Load, parse and prepare the data
export async function load() {
    const csv = await d3.csv(file, d3.autoType);
    
    data.months = csv.columns.splice(1);

    // Convert data to a standard format
    // [[year, [['Jan', t1], ['Feb, t2], ..., ['Dec',t12]]], ...]
    data.years = csv.map(obj => [obj.Year, data.months.map(d => [d, obj[d]])]);

    config(); // configure domains and other functions
}

function config() {
    // Scale domains
    app.scale.month.domain(data.months);

    const series = data.years.map( d => d[1].map(v => v[1]) );
    app.scale.temp.domain(d3.extent(series.flat()));

    const mean   = series.map(d => d3.mean(d));
    app.color = d3.scaleSequential(d3.interpolateTurbo)
        .domain(d3.extent(mean));

    // Line function
    app.line = d3.line()
                 .x(d => app.scale.month(d[0]))
                 .y(d => app.scale.temp(d[1]))
                 .defined(d => d[1] && !isNaN(d[1]))  // ignores null and not-a-number
                 .curve(d3.curveCatmullRom);
}