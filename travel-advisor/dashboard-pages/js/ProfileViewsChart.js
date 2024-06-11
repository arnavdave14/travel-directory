am5.ready(function () {
    // Create root element
    var root = am5.Root.new("ProfileViews-Chart");

    // Disable the amCharts logo
    root._logo.dispose();

    // Set themes
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create chart
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
    }));

    // Add legend
    var legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        })
    );

    var data = [
        {
            "year": "2017",
            "europe": 2.5,
            "namerica": 2.9,
            "asia": 2.2,
        },
        {
            "year": "2018",
            "europe": 2.2,
            "namerica": 2.0,
            "asia": 2.2,
        },
        {
            "year": "2019",
            "europe": 2.0,
            "namerica": 2.5,
            "asia": 2.0,
        },
        {
            "year": "2020",
            "europe": 2.5,
            "namerica": 2.9,
            "asia": 2.2,
        },
        {
            "year": "2021",
            "europe": 2.5,
            "namerica": 2.9,
            "asia": 2.2,
        },
        {
            "year": "2022",
            "europe": 2.5,
            "namerica": 2.9,
            "asia": 2.2,
        },
        {
            "year": "2023",
            "europe": 2.6,
            "namerica": 2.4,
            "asia": 2.2,
        }
    ];

    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30, // Adjust to ensure all labels are shown
        cellStartLocation: 0.2, // Adjusted to increase space
        cellEndLocation: 0.8,   // Adjusted to increase space
        minorGridEnabled: true
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    xRenderer.grid.template.setAll({
        location: 0.5
    });

    xRenderer.labels.template.setAll({
        rotation: 0,
        centerY: am5.p50,
        centerX: am5.p50
    });

    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));

    // Define the colors you want for each series
    var colors = {
        "Europe": am5.color(0x004B61),
        "North America": am5.color(0x018390),
        "Asia": am5.color(0x81C0C6),
    };

    // Add series
    function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year"
        }));

        series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}:{valueY}",
            width: am5.percent(70),
            tooltipY: 0,
            strokeOpacity: 0,
            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
            fill: colors[name] // Set the fill color for the series
        });

        series.data.setAll(data);

        

        series.appear();

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 0,
                sprite: am5.Label.new(root, {
                    text: "{valueY}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: 0,
                    centerX: am5.p50,
                    populateText: true
                })
            });
        });

        // Comment out the following line to prevent adding series to the legend
        // legend.data.push(series);
    }

    makeSeries("Europe", "europe");
    makeSeries("North America", "namerica");
    makeSeries("Asia", "asia");

    chart.appear(1000, 100);

}); // end am5.ready()
