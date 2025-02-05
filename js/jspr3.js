//Este evento asegura que el código JS se ejecute solo después de que el documento HTML esté completamente cargado.
document.addEventListener('DOMContentLoaded', function () { //Selección de elementos del DOM: 
    const form = document.querySelector('.search-box'); //Selecciono el formulario con la clase search-box
    const input = form.querySelector('input[type="search"]'); //Dentro del formulario, selecciono el campo de entrada de tipo "search".
    const resultsContainer = document.querySelector('.results'); //Selecciono el contenedor donde se mostrarán los resultados de búsqueda.
    const resultsCounter = document.querySelector('header p'); //Selecciono un párrafo dentro de la etiqueta header para mostrar el número de resultados encontrados.
    //Manejo del envío del formulario:
    form.addEventListener('submit', function (event) { //Asocio un evento al formulario que se activa cuando el usuario intenta enviarlo.
        event.preventDefault(); //Prevengo el comportamiento por defecto del formulario (al recargar la página).
        const searchTerm = input.value; //Tomo el valor que el usuario introdujo en el campo de búsqueda.
        if (searchTerm) { //Si el término de búsqueda no está vacío, llamo a la función searchWikipedia para hacer la búsqueda en Wikipedia.
            searchWikipedia(searchTerm);
        }
    });
    //Función searchWikipedia:
    function searchWikipedia(searchTerm) { //construyo la URL de la API de Wikipedia con el término de búsqueda proporcionado.
        const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}&srnamespace=0`;
    //Se incluyen varios parámetros en la URL, como el formato de la respuesta (json), el número de resultados (srlimit=500), y el término de búsqueda (srsearch=${encodeURIComponent(searchTerm)}).
        fetch(url) //Realizo una solicitud HTTP GET a la API de Wikipedia usando fetch.
            .then(response => response.json()) //Convierto la respuesta a formato JSON.
            .then(data => {
                displayResults(data.query.search); //Llamo a la función displayResults para mostrar los resultados devueltos por la API.
            })
            .catch(error => alert('Error: ' + error)); //Si ocurre un error durante la solicitud, muestra una alerta con el mensaje de error.
    }
    //Función displayResults:
    function displayResults(results) {
        resultsContainer.innerHTML = ''; //Limpio el contenido anterior del contenedor de resultados.
        resultsCounter.textContent = `Número de resultados: ${results.length}`; //Número de resultados: ${results.length};: Actualiza el párrafo para mostrar cuántos resultados se encontraron.
        results.forEach(result => { //Ciclo para los resultados devueltos por la API y creo elementos HTML para cada uno.
            const resultElement = document.createElement('div'); //Creo un div con la clase result que contiene el título, un fragmento del resultado, y un enlace a la página de Wikipedia correspondiente.
            resultElement.className = 'result'; 
            resultElement.innerHTML = ` 
                <h3>${result.title}</h3>
                <p>${result.snippet}...</p>
                <a href="https://es.wikipedia.org/?curid=${result.pageid}" target="_blank">Leer más</a>
            `;
            resultsContainer.appendChild(resultElement); //Agrego el nuevo resultado al contenedor de resultados.
        });
    }
});
