var StatsGlobalPlugin = (function () {
    function drawChartContactTypes(chartData) {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(function () {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: { color: "#fbfbfb" },
                sliceVisibilityThreshold: true,
                sliceVisibilityThreshold: 0.0001,
                legend: {
                    position: "top",
                    textStyle: { color: "#536d98", fontSize: 12 },
                },
                tooltip: {
                    textStyle: { color: "#536d98" },
                    showColorCode: true,
                },
                animation: {
                    duration: 2888,
                    easing: "inAndOut",
                    startup: true,
                },
                colors: ["#034ea8", "#f10088"],
            };

            if (chartData.length > 1) {
                var chart = new google.visualization.PieChart(
                    document.getElementById("agt-chart-contact-types")
                );
                chart.draw(data, options);
            } else {
                document.getElementById("agt-chart-contact-types").innerHTML =
                    _generateEmptyContainer();
            }
        }
    }

    function removeChartContactTypes() {
        document.getElementById("agt-chart-contact-types").innerHTML = "";
    }

    function drawChartInsurers(chartData) {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(function () {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: { color: "#fbfbfb" },
                sliceVisibilityThreshold: true,
                sliceVisibilityThreshold: 0.0001,
                legend: {
                    position: "top",
                    textStyle: { color: "#536d98", fontSize: 12 },
                },
                tooltip: {
                    textStyle: { color: "#536d98" },
                    showColorCode: true,
                },
                animation: {
                    duration: 2888,
                    easing: "inAndOut",
                    startup: true,
                },
                colors: ["#c73868", "#fe6768", "#fd8f58", "#ffbe78", "#ffdca8"],
            };

            if (chartData.length > 1) {
                var chart = new google.visualization.PieChart(
                    document.getElementById("agt-chart-insurers")
                );
                chart.draw(data, options);
            } else {
                document.getElementById("agt-chart-insurers").innerHTML =
                    _generateEmptyContainer();
            }
        }
    }

    function removeChartInsurers() {
        document.getElementById("agt-chart-insurers").innerHTML = "";
    }

    function drawChartInsurances(chartData) {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(function () {
            drawChart(chartData);
        });

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                is3D: true,
                pieHole: 0,
                fontSize: 12,
                pieSliceTextStyle: { color: "#fbfbfb" },
                sliceVisibilityThreshold: true,
                sliceVisibilityThreshold: 0.0001,
                legend: {
                    position: "labeled",
                    textStyle: { color: "#536d98", fontSize: 12 },
                },
                tooltip: {
                    textStyle: { color: "#536d98" },
                    showColorCode: true,
                },
                animation: {
                    duration: 2888,
                    easing: "inAndOut",
                    startup: true,
                },
                colors: ["#543888", "#262258", "#a13678", "#ec4178", "#ffa458"],
            };
            if (chartData.length > 1) {
                var chart = new google.visualization.PieChart(
                    document.getElementById("agt-chart-insurances")
                );
                chart.draw(data, options);
            } else {
                document.getElementById("agt-chart-insurances").innerHTML =
                    _generateEmptyContainer();
            }
        }
    }

    function removeChartInsurances() {
        document.getElementById("agt-chart-insurances").innerHTML = "";
    }

    function _generateEmptyContainer() {
        return "<div style='height:200px; width:100%; display:flex; align-items: center; justify-content: center;'>Sin datos</div>";
    }

    return {
        drawChartContactTypes,
        removeChartContactTypes,
        drawChartInsurers,
        removeChartInsurers,
        drawChartInsurances,
        removeChartInsurances,
    };
})();
