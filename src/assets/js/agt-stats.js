
var StatsPlugin = function() {

    function drawInsurerSnapshot(chartData) {
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

    return {
        drawInsurerSnapshot
    }
}();
