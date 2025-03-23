import * as d3 from 'https://cdn.skypack.dev/d3@7';

export {dim, app};

const dim = {
    w: 500, h: 300,
    margin: {h: 40, w: 50},
    legend: {w: 20, h: 10}
};

const app = {
    data: {},
    color: d3.scaleOrdinal(d3.schemeDark2),
    scale: {
        x: d3.scaleLinear()
            .range([dim.margin.w, dim.w - dim.margin.w]),
        y: d3.scaleLog()
            .range([dim.h - dim.margin.h, dim.margin.h]),
        r: d3.scaleSqrt()
            .range([1,15])
    },
    format: {
        gdp: d3.format("$,.0f"),
        pop: d3.format(",.3s")
    },
    axis: {x: null, y: null},   // will be set by chart-utils.js
    brush: d3.brush()
               .extent([[dim.margin.w, dim.margin.h],
                        [dim.w - dim.margin.w, dim.h - dim.margin.h]])
}