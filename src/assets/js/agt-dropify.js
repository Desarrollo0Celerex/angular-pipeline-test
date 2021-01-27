var DropifyPlugin = function() {

	function initDropify(fileTypes, canShowPreview) {
		let dropifySettings = {
			messages: {
				'default': 'Selecciona una imagen de tu dispositivo.',
				'replace': 'Selecciona otra imagen de tu dispositivo.',
				'remove': 'Eliminar imagen.',
				'error': 'No se pudo cargar tu imagen, intenta nuevamente.'
			},
			error: {
				'fileSize': 'El tamaño del archivo es demasiado grande. (2M máximo).',
				'fileExtension': 'El archivo no está permitido, solo se aceptan png, jpg, jpeg, gif y bmp'
			},
			errorTimeout: 5000,
			allowedFileExtensions: fileTypes
		}

		if(!canShowPreview) {
			dropifySettings = {...dropifySettings, tpl: { 'preview': ''} }
		}

		$('.dropify').dropify(dropifySettings);
	}

	return {
		init: function(fileTypes, canShowPreview = true) {
			initDropify(fileTypes, canShowPreview);
		}
	}

}();
