var DropifyPlugin = function() {

	function initDropify(allowedFileTypes, canShowPreview, maxFileSize) {
		const messages = {
			'default': 'Selecciona un archivo de tu dispositivo.',
			'replace': 'Selecciona otro archivo de tu dispositivo.',
			'remove': 'Eliminar archivo',
			'error': 'No se pudo cargar el archivo, intenta nuevamente.'
		}
		const error = {
			'fileSize': 'El tamaño del archivo es demasiado grande. ('+maxFileSize+' máximo).',
			'fileExtension': 'El tipo de archivo seleccionado no está permitido, solo se aceptan ' + allowedFileTypes.join(', ')
		}
		
		let dropifySettings = {
			messages,
			error,
			errorTimeout: 5000,
			allowedFileExtensions: allowedFileTypes
		}

		if(!canShowPreview) {
			dropifySettings = {...dropifySettings, tpl: { 'preview': ''} }
		}

		$('.dropify').dropify(dropifySettings);
	}

	function reset() {
		let drEvent = $('.dropify').dropify();
		drEvent = drEvent.data('dropify');
		drEvent.resetPreview();
		drEvent.clearElement();
	}

	return {
		init: function(allowedFileTypes, canShowPreview = true, maxFileSize = '2M') {
			initDropify(allowedFileTypes, canShowPreview, maxFileSize);
		},
		reset
	}

}();
