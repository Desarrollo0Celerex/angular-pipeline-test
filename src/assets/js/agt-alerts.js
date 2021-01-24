var SwalPlugin = function() {

	/**
	 * Muestra un alert
	 * @param  object alertData Datos de la alerta
	 */
	function showAlert(alertData) {
		swal({
			title: alertData.title,
		    text: alertData.text,
		    type: alertData.type,
		    confirmButtonText: alertData.confirmButtonText,
		    showCancelButton: (alertData.showCancelButton) ? alertData.showCancelButton : false,
		    cancelButtonText: (alertData.cancelButtonText) ? alertData.cancelButtonText : ''
		},
		function() {
			// Si fue recibido un callback
			if(alertData.callBack) {
				// si fue recibido un contexto
				if(alertData.context) {
					// Si fue recibido una data
					if(alertData.data) {
						// Ejecutar el callBack con el contexto dado y la data enviada
						alertData.callBack(alertData.context, alertData.data);
					} else {
						// Ejecutar el callBack con el contexto dado
						alertData.callBack(alertData.context);
					}
				} else {
					// Ejecutar el callBack
					alertData.callBack();
				}
			}
		})
	}

	return {
		showAlert: function(alertData) {
			showAlert(alertData);
		}
	}
}();
