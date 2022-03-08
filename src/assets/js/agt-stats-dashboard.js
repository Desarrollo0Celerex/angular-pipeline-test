
var StatsDashboardPlugin = function() {

    function drawChartLeadsVsClients(chartData) {
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                chart: {},
                height: 118,
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"none","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#6c5ce8","#262258","#a13678","#543888"],
            };
            var chart = new google.charts.Bar(document.getElementById('agt-stats-dashboard-leads-vs-clients'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    }

    function removeChartLeadsVsClients() {
        document.getElementById('agt-stats-dashboard-leads-vs-clients').innerHTML = '';
    }

    function drawChartQuotesVsEmissions(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
              height: 154,
              fontSize:12,
              bubble: {textStyle: {fontSize: 12}},
              crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
              legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
              tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
              animation:{"duration":2888,"easing":"inAndOut","startup":true},
              colors:["#ec4178","#6c5ce8","#262258","#a13678","#543888"],
            };

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-dashboard-quotes-vs-emissions'));
            chart.draw(data, options);
        }
    }

    function removeChartQuotesVsEmissions() {
        document.getElementById('agt-stats-dashboard-quotes-vs-emissions').innerHTML = '';
    }

    return {
        drawChartLeadsVsClients,
        removeChartLeadsVsClients,
        drawChartQuotesVsEmissions,
        removeChartQuotesVsEmissions,
    }
}();
