var ModalPlugin = function() {

    function show(modalId) {
        $('#' + modalId).modal({show: true, backdrop: 'static', keyboard: false});
    }

    function hide(modalId) {
        $('#' + modalId).modal('hide');
    }

    function setFixed() {
        $(window).scrollTop(0);
        $('body').addClass('agt-fixed-body');
    }

    function removeFixed() {
        $('body').removeClass('agt-fixed-body');
    }

    return {
        show,
        hide,
        setFixed,
        removeFixed
    }
}();
