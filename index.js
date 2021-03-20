const formularioForm = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const notaInput = document.getElementById('inputNota');
const categoriaInput = document.getElementById('inputCategoria');
const notasTable = document.getElementById('tabla');
const categoriaEditar = document.getElementById('editarCategoria');
const notaEditar = document.getElementById('editarValorNota');
const tituloEditar = document.getElementById('editarTitulo');
const editarForm = document.getElementById('formularioEditar');
const json = localStorage.getItem('notas');
const data = JSON.parse(json);
let notas = data || [];
let notaId = '';

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioForm.onsubmit = function (e) {
    e.preventDefault();
    const nota = {
        id: generarID(),
        titulo: tituloInput.value,
        nota: notaInput.value,
        categoria: categoriaInput.value,
        registro: Date.now(),
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
    mostrarNotas();
    formularioForm.reset();
    const myModal = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
}

function mostrarNotas() {
    const notasMap = notas.map(function (nota) {
        return `
        <tr>
        <td class="tipo-letra">${nota.titulo}</td>
        <td class="tipo-letra">${nota.categoria}</td>
        <td>
            <button onclick="mostrarDetalles('${nota.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalleNota">Ver detalle</button>
            <button onclick="cargarModalEditar('${nota.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
            <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger btn-sm">Eliminar</button>
        </td>
        </tr>
        `;
    });
    notasTable.innerHTML = notasMap.join("");
};

mostrarNotas();

function eliminarNota(id) {
    const confirmar = confirm('Confirmar para eliminar la nota.');
    if (!confirmar) {
        return;
    }
    let notasFiltradas = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const coincideId = nota.id === id;
        if (!coincideId) {
            notasFiltradas.push(nota);
        }
    }
    const json = JSON.stringify(notasFiltradas);
    localStorage.setItem('notas', json);
    notas = notasFiltradas;
    mostrarNotas();
}

function mostrarDetalles(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    const detalleDiv = document.getElementById('detalleNota');
    const fecha = new Date(notaEncontrada.registro);
    const detallesNota = `
    <p>Título: ${notaEncontrada.titulo}</p>
    <p class="border bg-warning shadow-sm fw-bold p-2 text-center rounded">${notaEncontrada.nota}</p>
    <p>Categoría: ${notaEncontrada.categoria}</p>
    <p>Fecha de creación: ${fecha.toLocaleString()}</p>
    `;
    detalleDiv.innerHTML = detallesNota;
}

function cargarModalEditar(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    tituloEditar.value = notaEncontrada.titulo;
    notaEditar.value = notaEncontrada.nota;
    categoriaEditar.value = notaEncontrada.categoria;
    notaId = notaEncontrada.id;
}

editarForm.onsubmit = function editarNota(e) {
    e.preventDefault();
    const notasModificada = notas.map((nota) => {
        if (nota.id === notaId) {
            const notaModificada = {
                ...nota,
                titulo: tituloEditar.value,
                nota: notaEditar.value,
                categoria: categoriaEditar.value,
            };
            return notaModificada;
        } else {
            return nota;
        }
    });
    const json = JSON.stringify(notasModificada);
    localStorage.setItem('notas', json);
    notas = notasModificada;
    mostrarNotas();
    const myModal = document.getElementById('modalEditar');
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
}