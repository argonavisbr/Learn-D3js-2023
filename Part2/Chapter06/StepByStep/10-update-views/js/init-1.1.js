import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import {app} from "./constants.js";
import {configure} from "./config-1.4.js";
import {draw} from "./render-1.3.js";

// VIEW INITIALIZATION (called once after loading the data)
/**
 * Initializes the view with a control panel (form with buttons) and the planet circle
 * @param plane
 */
export function init(plane) {

    // Configure the form
    d3.select("form")
      .selectAll("button")
        .data(app.planets)
          .join("button")
            .attr("type", "button") // disables default submission event
            .attr("id", d => d.id)
            .text(d => d.name)
            .on("click", function(event, d) { // event listener
                app.current.id = d.id;
                configure();
                draw(plane);
            });

    // 2) Add circle for the planet
    plane.append("circle")
        .attr("class", "planet");

}