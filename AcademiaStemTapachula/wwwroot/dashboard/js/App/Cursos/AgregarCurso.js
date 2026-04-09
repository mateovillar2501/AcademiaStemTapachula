//MODULO DE CONFIGURACIÓN PARA AGREGAR UN CURSO

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