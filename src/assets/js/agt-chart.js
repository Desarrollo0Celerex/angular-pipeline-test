let ChartPlugin = function() {

    function drawWalletProjection(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            let data = google.visualization.arrayToDataTable(chartData);
            let options = {
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
            let chart = new google.visualization.AreaChart(document.getElementById('chart-wallet-projection'));
            chart.draw(data, options);
        }
    }

    function drawActiveCoverages(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            let data = new google.visualization.DataTable();
            data.addColumn('string', 'Ramos');
            data.addColumn('number', 'Pólizas');
            data.addRows(chartData);

            let options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: {
                    "color": "#fbfbfb"
                },
                sliceVisibilityThreshold: false,
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

            let chart = new google.visualization.PieChart(document.getElementById('agt-active-coverages'));
            chart.draw(data, options);
        }
    }

    function drawPreferredInsurers(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            let data = new google.visualization.DataTable();
            data.addColumn('string', 'Aseguradora');
            data.addColumn('number', 'Pólizas');
            data.addRows(chartData);

            let options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: {"color":"#fbfbfb"},
                sliceVisibilityThreshold: false,
                legend: {
                    "position": "top",
                    "textStyle": {
                        "color": "#536d98",
                        "fontSize": 12
                    }
                },
                tooltip: {
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
                colors:["#c73868","#fe6768","#fd8f58","#ffbe78","#ffdca8"],
            };

            let chart = new google.visualization.PieChart(document.getElementById('agt-preferred-insurers'));
            chart.draw(data, options);
        }
    }

    function drawGlobalBalance(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            let data = google.visualization.arrayToDataTable(chartData);
            let options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: {
                    "color": "#fbfbfb"
                },
                sliceVisibilityThreshold: false,
                legend: {
                    "position": "top",
                    "textStyle": {
                        "color": "#536d98",
                        "fontSize": 12
                    }
                },
                tooltip: {
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
                colors:["#034ea8","#f10088"]
            };

            let chart = new google.visualization.PieChart(document.getElementById('agt-global-balance'));
            chart.draw(data, options);
        }
    }

    function drawChartRenewalProcess(chartData) {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            let data = google.visualization.arrayToDataTable(chartData);

            let options = {
                height: 118,
                fontSize:12,
                legend: {"position":"top","textStyle":{"color":"#536d98","fontSize":11}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#a13678","#543888","#262258","#ffdca8"],
                bar: { groupWidth: '88%' },
                isStacked: 'percent',
            };

            let chart = new google.visualization.BarChart(document.getElementById('agt-renewal-progress'));
            chart.draw(data, options);
        }
    }

    function removeChartRenewalProcess() {
        document.getElementById('agt-renewal-progress').innerHTML = '';
    }

    return {
        drawWalletProjection,
        drawActiveCoverages,
        drawPreferredInsurers,
        drawGlobalBalance,
        drawChartRenewalProcess,
        removeChartRenewalProcess,
    };
}();
