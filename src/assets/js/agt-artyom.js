var ArtyomPlugin = function(){
    var artyom;

    function init(artyomConfig, artyomCommads, appContext) {
        artyom = new Artyom();
        artyom.initialize(artyomConfig);
        loadCommands(artyomCommads, appContext);
        loadTriggers(appContext);
    }

    function startSpeechRecognition() {
        artyom.fatality(); // use this to stop any of
        artyom.initialize({ listen: true });
    }

    function stopSpeechRecognition() {
        artyom.fatality();
    }

    function loadCommands(artyomCommads, appContext) {
        for(let command of artyomCommads) {
            artyom.addCommands([{
                indexes: command.commands,
                smart: command.isSmart,
                action: (i, data) => {
                    command.action(appContext, data);
                }
            }]);
        }
    }

    function loadTriggers(appContext) {
        artyom.when('NOT_COMMAND_MATCHED', function() {
            appContext._commandNotFound();
            artyom.fatality();
        })
        artyom.when('COMMAND_RECOGNITION_END', function(status) {
            appContext._hideModalTalking();
        })
        artyom.redirectRecognizedTextOutput((recognized, isFinal) => {
            //if(isFinal) {
                appContext.setTextRecognized(recognized);
            //}
        })
    }

    function checkIfRecognizingSupported() {
        return artyom.recognizingSupported();
    }

    return {
        init,
        startSpeechRecognition,
        checkIfRecognizingSupported,
        stopSpeechRecognition
    }
}();
