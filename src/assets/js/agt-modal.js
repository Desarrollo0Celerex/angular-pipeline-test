var ModalPlugin = function() {

    function show(modalId) {
        $('#' + modalId).modal('show');
    }

    function hide(modalId) {
        $('#' + modalId).modal('hide');
    }

    return {
        show,
        hide
    }
}();
