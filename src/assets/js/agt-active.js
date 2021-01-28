var ActivePlugin = function() {

    function init() {
        $(".horizontalMenu-list li a").each(function() {
            $(this).removeClass("active");
        });
        $(".horizontalMenu-list li ul li a").each(function() {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().parent().siblings().addClass("active");
			}
		});
    }

    return { init };
}();
