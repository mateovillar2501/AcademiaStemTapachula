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


        Swal.fire({
            icon: 'error',  
            title: 'Error',
            text: 'Debes ingresar código HTML válido',
            confirmButtonText: 'Entendido'
        });


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


function validarHTML(texto) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(texto, "text/html");

    // Verifica si hay al menos un elemento HTML real
    const tieneElementos = doc.body && doc.body.children.length > 0;

    // Verifica que exista al menos una etiqueta <...>
    const tieneTags = /<[^>]+>/.test(texto);

    return tieneElementos && tieneTags;

}

//<---------------------------------------->
//EDITOR DE CODIGO CON COLORES

function updateHighlight(text) {
    let resultElement = document.getElementById("highlighting-content");

    // 1. Escapar HTML para evitar ejecución
    let content = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 2. Resaltar Comentarios content = content.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>');
    content = content.replace(/(&lt;!--[\s\S]*?--&gt;|\/\*[\s\S]*?\*\/|(?<!:)\/\/.+)/g, '<span class="hl-comment">$1</span>');

    // 3. Resaltar Etiquetas HTML
    // Esta regex busca: <(/?) (nombre_etiqueta) (atributos) (/? >)
    content = content.replace(/(&lt;\/?)([a-zA-Z0-9!]+)(.*?)(\/?&gt;)/g, function (match, p1, p2, p3, p4) {

        // p1: < o </
        // p2: nombre de la etiqueta (div, p, etc)
        // p3: los atributos (class="...")
        // p4: > o />

        let processedAttributes = p3;

        // Resaltar atributos dentro de la etiqueta
        // Busca: nombre= "valor"
        processedAttributes = processedAttributes.replace(/([a-zA-Z\-]+)=/g, '<span class="hl-attr">$1</span>=');
        processedAttributes = processedAttributes.replace(/"(.*?)"/g, '<span class="hl-string">"$1"</span>');
        processedAttributes = processedAttributes.replace(/'(.*?)'/g, "<span class='hl-string'>'$1'</span>");

        return `<span class="hl-bracket">${p1}</span><span class="hl-tag">${p2}</span>${processedAttributes}<span class="hl-bracket">${p4}</span>`;
    });

    // 4. Inyectar el código procesado
    resultElement.innerHTML = content;
}

// Sincroniza el scroll del textarea con el fondo resaltado
function syncScroll(element) {
    let resultElement = document.getElementById("highlighting");
    resultElement.scrollTop = element.scrollTop;
    resultElement.scrollLeft = element.scrollLeft;
}

// Inicializar el resaltado al cargar la página si hay texto
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById("codeEditor");
    updateHighlight(editor.value);
});

/* Actualiza tu evento de la tecla Tab para llamar a updateHighlight */
document.getElementById("codeEditor").addEventListener("keydown", function (e) {

    if (e.key === "Tab") {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;

        updateHighlight(this.value); // <--- Línea importante
    }


});




