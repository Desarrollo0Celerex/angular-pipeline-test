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

    function drawChartPolicyEndorsements(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Ramos');
            data.addColumn('number', 'Aseguradoras');
            data.addRows(chartData);

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
                colors:["#383368","#5a5488","#746cc8","#a09ac8"],
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-record-policy-endorsements'));
            chart.draw(data, options);
        }
    }

    function removeChartPolicyEndorsements() {
        document.getElementById('agt-record-policy-endorsements').innerHTML = '';
    }

    return {
        drawChartPolicySinisters,
        removeChartPolicySinisters,
        drawChartPolicyEndorsements,
        removeChartPolicyEndorsements,
    }
}();
