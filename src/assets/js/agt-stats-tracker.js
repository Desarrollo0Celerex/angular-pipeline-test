var StatsTrackerPlugin = function() {

    function drawChartTrackerInsurers(chartData) {
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
              colors:["#543888","#262258","#a13678","#ec4178","#ffa458"],
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-stats-tracker-insurers'));
            chart.draw(data, options);
        }
    }

    function removeChartTrackerInsurers() {
        document.getElementById('agt-stats-tracker-insurers').innerHTML = '';
    }

    return {
        drawChartTrackerInsurers,
        removeChartTrackerInsurers,
    }
}();
