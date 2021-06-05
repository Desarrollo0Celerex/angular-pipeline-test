var DropifyPlugin = function() {

	function initDropify(fileType, allowedFileTypes, canShowPreview) {
		let message, error;
		if(fileType === 1) {
			messages = {
				'default': 'Selecciona una imagen de tu dispositivo.',
				'replace': 'Selecciona otra imagen de tu dispositivo.',
				'remove': 'Eliminar imagen',
				'error': 'No se pudo cargar la imagen, intenta nuevamente.'
			}
			error = {
				'fileSize': 'El tamaño de la imagen es demasiado grande. (2M máximo).',
				'fileExtension': 'El tipo de imagen seleccionada no está permitido, solo se aceptan png, jpg, jpeg, gif y bmp'
			}
		} else if(fileType === 2) {
			messages = {
				'default': 'Selecciona un documento de tu dispositivo.',
				'replace': 'Selecciona otro documento de tu dispositivo.',
				'remove': 'Eliminar documento',
				'error': 'No se pudo cargar el documento, intenta nuevamente.'
			}
			error = {
				'fileSize': 'El tamaño del documento es demasiado grande. (2M máximo).',
				'fileExtension': 'El tipo de documento seleccionado no está permitido, solo se aceptan pdf'
			}
		} else if(fileType === 3) {
			messages = {
				'default': 'Selecciona un archivo de tu dispositivo.',
				'replace': 'Selecciona otro archivo de tu dispositivo.',
				'remove': 'Eliminar archivo',
				'error': 'No se pudo cargar el archivo, intenta nuevamente.'
			}
			error = {
				'fileSize': 'El tamaño del archivo es demasiado grande. (2M máximo).',
				'fileExtension': 'El tipo de documento seleccionado no está permitido, solo se aceptan xxx'
			}
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

	return {
		init: function(fileType, allowedFileTypes, canShowPreview = true) {
			initDropify(fileType, allowedFileTypes, canShowPreview);
		}
	}

}();
