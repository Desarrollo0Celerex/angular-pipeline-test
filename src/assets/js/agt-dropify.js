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
		
		let settings = {
			messages,
			error,
			errorTimeout: 5000,
			allowedFileExtensions: allowedFileTypes
		}

		console.log('settings: ',settings);

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
		init: function(allowedFileTypes, canShowPreview = true, maxFileSize = '2M') {
			initDropify(allowedFileTypes, canShowPreview, maxFileSize);
		},
		initAux: function(allowedFileExtensions, maxFileSize = '2M', canShowPreview = true) {
			initDropifyAux(allowedFileExtensions, maxFileSize, canShowPreview);
		},
		reset
	}

}();
