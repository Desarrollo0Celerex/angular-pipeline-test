var TimePickerPlugin = function() {

    function init() {
        setTimeout( () => {
            $('.fc-timepicker').timepicker({
                timeFormat: 'g:i A'
            });
        },0);
    }

    function initElement(selectorId, onValueChanged, context) {
        setTimeout( () => {
            $('#'+selectorId).on('change', function() {
                const changedValue = $('#'+selectorId).val();
    			onValueChanged(selectorId, changedValue, context);
    		})
        },0);
    }

    return { init, initElement }
}();
