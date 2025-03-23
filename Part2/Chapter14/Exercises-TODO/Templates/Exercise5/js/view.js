import * as d3 from 'https://cdn.skypack.dev/d3@7';

import {dim, app} from './common.js';
import {drawLegend} from './legend.js';
import * as tooltip from './tooltips.js';

// Exercise.
// 1) See common.js
// 2) Import the detail.js module
// ADD CODE HERE

import * as utils from "../../../../js/chart-utils.js";

export function draw() {
    d3.select("#chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${dim.w} ${dim.h}`);

    drawAxes();

    // Exercise.
    // 3) Call brush.setup() to install brush behavior here, between axes and chart
    //    so that it doesn't block legend events or tooltips. Don't forget to import it.
    // ADD CODE HERE

    drawChart();
    drawLegend();
    tooltip.draw();
}

function drawChart() {
    d3.select("svg")
      .selectAll("circle.dot")
        .data(app.data.countries)
          .join("circle").attr("class", "dot")
            .attr("r", d => app.scale.r(d.pop))  // added variable radius
            .attr("cx", d => app.scale.x(d.hdi))
            .attr("cy", d => app.scale.y(d.gdp))
            .style("fill", d => app.color(d.continent))
            .on("mouseenter", tooltip.show)                  // added for tooltip events
            .on("mouseleave", tooltip.clear);
}

function drawAxes() {
    [app.axis.x, app.axis.y] =
        utils.cartesianAxes().container(d3.select("svg"))
         .xScale(app.scale.x)
         .yScale(app.scale.y)
         .xLabel('Human Development Index (HDI)')
         .yLabel('Annual GDP per capita (International USD)')
         .showHorizontalGrid(true)
         .showVerticalGrid(true)();
    d3.select(".x-axis .label").attr("dy", "-1em");
    app.axis.y.ticks(8, ',');
    d3.select(".y-axis").call(app.axis.y);
}