document.addEventListener('DOMContentLoaded', () => {
    console.clear();

    // ===== Data =====

    const nodeData = [
        { name: 'center', nodeType: 'of the universe' },

        { name: 'Seeds Nuts etc', nodeType: 'super_cattegory' },
        { name: 'Fruit', nodeType: 'super_cattegory' },
        { name: 'Vegetables', nodeType: 'super_cattegory' },

        { name: 'Leafy Greens', nodeType: 'cattegory' },
        { name: 'Beans', nodeType: 'cattegory' },
        { name: 'Red Meat', nodeType: 'cattegory' },
        { name: 'Muscles', nodeType: 'instance' },
        { name: 'Fish', nodeType: 'super_cattegory' },
        { name: 'Seeds', nodeType: 'cattegory' },
        { name: 'Organ Meat', nodeType: 'cattegory' },
        { name: 'Shellfish', nodeType: 'sub_cattegory' },
        { name: 'Sardines', nodeType: 'instance' },
        { name: 'Dark Leafy Greens', nodeType: 'sub_cattegory' },
        { name: 'Dairy', nodeType: 'super_cattegory' },
        { name: 'Egg', nodeType: 'cattegory' },
        { name: 'Seaweed', nodeType: 'cattegory' },

        { name: 'Fatty Fish', nodeType: 'cattegory' },
        { name: 'Egg Yolk', nodeType: 'variant' },
        { name: 'Cod Liver Oil', nodeType: 'instance' },
        { name: 'Sun Exposure', nodeType: 'instance' },
        { name: 'Milk', nodeType: 'cattegory' },
        { name: 'Meat', nodeType: 'super_cattegory' },

        { name: 'Nuts', nodeType: 'cattegory' },
        { name: 'Dark Chocolate', nodeType: 'instance' },
        { name: 'Whole Grains', nodeType: 'cattegory' },

        { name: 'Apricot', nodeType: 'instance' },
        { name: 'Banana', nodeType: 'instance' },
        { name: 'Kiwi', nodeType: 'instance' },
        { name: 'Orange', nodeType: 'instance' },
        { name: 'Carrot', nodeType: 'instance' },
        { name: 'Potato', nodeType: 'instance' },
        { name: 'Lean Meat', nodeType: 'cattegory' },

        { name: 'Iron', nodeType: 'nutriant' },
        { name: 'Iodine', nodeType: 'nutriant' },
        { name: 'Vitamin D', nodeType: 'nutriant' },
        { name: 'Vitamin B12', nodeType: 'nutriant' },
        { name: 'Magnesium', nodeType: 'nutriant' },
        { name: 'Potasium', nodeType: 'nutriant' },
        { name: 'Zinc', nodeType: 'nutriant' },
        { name: 'Selenium', nodeType: 'nutriant' },
        { name: 'Riboflavin', nodeType: 'nutriant' },
        { name: 'Folate', nodeType: 'nutriant' },
        { name: 'Vitamin C', nodeType: 'nutriant' },
    ];

    const linkData = [
        { target: 'Fruit', source: 'Apricot' },
        { target: 'Fruit', source: 'Kiwi' },
        { target: 'Fruit', source: 'Orange' },
        { target: 'Fruit', source: 'Banana' },
        { target: 'Vegetables', source: 'Potato' },
        { target: 'Vegetables', source: 'Carrot' },
        { target: 'Seeds Nuts etc', source: 'Seeds' },
        { target: 'Seeds Nuts etc', source: 'Nuts' },
        { target: 'Meat', source: 'Red Meat' },
        { target: 'Meat', source: 'Organ Meat' },
        { target: 'Meat', source: 'Egg' },
        { target: 'Fish', source: 'Sardines' },
        { target: 'Fish', source: 'Fatty Fish' },
        { target: 'Shellfish', source: 'Muscles' },
        { target: 'Dairy', source: 'Egg' },
        { target: 'Egg', source: 'Egg Yolk' },
        { target: 'Leafy Greens', source: 'Dark Leafy Greens' },

        { target: 'Iron', source: 'Red Meat' },
        { target: 'Iron', source: 'Organ Meat' },
        { target: 'Iron', source: 'Shellfish' },
        { target: 'Iron', source: 'Sardines' },
        { target: 'Iron', source: 'Beans' },
        { target: 'Iron', source: 'Seeds' },
        { target: 'Iron', source: 'Dark Leafy Greens' },

        { target: 'Iodine', source: 'Seaweed' },
        { target: 'Iodine', source: 'Fish' },
        { target: 'Iodine', source: 'Dairy' },
        { target: 'Iodine', source: 'Egg' },

        { target: 'Vitamin D', source: 'Cod Liver Oil' },
        { target: 'Vitamin D', source: 'Fatty Fish' },
        { target: 'Vitamin D', source: 'Egg Yolk' },
        { target: 'Vitamin D', source: 'Sun Exposure' },

        { target: 'Vitamin B12', source: 'Shellfish' },
        { target: 'Vitamin B12', source: 'Organ Meat' },
        { target: 'Vitamin B12', source: 'Meat' },
        { target: 'Vitamin B12', source: 'Egg' },
        { target: 'Vitamin B12', source: 'Milk' },

        { target: 'Magnesium', source: 'Whole Grains' },
        { target: 'Magnesium', source: 'Nuts' },
        { target: 'Magnesium', source: 'Dark Chocolate' },
        { target: 'Magnesium', source: 'Dark Leafy Greens' },

        { target: 'Potasium', source: 'Apricot' },
        { target: 'Potasium', source: 'Banana' },
        { target: 'Potasium', source: 'Kiwi' },
        { target: 'Potasium', source: 'Orange' },
        { target: 'Potasium', source: 'Leafy Greens' },
        { target: 'Potasium', source: 'Carrot' },
        { target: 'Potasium', source: 'Potato' },
        { target: 'Potasium', source: 'Lean Meat' },
        { target: 'Potasium', source: 'Whole Grains' },
        { target: 'Potasium', source: 'Beans' },
        { target: 'Potasium', source: 'Nuts' },
    ];

    const linkMixinSuperCatts = [
        { target: 'center', source: 'Meat' },
        { target: 'center', source: 'Fish' },
        { target: 'center', source: 'Dairy' },
        { target: 'center', source: 'Seeds Nuts etc' },
        { target: 'center', source: 'Fruit' },
        { target: 'center', source: 'Vegetables' },
    ];

    const linkMixinCatts = [
        { target: 'center', source: 'Seeds' },
        { target: 'center', source: 'Fatty Fish' },
        { target: 'center', source: 'Seaweed' },
        { target: 'center', source: 'Egg' },
        { target: 'center', source: 'Milk' },
        { target: 'center', source: 'Organ Meat' },
        { target: 'center', source: 'Red Meat' },
        { target: 'center', source: 'Nuts' },
        { target: 'center', source: 'Whole Grains' },
        { target: 'center', source: 'Lean Meat' },
        { target: 'center', source: 'Beans' },
        { target: 'center', source: 'Leafy Greens' },
    ];

    const linkMixinNutr = [
        { target: 'center', source: 'Iron' },
        { target: 'center', source: 'Iodine' },
        { target: 'center', source: 'Vitamin D' },
        { target: 'center', source: 'Vitamin B12' },
        { target: 'center', source: 'Magnesium' },
        { target: 'center', source: 'Potasium' },
        { target: 'center', source: 'Zinc' },
        { target: 'center', source: 'Selenium' },
        { target: 'center', source: 'Riboflavin' },
        { target: 'center', source: 'Folate' },
        { target: 'center', source: 'Vitamin C' },
    ];

    // ===== / Data =====

    // ===== Global Vars =====

    const nodeScale = 0.7;

    const canvasWidth = window.innerWidth - 50 || 50;
    const canvasHeight = window.innerHeight - 50 || 50;

    const graphWidth = 960;
    const graphHeight = 600;

    const toggleCenter = document.querySelector('.center_toggle');

    let centerIs = 'cattegories';

    // ===== / Global Vars =====

    // ===== Pure Funcs =====

    const n = (cb) => (isNaN(cb) ? 0 : cb);

    function assignNodeColor(d) {
        switch (d.nodeType) {
            // case 'food':
            case 'variant':
            case 'instance':
                return '#27ae61';
            case 'super_cattegory':
                return '#1bbc9b';
            case 'cattegory':
                return '#3598db';
            case 'sub_cattegory':
                return '#9a59b5';
            case 'nutriant':
                return '#e84c3d';
            case 'of the universe':
                return '#f1c40f';
            default:
                return '#bec3c7';
        }
    }

    function assignNodeSize(d) {
        switch (d.nodeType) {
            // case 'food':
            case 'variant':
            case 'instance':
                return 10 * nodeScale;
            case 'super_cattegory':
                return 25 * nodeScale;
            case 'cattegory':
                return 20 * nodeScale;
            case 'sub_cattegory':
                return 15 * nodeScale;
            case 'nutriant':
                return 30 * nodeScale;
            case 'of the universe':
                return 18 * nodeScale;
            default:
                return 10 * nodeScale;
        }
    }

    const switchCenter = () => {
        const opts = {
            cattegories: 'nutrients',
            nutrients: 'super_cattegory',
            super_cattegory: 'cattegories',
        };
        centerIs = opts[centerIs];
        console.log({ centerIs });
        renderGraph();
    };

    toggleCenter.onclick = switchCenter;

    // ===== / Pure Funcs =====

    // ===== Setup =====

    d3.selectAll('h1').style('display', 'none');

    const canvas = d3
        .select('.root')
        .append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight)
        .style('border', '1px solid black');

    // ===== / Setup =====

    // ===== Render =====

    function renderGraph() {
        switch (centerIs) {
            case 'nutrients':
                linkData.push(...linkMixinNutr);
                break;
            case 'super_cattegory':
                linkData.push(...linkMixinSuperCatts);
                break;
            case 'cattegories':
            default:
                linkData.push(...linkMixinCatts);
                break;
        }

        canvas.selectAll('*').remove();

        const graph = canvas.append('g').attr('class', 'graph');

        const simulation = d3.forceSimulation().nodes(nodeData);

        const cargeForce = d3.forceManyBody().strength(-400);

        const centerForce = d3.forceCenter(canvasWidth / 2, canvasHeight / 2);

        const linkForce = d3.forceLink(linkData).id((d) => d.name);

        simulation
            .force('charge_force', cargeForce)
            .force('center_force', centerForce)
            .force('links', linkForce);

        const links = canvas
            .append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(linkData)
            .enter()
            .append('line')
            .attr('stroke-width', 2);

        const allNodesGraph = canvas.append('g').attr('class', 'nodes');
        const nodes = allNodesGraph
            .selectAll('circle')
            .attr('class', 'nodes')
            .data(nodeData)
            .enter()
            .append('g')
            .attr('class', 'node')
            .append('circle')
            .attr('r', assignNodeSize)
            .attr('fill', assignNodeColor);

        // .on('mouseover', function (d) {
        //   var xPos = d3.mouse(this)[0] + 10;
        //   var yPos = d3.mouse(this)[1] - 20;
        //   toolTip.style('display', null)
        //           .attr('transform', 'translate(' + xPos + ', ' + yPos + ')')
        //   toolTipText.text(d.name)
        //   toolTipBack.attr('width', () => d.name.length * 9 )
        // })
        // .on('mousemove', function (d) {
        //   var xPos = d3.mouse(this)[0] + 10;
        //   var yPos = d3.mouse(this)[1] - 20;
        //   toolTip.attr('transform', 'translate(' + xPos + ', ' + yPos + ')')
        // })
        // .on('mouseout', () => toolTip.style('display', 'none'))

        const texts = canvas
            .append('g')
            .attr('class', 'txts')
            .selectAll('text')
            .data(nodeData)
            .enter()
            .append('text')
            .text((d) => d.name)
            .attr('x', (d) => n(d.x))
            .attr('y', (d) => n(d.y))
            .attr('class', 'txt');

        const toolTip = canvas.append('g').style('display', 'none');

        const toolTipBack = toolTip
            .append('rect')
            .attr('width', '100')
            .attr('height', '18')
            .attr('fill', 'white');

        const toolTipText = toolTip
            .append('text')
            .text('placeholder')
            .attr('x', '4')
            .attr('y', '14');

        canvas.append('text').text(centerIs).attr('x', '40').attr('y', '40');

        function tickActions() {
            nodes
                .attr(
                    'cx',
                    (d) =>
                        (d.x = Math.max(10, Math.min(canvasWidth - 10, d.x))),
                )
                .attr(
                    'cy',
                    (d) =>
                        (d.y = Math.max(10, Math.min(canvasHeight - 10, d.y))),
                );

            texts
                .attr(
                    'x',
                    (d) =>
                        (d.x = Math.max(10, Math.min(canvasWidth - 10, d.x))),
                )
                .attr(
                    'y',
                    (d) =>
                        (d.y = Math.max(10, Math.min(canvasHeight - 10, d.y))),
                );

            links
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);
        }

        function drag_start(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = n(d.x);
            d.fy = n(d.y);
        }

        function drag_drag(d) {
            d.fx = n(d3.event.x);
            d.fy = n(d3.event.y);
        }

        function drag_end(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }

        const drag_handler = d3
            .drag()
            .on('start', drag_start)
            .on('drag', drag_drag)
            .on('end', drag_end);

        drag_handler(nodes);

        simulation.on('tick', tickActions);
    }

    // ===== / Render =====

    renderGraph();

    // setTimeout(renderGraph, 3000)
});
