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

    function drawChartTrackerAmounts(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            console.log('data: ',data);
            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
              chartArea:{left:80,top:18,width:'88%',height:'68%'},
              vAxis:{"minValue":0,"format":"currency"},
              axisTitlesPosition:"in",
              legend:{"position":"none"},
              crosshair:{"trigger":"both","color":"#ec4178","opacity":0.8},
              tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
              animation:{"duration":2888,"easing":"inAndOut","startup":true},
              colors:["#6c5ce8"],
            };

            var chart = new google.visualization.AreaChart(document.getElementById('agt-stats-tracker-amounts'));
            chart.draw(data, options);
        }
    }

    function removeChartTrackerAmounts() {
        document.getElementById('agt-stats-tracker-amounts').innerHTML = '';
    }

    return {
        drawChartTrackerInsurers,
        removeChartTrackerInsurers,
        drawChartTrackerAmounts,
        removeChartTrackerAmounts,
    }
}();
