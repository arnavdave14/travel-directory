/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("Last30days");

// Dispose of the amCharts logo
root._logo.dispose();

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: false
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 2 });
xRenderer.labels.template.setAll({
  rotation: -0,
  centerY: am5.p30,
  centerX: am5.p20,
  paddingRight: 15,
  fontSize: "12px",
});

xRenderer.grid.template.setAll({
  location: 1
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.1,
  categoryField: "date",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.2,
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1
  })
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "date",
  fill: "#004B61",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));

var yRenderer = yAxis.get("renderer");
yRenderer.grid.template.setAll({
  stroke: am5.color(0xcccccc),
  strokeWidth: 1
});

series.columns.template.setAll({ cornerRadiusTL: 15, cornerRadiusTR: 15, strokeOpacity: 0 });

// Set data
var data = [{
  date: "01",
  value: 2025
}, {
  date: "02",
  value: 1882
}, {
  date: "03",
  value: 1809
}, {
  date: "04",
  value: 1322
}, {
  date: "05",
  value: 1122
}, {
  date: "06",
  value: 1114
}, {
  date: "07",
  value: 600
}, {
  date: "08",
  value: 855
}, {
  date: "09",
  value: 875
}, {
  date: "10",
  value: 966
}, {
  date: "11",
  value: 123
}, {
  date: "12",
  value: 145
}, {
  date: "13",
  value: 256
}, {
  date: "14",
  value: 300
}, {
  date: "15",
  value: 458
}, {
  date: "16",
  value: 500
}, {
  date: "17",
  value: 753
}, {
  date: "18",
  value: 159
}, {
  date: "19",
  value: 456
}, {
  date: "20",
  value: 789
}, {
  date: "21",
  value: 123
}, {
  date: "22",
  value: 752
}, {
  date: "23",
  value: 125
}, {
  date: "24",
  value: 984
}, {
  date: "25",
  value: 156
}, {
  date: "26",
  value: 752
}, {
  date: "27",
  value: 423
}, {
  date: "28",
  value: 2500
}, {
  date: "29",
  value: 199
}, {
  date: "30",
  value: 299
}];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(2000);
chart.appear(1500, 200);
