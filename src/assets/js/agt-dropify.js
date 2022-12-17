var DropifyPlugin = function() {

	function initDropify(fileType, allowedFileTypes, canShowPreview, maxFileSize) {
		let messages, error;
		if(fileType === 1) {
			messages = {
				'default': 'Selecciona una imagen de tu dispositivo.',
				'replace': 'Selecciona otra imagen de tu dispositivo.',
				'remove': 'Eliminar imagen',
				'error': 'No se pudo cargar la imagen, intenta nuevamente.'
			}
			error = {
				'fileSize': 'El tamaño de la imagen es demasiado grande. ('+maxFileSize+' máximo).',
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
				'fileSize': 'El tamaño del documento es demasiado grande. ('+maxFileSize+' máximo).',
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
				'fileSize': 'El tamaño del archivo es demasiado grande. ('+maxFileSize+' máximo).',
				'fileExtension': 'El tipo de documento seleccionado no está permitido'
			}
		} else if(fileType === 4) {
			messages = {
				'default': 'Selecciona un archivo de tu dispositivo.',
				'replace': 'Selecciona otro archivo de tu dispositivo.',
				'remove': 'Eliminar archivo',
				'error': 'No se pudo cargar el archivo, intenta nuevamente.'
			}
			error = {
				'fileSize': 'El tamaño del archivo es demasiado grande. ('+maxFileSize+' máximo).',
				'fileExtension': 'El tipo de archivo seleccionado no está permitido, solo se aceptan pdf, png, jpg, jpeg, gif y bmp'
			}
		}

		let settings = {
			messages,
			error,
			errorTimeout: 5000,
			allowedFileExtensions: allowedFileTypes
		}

		if(!canShowPreview) {
			settings = {
				...settings, 
				tpl: { 
					'preview': ''
				} 
			}
		}

		$('.dropify').dropify(settings);
	}
	
	function initDropifyAux(allowedFileExtensions, maxFileSize, canShowPreview) {
		const messages = {
			'default': 'Selecciona una archivo de tu dispositivo.',
			'replace': 'Selecciona otro archivo de tu dispositivo.',
			'remove': 'Eliminar archivo',
			'error': ''
		}
		const error = {
			'fileSize': 'El tamaño del archivo es demasiado grande. ('+maxFileSize+' máximo).',
			'fileExtension': 'El tipo de archivo seleccionado no está permitido, solo se aceptan: '+ allowedFileExtensions.join(',')
		}

		let settings = {
			messages,
			error,
			errorTimeout: 6000,
			allowedFileExtensions,
			maxFileSize
		}

		if(!canShowPreview) {
			settings = {...settings, tpl: { 'preview': ''} }
		}

		$('.dropify').dropify(settings);
	}

	function reset() {
		let drEvent = $('.dropify').dropify();
		drEvent = drEvent.data('dropify');
		drEvent.resetPreview();
		drEvent.clearElement();
	}

	return {
		init: function(fileType, allowedFileTypes, canShowPreview = true, maxFileSize = '2M') {
			initDropify(fileType, allowedFileTypes, canShowPreview, maxFileSize);
		},
		initAux: function(allowedFileExtensions, maxFileSize = '2M', canShowPreview = true) {
			initDropifyAux(allowedFileExtensions, maxFileSize, canShowPreview);
		},
		reset
	}

}();
