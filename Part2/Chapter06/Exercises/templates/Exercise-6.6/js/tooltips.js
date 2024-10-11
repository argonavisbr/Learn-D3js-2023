import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {app} from "./constants.js";

const fmt = d3.format(",");

export function showTooltip(event, d) {
    // EXERCISE 6.5: Implement the showTooltip function
    // 1) Select the tooltip that was added in the HTML file's <script> block using its class
    // 2) Raise the tooltip above the other elements
    // 3) Set the position of the tooltip element using the translate transform (place it near the planet or satellite)
    // 4) Transition the opacity of the tooltip element to 1
    // 5) Set the text of the tooltip element to show the diameter of the planet or satellite

    // Compute position: if moon, d.cx is defined, otherwise is planet
    const position = d.cx ? `translate(${[d.cx, app.scale(d.diameterKm/4)]})`
                                 : "translate(-75,50)";

    d3.select(".tooltip").raise() // place over other elements
        .attr("transform", position)
        .transition()
           .style("opacity", 1)
           .select("text")
              .text("Diameter: " + fmt(d.diameterKm) + " km");
}

export function hideTooltip() {
    // EXERCISE 6.5: Implement the hideTooltip function
    // 1) Select the tooltip that was added in the HTML file's <script> block using its class
    // 2) Transition the opacity of the tooltip element to 0
    d3.select(".tooltip")
      .transition()
        .style("opacity", 0);
}