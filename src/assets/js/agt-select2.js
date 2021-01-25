var Select2Plugin = function() {

	function init() {
		$('.select2').select2({
			minimumResultsForSearch: Infinity,
			width: '100%'
		});

		// Select2 by showing the search
		$('.select2-show-search').select2({
			minimumResultsForSearch: '',
			width: '100%'
		});
	}

	return { init }
}();
