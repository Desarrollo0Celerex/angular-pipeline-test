var ChartPlugin = function() {

    function loadWalletProjection(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });
    }

    function drawChart(chartData) {
        var data = google.visualization.arrayToDataTable(chartData);
        var options = {
            vAxis: {minValue: 0}
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart-wallet-projection'));
        chart.draw(data, options);
    }

    return { loadWalletProjection };
}();
