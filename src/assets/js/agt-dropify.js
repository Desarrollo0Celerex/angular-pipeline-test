var DropifyPlugin = (function () {
    function addFilePreview(src, fileName, isPreviewable) {
        let input = $(".dropify-v2");
        let wrapper = input.closest(".dropify-wrapper");
        let preview = wrapper.find(".dropify-preview");
        let filename = wrapper.find(".dropify-filename-inner");
        let render = wrapper.find(".dropify-render").html("");

        input.val("").attr("title", fileName);
        wrapper.removeClass("has-error").addClass("has-preview");
        filename.html(fileName);

        if (isPreviewable === true) {
            var imgTag = $("<img />").attr("src", src);
            imgTag.appendTo(render);
        } else {
            $("<i />").attr("class", "dropify-font-file").appendTo(render);
            $('<span class="dropify-extension" />')
                .html(getFileExtension(fileName))
                .appendTo(render);
        }

        preview.fadeIn();
    }

    function generateFileBase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    }

    function getFileExtension(fileName) {
        return fileName.split(".").pop().toLowerCase();
    }

    function getImageExtensionFromBase64(base64Data) {
        const regex = /^data:image\/(\w+);base64,/;
        const matches = base64Data.match(regex);
        if (matches && matches.length === 2) {
            return matches[1];
        }
        return null;
    }

    function isImage(fileType) {
        const imgFileExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
        return imgFileExtensions.indexOf(fileType) != "-1" ? true : false;
    }

    function initDropify(allowedFileTypes, canShowPreview, maxFileSize) {
        const messages = {
            default: "Selecciona un archivo de tu dispositivo.",
            replace: "Selecciona otro archivo de tu dispositivo.",
            remove: "Eliminar archivo",
            error: "No se pudo cargar el archivo, intenta nuevamente.",
        };
        const error = {
            fileSize:
                "El tamaño del archivo es demasiado grande. (" +
                maxFileSize +
                " máximo).",
            fileExtension:
                "El tipo de archivo seleccionado no está permitido, solo se aceptan 01 " +
                allowedFileTypes.join(", "),
        };

        let settings = {
            messages,
            error,
            errorTimeout: 5000,
            allowedFileExtensions: allowedFileTypes,
        };

        if (!canShowPreview) {
            settings = {
                ...settings,
                tpl: {
                    preview: "",
                },
            };
        }

        $(".dropify").dropify(settings);
    }

    function initDropifyV2(
        allowedFileExtensions,
        maxFileSize,
        canShowPreview,
        defaultFile,
        filePreviewUrl
    ) {
        const messages = {
            default: "Selecciona una archivo de tu dispositivo.",
            replace: "Selecciona otro archivo de tu dispositivo.",
            remove: "Eliminar archivo",
            error: "",
        };
        const error = {
            fileSize:
                "El tamaño del archivo es demasiado grande. (" +
                maxFileSize +
                " máximo).",
            fileExtension:
                "El tipo de archivo seleccionado no está permitido, solo se aceptan: " +
                allowedFileExtensions.join(", ") +
                ".",
        };

        let settings = {
            messages,
            error,
            errorTimeout: 10000,
            allowedFileExtensions,
            maxFileSize,
        };

        if (!canShowPreview) {
            settings = { ...settings, tpl: { preview: "" } };
        }

        $(".dropify-v2").dropify(settings);

        // If has default file, then add preview
        if (defaultFile) {
            generateFileBase64(defaultFile).then((fileBase64) => {
                const fileExtension = getImageExtensionFromBase64(fileBase64);
                const isPreviewable = isImage(fileExtension);
                addFilePreview(fileBase64, defaultFile.name, isPreviewable);
            });
        }
        // Else if has preview url, then add preview url
        else if (filePreviewUrl) {
            const fileExtension = getFileExtension(filePreviewUrl);
            const isPreviewable = isImage(fileExtension);
            addFilePreview(filePreviewUrl, filePreviewUrl, isPreviewable);
        }
    }

    function reset(inputId) {
        let element = $("#" + inputId).dropify();
        resetDropify(element);
    }

    function resetV2() {
        let element = $(".dropify-v2").dropify();
        resetDropify(element);
    }

    function resetDropify(element) {
        element = element.data("dropify");
        element.resetPreview();
        element.clearElement();
        $(".dropify-wrapper").removeClass("has-error");
    }

    return {
        init: function (
            allowedFileTypes,
            canShowPreview = true,
            maxFileSize = "2M"
        ) {
            initDropify(allowedFileTypes, canShowPreview, maxFileSize);
        },
        initV2: function (
            allowedFileExtensions,
            maxFileSize = "2M",
            canShowPreview = true,
            defaultFile = null,
            filePreviewUrl = ""
        ) {
            initDropifyV2(
                allowedFileExtensions,
                maxFileSize,
                canShowPreview,
                defaultFile,
                filePreviewUrl
            );
        },
        reset: function (inputId = "dropify") {
            reset(inputId);
        },
        resetV2: function () {
            resetV2();
        },
    };
})();
