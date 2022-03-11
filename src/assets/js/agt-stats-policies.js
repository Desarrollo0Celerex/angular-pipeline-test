var StatsPoliciesPlugin = function() {

    function drawChartPolicies(chartData) {
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

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-policies-policies'));
            chart.draw(data, options);
        }
    }

    function removeChartPolicies() {
        document.getElementById('agt-stats-policies-policies').innerHTML = '';
    }

    function drawChartInsurancesPolicies(chartData) {
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

    function removeChartInsurancesPolicies() {
        document.getElementById('agt-stats-policies-insurances-policies').innerHTML = '';
    }

    function drawChartPendingRenovations(chartData) {
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

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-policies-pending-renovations'));
            chart.draw(data, options);
        }
    }

    function removeChartPendingRenovations() {
        document.getElementById('agt-stats-policies-pending-renovations').innerHTML = '';
    }

    function drawChartCancelledPolicies(chartData) {
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

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-policies-cancelled-policies'));
            chart.draw(data, options);
        }
    }

    function removeChartCancelledPolicies() {
        document.getElementById('agt-stats-policies-cancelled-policies').innerHTML = '';
    }

    function drawChartRenewalProcess(chartData) {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                height: 116,
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

            var chart = new google.visualization.BarChart(document.getElementById('agt-stats-policies-renewal-process'));
            chart.draw(data, options);
        }
    }

    function removeChartRenewalProcess() {
        document.getElementById('agt-stats-policies-renewal-process').innerHTML = '';
    }

    function drawChartRenewedPolicies(chartData) {
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

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-policies-renewed-policies'));
            chart.draw(data, options);
        }
    }

    function removeChartRenewedPolicies() {
        document.getElementById('agt-stats-policies-renewed-policies').innerHTML = '';
    }

    return {
        drawChartPolicies,
        removeChartPolicies,
        drawChartInsurancesPolicies,
        removeChartInsurancesPolicies,
        drawChartPendingRenovations,
        removeChartPendingRenovations,
        drawChartCancelledPolicies,
        removeChartCancelledPolicies,
        drawChartRenewalProcess,
        removeChartRenewalProcess,
        drawChartRenewedPolicies,
        removeChartRenewedPolicies,
    }
}();
