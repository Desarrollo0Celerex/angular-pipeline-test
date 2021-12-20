var StatsCollectionPlugin = function() {

    function drawChartAppliedPayments(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#6c5ce8","#262258","#a13678","#543888"],
            };

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-collection-applied-payments'));
            chart.draw(data, options);
        }
    }

    function removeChartAppliedPayments() {
        document.getElementById('agt-stats-collection-applied-payments').innerHTML = '';
    }

    function drawChartInsurancesPayments(chartData) {
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {chart: {},
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"none","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#6c5ce8","#262258","#a13678","#543888"],
            };

            var chart = new google.charts.Bar(document.getElementById('agt-stats-policies-insurances-policies'));
            chart.draw(data, options);
        }
    }

    function removeChartInsurancesPayments() {
        document.getElementById('agt-stats-policies-insurances-policies').innerHTML = '';
    }

    function drawChartPendingPayments(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#ec4178","#6c5ce8","#262258","#a13678","#543888"],
            };

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-collection-pending-payments'));
            chart.draw(data, options);
        }
    }

    function removeChartPendingPayments() {
        document.getElementById('agt-stats-collection-pending-payments').innerHTML = '';
    }

    return {
        drawChartAppliedPayments,
        removeChartAppliedPayments,
        drawChartInsurancesPayments,
        removeChartInsurancesPayments,
        drawChartPendingPayments,
        removeChartPendingPayments,
    }
}();
