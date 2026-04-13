//MODULO DE CONFIGURACIÓN PARA AGREGAR UN CURSO
let textarea = document.getElementById("codeEditor");

document.addEventListener('DOMContentLoaded', function () {
    const inputImagen = document.getElementById('inputImagen');
    const imgPreview = document.getElementById('imgPreview');

    // Escuchar el cambio en el input de archivo
    inputImagen.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Cambiar el src de la imagen por el resultado de la lectura
                imgPreview.setAttribute('src', e.target.result);
                imgPreview.classList.add('border-info'); // Resaltar borde al cargar
            }

            reader.readAsDataURL(file);
        } else {
            // Volver al placeholder si no hay archivo
            imgPreview.setAttribute('src', '');
        }
    });

    // Acción para abrir el modal desde tu botón "AGREGAR CURSO"
    // (Asegúrate de quitar el 'disabled' de tu botón verde en el Nav si quieres probarlo)
    const btnActivarModal = document.getElementById('Enviar');
    btnActivarModal.addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('modalAgregarCurso'));
        myModal.show();
    });
});


$('#FormularioCodigo').on('submit', function (e) {
    e.preventDefault();

    validarHTML();

    if (!validarHTML(textarea.value)) {
        e.preventDefault();
        alert("Debes ingresar código HTML válido");
        document.getElementById("Enviar").disabled = true;
        document.getElementById('previewFrame').src = 'about:blank';
    }
    else {
        document.getElementById("Enviar").disabled = false;
        VistaPrevia();

    }
});


function VistaPrevia() {

    const code = document.getElementById("codeEditor").value;
    const frame = document.getElementById("previewFrame");

    const doc = frame.contentDocument || frame.contentWindow.document;

    doc.open();
    doc.write(code);
    doc.close();
}


function limpiarEditor() {

    location.reload();
}


/* Permitir TAB dentro del textarea como editor real */

document.getElementById("codeEditor").addEventListener("keydown", function (e) {

    if (e.key === "Tab") {
        e.preventDefault();

        let start = this.selectionStart;
        let end = this.selectionEnd;

        this.value = this.value.substring(0, start)
            + "\t"
            + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;
    }

});

function validarHTML(texto) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(texto, "text/html");

    // Verifica si hay al menos un elemento HTML real
    const tieneElementos = doc.body && doc.body.children.length > 0;

    // Verifica que exista al menos una etiqueta <...>
    const tieneTags = /<[^>]+>/.test(texto);

    return tieneElementos && tieneTags;

}






