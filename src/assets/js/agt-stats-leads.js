var StatsLeadsPlugin = function() {

    function drawChartLeadsGenerated(chartData) {
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

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-leads-leads-generated'));
            chart.draw(data, options);
        }
    }

    function removeChartLeadsGenerated() {
        document.getElementById('agt-stats-leads-leads-generated').innerHTML = '';
    }

    function drawChartQuotations(chartData) {
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

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-leads-quotations'));
            chart.draw(data, options);
        }
    }

    function removeChartQuotations() {
        document.getElementById('agt-stats-leads-quotations').innerHTML = '';
    }

    function drawChartContactSources(chartData) {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                chartArea: {width: '60%'},
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                colors: ['#ec4178', '#6c5ce8'],
            };
            var chart = new google.visualization.BarChart(document.getElementById('agt-stats-leads-contact-sources'));
            chart.draw(data, options);
        }
    }

    function removeChartContactSources() {
        document.getElementById('agt-stats-leads-contact-sources').innerHTML = '';
    }

    return {
        drawChartLeadsGenerated,
        removeChartLeadsGenerated,
        drawChartQuotations,
        removeChartQuotations,
        drawChartContactSources,
        removeChartContactSources,
    }
}();
