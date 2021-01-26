var TooltipPlugin = function() {

    function init() {
        setTimeout(() => {
            $('[data-toggle="tooltip"]').tooltip();
        }, 0);
    }

    return { init }
}();
