import * as d3 from "https://cdn.skypack.dev/d3@7";
import {makeLinePairs} from "./hierarchy-utils.js";

export function draw(orientation = 'horizontal', data, container, lineType = 'line', link) {
    const lines = (lineType === 'path') ? makeLinePairs(data) : data.links();
    drawLinks(container.append("g").attr("class", "links"), lines, lineType, link);
    drawNodes(container.append("g").attr("class", "nodes"), data.descendants(), orientation);
}

// Draw nodes as circles and labels
export function drawNodes(g, data, orientation) {
    g.selectAll("g.node")
        .data(data)
        .join('g')
        .attr("class", "node")
        .attr('transform', d => getTransform(d, orientation))
        .each(function() {
            const node = d3.select(this);
            node.append("circle")
                .attr('r',
                    d => d.height > 0 && d.depth !== 0 ? 2 : d.depth === 0 ? 4 : 1);
            node.append("text")
                .attr('x', 5)
                .text(d => d.data.id)
                .attr("class",
                    d => d.height > 0 && d.depth !== 0
                        ? "continent" : d.depth === 0 ? "world" : "country");
        });
}

function getTransform(d, orientation) {
    if (orientation === 'vertical') {
        return `translate(${d.x},${d.y})`;
    } else if (orientation === 'horizontal') {
        return `translate(${d.y},${d.x})`;
    } else { // radial
        return `rotate(${d.x}) translate(${d.y})`;
    }
}

export function drawLinks(g, data, lineType, link) {
    if(lineType === 'link') {
        useLinks(g, data, link);
    } else if(lineType === 'path') {
        usePaths(g, data);
    } else {
        useLines(g, data);
    }
}

function useLines(g, data) {
    g.selectAll('line').data(data).join('line')
        .attr('x1', d => d.source.y)
        .attr('y1', d => d.source.x)
        .attr('x2', d => d.target.y)
        .attr('y2', d => d.target.x);
}

function usePaths(g, data) {
    g.selectAll('path').data(data).join('path')
        .attr('d', d3.line());
}

function useLinks(g, data, link) {
    g.selectAll("path").data(data).join('path')
        .attr("d", link);
}