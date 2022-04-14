var StatsRecordPlugin = function() {

    function drawChartPolicySinisters(chartData) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                chart: {},
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"none","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('agt-record-policy-sinisters'));
            chart.draw(data, options);
        }
    }

    function removeChartPolicySinisters() {
        document.getElementById('agt-record-policy-sinisters').innerHTML = '';
    }

    return {
        drawChartPolicySinisters,
        removeChartPolicySinisters,
    }
}();
