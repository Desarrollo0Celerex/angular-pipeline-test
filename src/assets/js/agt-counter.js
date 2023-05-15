var CounterPlugin = (function () {
    function countUp(className) {
        className = className ? className : "counter";
        setTimeout(() => {
            $("." + className).countUp();
        }, 0);
    }

    return { countUp };
})();
