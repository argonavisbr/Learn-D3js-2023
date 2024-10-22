import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const dim = {width: 600, height: 300};

// configure scale and color functions with output range
const app = {
    xscale: d3.scaleLinear().range([0, dim.width-140]),
    yscale:  d3.scaleLinear().range([1, dim.height]),
    color: d3.scaleOrdinal(d3.schemeTableau10),
    fmt: d3.format(".2f"),
    current: 'avg',
    barHeight: 0,
    data: [],
    charts: new Map()
}

app.charts.set("min", {title: 'Minimum'});
app.charts.set("avg", {title: 'Average'});
app.charts.set("max", {title: 'Maximum'});

export {dim, app};