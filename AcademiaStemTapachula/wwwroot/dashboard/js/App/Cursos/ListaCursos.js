//MODULO DE CONFIGURACIÓN PARA LA LISTA DE CURSOS

// Datos de ejemplo
const cursos = [
    {
        id: 1,
        titulo: "Introducción a Arduino",
        descripcion: "Aprende las bases de la electrónica y programación de microcontroladores.",
        imagen: "https://images.unsplash.com/photo-1553448995-f19c327230c7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        titulo: "Robótica Industrial",
        descripcion: "Sistemas avanzados y brazos robóticos para procesos de manufactura.",
        imagen: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        titulo: "IA y Visión Artificial",
        descripcion: "Dale 'ojos' a tus robots usando Python y librerías de Inteligencia Artificial.",
        imagen: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    }
];

const container = document.getElementById('courseContainer');

// Función para renderizar tarjetas
function renderCursos() {
    container.innerHTML = '';
    cursos.forEach(curso => {
        const cardHTML = `
                <div class="col-md-6 col-lg-4 course-col">
                    <div class="card card-robot h-100">
                        <img src="${curso.imagen}" class="card-img-top" alt="${curso.titulo}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${curso.titulo}</h5>
                            <p class="card-text text-muted">${curso.descripcion}</p>
                            <div class="mt-auto d-flex justify-content-between">
                                <button class="btn btn-edit px-5" onclick="editarCurso(${curso.id})">
                                    Editar
                                </button>
                                <button class="btn btn-delete px-5" onclick="eliminarCurso(${curso.id})">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        container.innerHTML += cardHTML;
    });
}

// Interacciones (Funciones de JS)
function editarCurso(id) {
    const curso = cursos.find(c => c.id === id);
    alert(`🚀 Entrando al modo edición para: ${curso.titulo}\n(Aquí podrías abrir un formulario modal)`);
}

function eliminarCurso(id) {
    const curso = cursos.find(c => c.id === id);

    Swal.fire({
        title: '¿Eliminar curso?',
        text: `Vas a eliminar: ${curso.titulo}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {

            const index = cursos.findIndex(c => c.id === id);
            if (index > -1) {
                cursos.splice(index, 1);
                renderCursos(); 
            }

            Swal.fire({
                title: 'Eliminado',
                text: 'El curso ha sido eliminado correctamente',
                icon: 'success'
            });
        }
    });
}

// Inicializar
renderCursos();
