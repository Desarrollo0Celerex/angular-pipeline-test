
var StatsPlugin = function() {

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
                sliceVisibilityThreshold: .08,
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

    return {
        drawChartInsurers,
        drawChartContactSources,
        drawChartLeadStatus,
        drawChartActiveClients
    }
}();
