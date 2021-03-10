var Select2Plugin = function() {

	function initSelect() {
		setTimeout(function() {
			$('.select2').select2({
				minimumResultsForSearch: Infinity,
				width: '100%'
			});
		}, 0);
	}

	function initSearch(onItemSelected, context) {
		$('.select2-show-search').select2({
			minimumResultsForSearch: '',
			width: '100%'
		});

		$('.select2-selection__rendered').on('DOMSubtreeModified', function() {
			const selectedValue = $('.select2-show-search').val();
			onItemSelected(context, selectedValue);
		})
	}

	return {
		initSelect,
		initSearch
	}
}();
