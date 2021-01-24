//AGENTHOS V 1.0.1 -->
//AGENTHOS ALERTS -->
//11/01/21 -->

$(document).ready(function() {

//UNIVERSAL ALERTS

	//AGENTHOS - ACTION BLOCKED
	$("#agtActionBlocked").on("click", function(e) {
		swal({
			title: "Acción Bloqueada",
			text: "No cuentas con los permisos suficientes para realizar esta acción.",
			type: "warning",
			showCancelButton: false,
			confirmButtonText: 'ACEPTAR',
			cancelButtonText: ''
		});
	});

	//AGENTHOS - ERROR EN PETICIÓN
	$("#agtActionError").on("click", function(e) {
		swal({
			title: "Error",
			text: "No fue posible realizar la solicitud.",
			type: "error",
			showCancelButton: true,
			confirmButtonText: 'INTENTAR NUEVAMENTE',
			cancelButtonText: 'CANCELAR'
		});
	});

	//AGENTHOS - DATOS ACTUALIZADOS
	$("#agtDataUpdated").on("click", function(e) {
		swal({
			title: "Datos Actualizados",
			text: "Los datos se han guardado con éxito.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});


	// VIEW AGTVIEW0002 - NEW AGENT
	$("#agtAgentCreated").on("click", function(e) {
		swal({
			title: "Agente Registrado",
			text: "Tu espacio de trabajo se ha creado con éxito.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0003 - IMAGE UPLOADED
	$("#agtAgentLogoCreated").on("click", function(e) {
		swal({
			title: "Imagen Cargada",
			text: "La imagen del agente ha sido cargada con éxtio.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0003 - IMAGE CANCELED
	$("#agtAgentLogoCanceled").on("click", function(e) {
		swal({
			title: "Imagen Descartada",
			text: "La imagen del agente no ha sido cargada.",
			type: "error",
			showCancelButton: false,
			confirmButtonText: 'ACEPTAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0004 - ACTIVATED ATOM PASS 
	$("#agtAgentLicenceActivated").on("click", function(e) {
		swal({
			title: "Licencia Activada",
			text: "Tu licencia ha sido activada con éxtio.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0004 - INVALID ATOM PASS
	$("#agtAgentLicenceInvalid").on("click", function(e) {
		swal({
			title: "Licencia Inválida",
			text: "La licencia ingresada no pudo ser activada.",
			type: "error",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0004 - ACTIVE FREE TRIAL
	$("#agtAgentFreeTrial").on("click", function(e) {
		swal({
			title: "Acceso Permitido",
			text: "El periodo de prueba de 30 días ha sido activado.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0005 - SENT INVITE
	$("#agtInviteSent").on("click", function(e) {
		swal({
			title: "Invitación Enviada",
			text: "Tu invitación ha sido enviada con éxito.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0005 - SEND INVITE LIMIT (3 MAX)
	$("#agtInviteLimit").on("click", function(e) {
		swal({
			title: "Límite Alcanzado",
			text: "Ya no puedes reenviar esta invitación.",
			type: "error",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0005 - DELETE INVITATION
	$("#agtInviteTrash").on("click", function(e) {
		swal({
			title: "Eliminar Invitación",
			text: "Esta invitación será eliminada de tu espacio de trabajo.",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'CONFIRMAR',
			cancelButtonText: 'CANCELAR'
		});
	});

	// VIEW AGTVIEW0005 - DELET USER
	$("#agtInviteDelete").on("click", function(e) {
		swal({
			title: "Eliminar Usuario",
			text: "Este usuario será eliminado de tu espacio de trabajo.",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'CONFIRMAR',
			cancelButtonText: 'CANCELAR'
		});
	});

	// VIEW AGTVIEW0005 - DELET USER
	$("#agtUserRolNew").on("click", function(e) {
		swal({
			title: "Rol Actualizado",
			text: "Los permisos para este usuario han cambiado.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0016 - UPLOAD POLICY
	$("#agtPolicyUpload").on("click", function(e) {
		swal({
			title: "Póliza Cargada",
			text: "La poliza se ha actualizado en la cartera del contacto.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0033 - APPLY PAY
	$("#agtPayApply").on("click", function(e) {
		swal({
			title: "Pago Aplicado",
			text: "El pago ha sido aplicado con éxtio.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0028 - DELETE FILE
	$("#agtFileDelete").on("click", function(e) {
		swal({
			title: "Archivo Eliminado",
			text: "El archivo se ha eliminado con éxito.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});

	// VIEW AGTVIEW0029 - UPLOAD FILE
	$("#agtFileUpload").on("click", function(e) {
		swal({
			title: "Archivo Actualizado",
			text: "El archivo se ha actualizado con éxito.",
			type: "success",
			showCancelButton: false,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: ''
		});
	});



	// Message
	$("#but1").on("click", function(e) {
		var message = $("#message").val();
		if (message == "") {
			message = "Your message";
		}
		swal(message);
	});
	// With message and title
	$("#but2").on("click", function(e) {
		var message = $("#message").val();
		var title = $("#title").val();
		if (message == "") {
			message = "Your message";
		}
		if (title == "") {
			title = "Your message";
		}
		swal(title, message);
	});
	// Show image
	$("#but3").on("click", function(e) {
		var message = $("#message").val();
		var title = $("#title").val();
		if (message == "") {
			message = "Your message";
		}
		if (title == "") {
			title = "Your message";
		}
		swal({
			title: title,
			text: message,
			imageUrl: '../../assets/images/brand/logo.png'
		});
	});
	// Timer
	$("#but4").on("click", function(e) {
		var message = $("#message").val();
		var title = $("#title").val();
		if (message == "") {
			message = "Your message";
		}
		if (title == "") {
			title = "Your message";
		}
		message += "(close after 2 seconds)";
		swal({
			title: title,
			text: message,
			timer: 2000,
			showConfirmButton: false
		});
	});
	//
	$("#click33").on("click", function(e) {
		var type = $("#type").val();
		swal({
			title: "Title",
			text: "Your message",
			type: type
		});
	});
	// Prompt
	$("#prompt").on("click", function(e) {
		swal({
			title: "Add",
			text: "Enter your message",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			inputPlaceholder: "Your message"
		}, function(inputValue) {
			if (inputValue != "") {
				swal("Input", "You have entered : " + inputValue);
			}
		});
	});
	// Confirm
	$("#confirm").on("click", function(e) {
		swal({
			title: "Alert",
			text: "Are you really want to exit",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});

	$("#click3").on("click", function(e) {
		swal({
			title: "Alert",
			text: "Waring alert",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});

	$("#click11").on("click", function(e) {
		swal('Congratulations!', 'Your message has been succesfully sent', 'success');
	});
	$("#click1").on("click", function(e) {
		swal({
			title: "Alert",
			text: "Waring alert",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});
	$("#click2").on("click", function(e) {
		swal({
			title: "Alert",
			text: "Danger alert",
			type: "error",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});
});