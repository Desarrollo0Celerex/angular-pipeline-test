
var StatsGlobalPlugin = function() {

    function drawChartContactTypes(chartData) {
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
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#034ea8","#f10088"],
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-chart-clients'));
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
                is3D:true,
                pieHole:0,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#c73868","#fe6768","#fd8f58","#ffbe78","#ffdca8"],
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-chart-insurers'));
            chart.draw(data, options);
        }
    }

    function drawChartInsurances(chartData) {
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
                sliceVisibilityThreshold: .0001,
                legend:{"position":"labeled","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#543888","#262258","#a13678","#ec4178","#ffa458"],
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-chart-insurances'));
            chart.draw(data, options);
        }
    }

    return {
        drawChartContactTypes,
        drawChartInsurers,
        drawChartInsurances
    }
}();
