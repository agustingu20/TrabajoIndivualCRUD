const formularioForm = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const notaInput = document.getElementById('inputNota');
const categoriaInput = document.getElementById('inputCategoria');
const notasTable = document.getElementById('tabla');
const json = localStorage.getItem('notas');
const data = JSON.parse(json);
const notas = data || [];

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
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
    mostrarNotas();
    formularioForm.reset();
}

function mostrarNotas() {
    const notasMap = notas.map(function (nota) {
        return `
        <tr>
        <td class="tipo-letra">${nota.titulo}</td>
        <td class="tipo-letra">${nota.categoria}</td>
        </tr>
        `;
    });
    notasTable.innerHTML = notasMap.join("");
};

mostrarNotas();