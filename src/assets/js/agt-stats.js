
var StatsPlugin = function() {

    function drawChartCoverages(chartData) {
        google.charts.load('current', {
           'packages': ['geochart'],
           'mapsApiKey': 'AIzaSyDpclEqcDp6PC8tuaA3acg4z92zJ2wHaFA'
        });
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                region: 'MX',
                height: 353,
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                displayMode: 'markers',
                colorAxis: {colors:["#6c5ce8", "#ec4178"],}
             };

            var chart = new google.visualization.GeoChart(document.getElementById('agt-stats-coverages-snapshot'));
            chart.draw(data, options);
        }
    }

    function drawChartInsurers(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                height: 353,
                fontSize:12,
                hAxis: {title: 'Pólizas Activas'},
                vAxis: {title: 'Clientes'},
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#543888","#262258","#a13678","#ec4178","#ffa458"],
            };
            var chart = new google.visualization.BubbleChart(document.getElementById('agt-stats-insurer-snapshot'));
            chart.draw(data, options);
        }
    }

    function drawChartContactSources(chartData) {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                chartArea: {width: '40%'},
                hAxis: {minValue: 0},
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#543888","#262258","#a13678","#ec4178","#ffa458"],
            };
            var chart = new google.visualization.BarChart(document.getElementById('agt-stats-contact-sources-snapshot'));
            chart.draw(data, options);
        }
    }

    function drawChartLeadStatus(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D:true,
                pieHole:0,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"labeled","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#543888","#262258","#a13678","#ec4178","#ffa458"],
            };
            var chart = new google.visualization.PieChart(document.getElementById('agt-lead-status-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartActiveClients(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D:false,
                pieHole:0.4,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"left","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#210048","#6a3c78","#4b0088","#ffbe78","#ffdca8"],

                slices: {
                1: {offset: 0.2},
                },
            };
            var chart = new google.visualization.PieChart(document.getElementById('agt-active-clients-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartClientStatus(chartData) {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                fontSize:12,
                legend: {"position":"top","textStyle":{"color":"#536d98","fontSize":11}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#a13678","#543888","#262258","#ffdca8"],
                bar: { groupWidth: '80%' },
                isStacked: 'percent',
            };
            var chart = new google.visualization.BarChart(document.getElementById('agt-client-status-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartPolicySources(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D:false,
                pieHole:0.2,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"left","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#a13678","#543888","#262258","#ffdca8"],
                bar: { groupWidth: '80%' },
                slices: { 0: {offset: 0.2} }
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-policy-sources-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartPolicyStatus(chartData) {
        google.charts.load("current", {packages:['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
                },
                2]
            );

            var options = {
                bar: {groupWidth: "98%"},
                legend: { position: "none" },
                colors:["#ec4178","#262258","#a13678","#543888","#ffa458"],
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("agt-policy-status-stats"));
            chart.draw(view, options);
        }
    }

    function drawChartPayments(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D:false,
                pieHole:0.4,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"left","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#a13678","#543888","#262258","#ffdca8"],
                slices: {1: {offset: 0.2} },
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-payments-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartPaymentStatus(chartData) {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                chartArea: {width: '50%'},
                hAxis: {minValue: 0},
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#543888","#262258","#a13678","#ec4178","#ffa458"],
            };

            var chart = new google.visualization.BarChart(document.getElementById('agt-payment-status-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartSinisters(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D:false,
                pieHole:0,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"left","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#262258","#a13678","#543888","#ffa458"],
                slices: {1: {offset: 0.2} },
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-sinisters-stats'));
            chart.draw(data, options);
        }
    }

    function drawChartSinisterStatus(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                vAxis: {title: 'Siniestros Activos'},
                isStacked: 'percent',
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#6c5ce8","#ec4178","#262258","#a13678","#543888"],
            };

            var chart = new google.visualization.SteppedAreaChart(document.getElementById('agt-sinister-status-stats'));
            chart.draw(data, options);
        }
    }

    return {
        drawChartCoverages,
        drawChartInsurers,
        drawChartContactSources,
        drawChartLeadStatus,
        drawChartActiveClients,
        drawChartClientStatus,
        drawChartPolicySources,
        drawChartPolicyStatus,
        drawChartPayments,
        drawChartPaymentStatus,
        drawChartSinisters,
        drawChartSinisterStatus
    }
}();
