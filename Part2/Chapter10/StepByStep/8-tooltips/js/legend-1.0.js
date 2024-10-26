import * as d3 from 'https://cdn.skypack.dev/d3@7';
import {dim, app} from './constants-1.5.js';

export function drawLegend() {
    const legend = d3.select("svg")
                     .append("g")
                       .attr("class", "legend")
                       .attr("transform", `translate(${[85, 50]})`);

    legend.selectAll("g.item")
          .data(app.data.continents)
             .join("g").attr("class", "item")
                .each(function(d, i) {
                    d3.select(this)
                      .append("rect")
                          .attr("y", i * dim.legend.h)
                          .attr("height", dim.legend.h - 2)
                          .attr("width", dim.legend.w)
                          .style("fill", app.color(d));

                    d3.select(this)
                      .append("text")
                          .attr("y", 5 + i * dim.legend.h)
                          .attr("x", dim.legend.w + 5)
                          .text(d);
                });
}
