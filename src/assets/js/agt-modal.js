var ModalPlugin = (function () {
    function show(modalId) {
        $("#" + modalId).modal({
            show: true,
            backdrop: "static",
            keyboard: false,
        });

        // Fix to add scroll to modal when modals are opened consecutively.
        setTimeout(() => {
            $(document.body).addClass("modal-open");
        }, 1000);
    }

    function hide(modalId) {
        $("#" + modalId).modal("hide");
    }

    return {
        show,
        hide,
    };
})();
