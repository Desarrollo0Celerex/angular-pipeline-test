var ChartPlugin = function() {

    function loadWalletProjection() {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    }

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['AÑO', 'PRIMA'],
            ['2015', 10000],
            ['2016', 10000],
            ['2017', 10000],
            ['2018', 10000],
            ['2019', 10000],
            ['2020', 10000],
            ['2021', 10000],
            ['2022', 10000],
            ['2023', 10000],
            ['2024', 10000],
            ['2025', 10000]
        ]);

        var options = {
        vAxis: {minValue: 0}

        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart-wallet-projection'));
        chart.draw(data, options);
    }

    return { loadWalletProjection };
}();
