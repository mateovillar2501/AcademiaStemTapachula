//MODULO DE CONFIGURACIÓN PARA AGREGAR UN CURSO
let textarea = document.getElementById("codeEditor");



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
        renderCode();

    }
});


function renderCode() {

    const code = document.getElementById("codeEditor").value;
    const frame = document.getElementById("previewFrame");

    const doc = frame.contentDocument || frame.contentWindow.document;

    doc.open();
    doc.write(code);
    doc.close();
}


function clearEditor() {

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
    Validacion();

}






