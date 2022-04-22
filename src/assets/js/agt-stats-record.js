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

    function drawChartPolicyPayments(chartData) {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                is3D:true,
                pieHole:0.2,
                fontSize:12,
                pieSliceTextStyle:{"color":"#fbfbfb"},
                sliceVisibilityThreshold:true,
                sliceVisibilityThreshold: 0.0001,
                legend:{"position":"top","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#303a98","#c00388"],
            };

            var chart = new google.visualization.PieChart(document.getElementById('agt-record-policy-payments'));
            chart.draw(data, options);
        }
    }

    function removeChartPolicyPayments() {
        document.getElementById('agt-record-policy-payments').innerHTML = '';
    }

    function drawChartPolicyRenewals(chartData) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                chart: {},
                isStacked: true,
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"none","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#0b0742","#5e72e8","#ff9198","#fdc094"],
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('agt-record-policy-renewals'));
            chart.draw(data, options);
        }
    }

    function removeChartPolicyRenewals() {
        document.getElementById('agt-record-policy-renewals').innerHTML = '';
    }

    function drawChartPolicySinistersBehavior(chartData) {
        google.charts.load('current', {'packages':['timeline']});
        google.charts.setOnLoadCallback(function() {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var container = document.getElementById('agt-record-policy-sinisters-behavior');
            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();

            dataTable.addColumn({ type: 'string', id: 'Número' });
            dataTable.addColumn({ type: 'string', id: 'Tipo Siniestro' });
            //MONTHS STARTS FROM 0. ENE = 0 / DIC = 11
            dataTable.addColumn({ type: 'date', id: 'Reporte' });
            dataTable.addColumn({ type: 'date', id: 'Resolución' });

            dataTable.addRows(chartData);

            var options = {
                fontSize:12,
                bubble: {textStyle: {fontSize: 12}},
                crosshair:{"trigger":"both","color":"#8b0d88","opacity":0.8},
                legend:{"position":"none","textStyle":{"color":"#536d98","fontSize":12}},
                tooltip:{"textStyle":{"color":"#536d98"},"showColorCode":true},
                animation:{"duration":2888,"easing":"inAndOut","startup":true},
                colors:["#feb838","#fed238","#ffdb68","#fee588","#fef4a8"],
            };

            chart.draw(dataTable, options);
        }
    }

    function removeChartPolicySinistersBehavior() {
        document.getElementById('agt-record-policy-sinisters-behavior').innerHTML = '';
    }

    return {
        drawChartPolicySinisters,
        removeChartPolicySinisters,
        drawChartPolicyEndorsements,
        removeChartPolicyEndorsements,
        drawChartPolicyPayments,
        removeChartPolicyPayments,
        drawChartPolicyRenewals,
        removeChartPolicyRenewals,
        drawChartPolicySinistersBehavior,
        removeChartPolicySinistersBehavior,
    }
}();
