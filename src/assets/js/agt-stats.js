
var StatsPlugin = function() {

    function init() {
        $('#agtPoliciesActive').circleProgress({
            value: 0.88,
            size: 78,
            fill: {
              gradient: ["#c5e8b8", "#2eb62c"]
            },
            emptyFill: 'rgba(89, 92, 115, 0.2)',
        });

        $('#agtPoliciesDied').circleProgress({
            value: 0.88,
            size: 78,
            fill: {
              gradient: ["#d3d3d3", "#686868"]
            },
            emptyFill: 'rgba(89, 92, 115, 0.2)',
        });

        $('#agtPoliciesCanceled').circleProgress({
            value: 0.88,
            size: 78,
            fill: {
              gradient: ["#f7695f", "#a41728"]
            },
            emptyFill: 'rgba(89, 92, 115, 0.2)',
        });

        $('#agtPoliciesRate').circleProgress({
            value: 0.88,
            size: 78,
            fill: {
              gradient: ["#fc427b", "#fc427b"]
            },
            emptyFill: 'rgba(89, 92, 115, 0.2)',
        });
    }

    return { init }
}();
