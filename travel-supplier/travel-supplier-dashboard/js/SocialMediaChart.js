am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("SocialMediaChart");
    
    // Disable the amCharts logo
    root._logo.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    var data = [
      {
        name: "Instagram",
        steps: 45688,
        pictureSettings: {
          src: "./img/insta.svg"
        }
      },
      {
        name: "Youtube",
        steps: 35781,
        pictureSettings: {
          src: "./img/youtube.svg"
        }
      },
      {
        name: "Facebook",
        steps: 25464,
        pictureSettings: {
          src: "./img/facebook.svg"
        }
      },
      {
        name: "Linkedin",
        steps: 18788,
        pictureSettings: {
          src: "./img/linkedin.svg"
        }
      }
    ];
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft:0,
        paddingRight:30,
        wheelX: "none",
        wheelY: "none"
      })
    );
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    
    var yRenderer = am5xy.AxisRendererY.new(root, {
      minorGridEnabled:true
    });
    yRenderer.grid.template.set("visible", false);
    
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: yRenderer,
        paddingRight:40
      })
    );
    
    var xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance:80,
      minorGridEnabled:true
    });
    
    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: xRenderer
      })
    );
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "steps",
        categoryYField: "name",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: "vertical",
          labelText: "{valueX}"
        })
      })
    );
    
    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxHeight: 40,
      fillOpacity: 0.8
    });
    
    var currentlyHovered;
    
    series.columns.template.events.on("pointerover", function(e) {
      handleHover(e.target.dataItem);
    });
    
    series.columns.template.events.on("pointerout", function(e) {
      handleOut();
    });
    
    function handleHover(dataItem) {
      if (dataItem && currentlyHovered != dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        var bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationX",
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }
    
    function handleOut() {
      if (currentlyHovered) {
        var bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationX",
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }
    
    
    var circleTemplate = am5.Template.new({});
    
    series.bullets.push(function(root, series, dataItem) {
      var bulletContainer = am5.Container.new(root, {});
      var circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 25
          },
          circleTemplate
        )
      );
    
      var maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 })
      );
    
      // only containers can be masked, so we add image to another container
      var imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle
        })
      );
    
      // not working
      var image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 30,
          height: 30
        })
      );
    
      return am5.Bullet.new(root, {
        locationX: 0,
        sprite: bulletContainer
      });
    });
    
    // heatrule
    series.set("heatRules", [
      {
        dataField: "valueX",
        min: am5.color(0x018390),
        max: am5.color(0x004B61),
        target: series.columns.template,
        key: "fill"
      },
      {
        dataField: "valueX",
        min: am5.color(0x018390),
        max: am5.color(0x004B61),
        target: circleTemplate,
        key: "fill"
      }
    ]);
    
    series.data.setAll(data);
    yAxis.data.setAll(data);
    
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);
    
    cursor.events.on("cursormoved", function() {
      var dataItem = series.get("tooltip").dataItem;
      if (dataItem) {
        handleHover(dataItem)
      }
      else {
        handleOut();
      }
    })
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(1000, 100);
    
    }); // end am5.ready()