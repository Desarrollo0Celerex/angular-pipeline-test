var DatePickerPlugin = function() {

    function init() {
        setTimeout( () => {
            $('.fc-datepicker').datepicker({
        		showOtherMonths: true,
        		selectOtherMonths: true
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
