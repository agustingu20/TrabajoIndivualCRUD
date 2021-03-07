const formularioForm = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const notaInput = document.getElementById('inputNota');
const categoriaInput = document.getElementById('inputCategoria');
const json = localStorage.getItem('notas');
const data = JSON.parse(json);
const notas = data || [];

formularioForm.onsubmit = function (e) {
    e.preventDefault();
    const nota = {
        titulo: tituloInput.value,
        nota: notaInput.value,
        categoria: categoriaInput.value,
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
}