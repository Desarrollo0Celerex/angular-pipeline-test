var ChartPlugin = function() {

    function drawWalletProjection(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
              vAxis: {
                  "minValue": 0,
                  "format": "currency"
              },
              axisTitlesPosition: "in",
              legend: {
                  "position": "none"
              },
              crosshair: {
                  "trigger": "both",
                  "color": "#8b0d88",
                  "opacity": 0.8
              },
              tooltip:{
                  "textStyle": {
                      "color": "#536d98"
                  },
                  "showColorCode": true
              },
              animation: {
                  "duration": 2888,
                  "easing": "inAndOut",
                  "startup": true
              },
              colors:["#6c5ce8"]
            };
            var chart = new google.visualization.AreaChart(document.getElementById('chart-wallet-projection'));
            chart.draw(data, options);
        }
    }

    function drawActiveCoverages(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Ramos');
            data.addColumn('number', 'Pólizas');
            data.addRows(chartData);

            var options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: {
                    "color": "#fbfbfb"
                },
                sliceVisibilityThreshold: true,
                sliceVisibilityThreshold: 0.08,
                legend: {
                    "position": "labeled",
                    "textStyle": {
                        "color": "#536d98",
                        "fontSize": 12
                    }
                },
                tooltip: {
                    "textStyle": {
                        "color":
                        "#536d98"
                    },
                    "showColorCode": true
                },
                animation: {
                    "duration": 2888,
                    "easing": "inAndOut",
                    "startup": true
                },
                colors: ["#543888","#262258","#a13678","#ec4178","#ffa458"]
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-active-coverages'));
            chart.draw(data, options);
        }
    }

    return {
        drawWalletProjection,
        drawActiveCoverages
    };
}();
