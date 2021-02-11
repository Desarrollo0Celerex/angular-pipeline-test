var CounterPlugin = function() {

    function countUp() {
        setTimeout( () => {
            $('.counter').countUp();
        }, 0);
    }

    return { countUp }
}();
