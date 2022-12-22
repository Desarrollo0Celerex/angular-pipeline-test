var Select2Plugin = function() {

	function initSelect() {
		setTimeout(function() {
			$('.select2').select2({
				minimumResultsForSearch: Infinity,
				width: '100%'
			});
		}, 0);
	}

	function initSearch(elementId, onItemSelected, context) {
		$('#'+elementId).select2({
			minimumResultsForSearch: '',
			width: '100%'
		});

		$('#'+elementId).on('select2:select', function (event) {
			const selectedValue = event.target.value;
			onItemSelected(context, selectedValue, elementId);
		});
	}

	function setValue(elementId, id) {
		$('#'+elementId).val(id).trigger('change');
	}

	return {
		initSelect,
		initSearch,
		setValue
	}
}();
