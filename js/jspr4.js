//DOM: Document Object Model (Doc. del modelo de objetos)
const container = document.querySelector('.container'); //Selecciono el contenedor principal de la página.
const search = document.querySelector('.search-box button'); //Selecciono el botón de búsqueda dentro de la caja de búsqueda (search-box).
const weatherBox = document.querySelector('.weather-box'); //Selecciono el contenedor donde se mostrará la información principal del clima.
const weatherDetails = document.querySelector('.weather-details'); //Selecciono el contenedor donde se mostrarán los detalles adicionales del clima (como humedad y viento).
const error404 = document.querySelector('.not-found'); //Selecciono el contenedor que se mostrará si ocurre un error 404 (ciudad no encontrada).
//Evento de Click para Iniciar la Búsqueda:
search.addEventListener('click', () => {
//Se añade un listener al botón de búsqueda para que cuando el usuario haga clic, se ejecute el código dentro de la función.
    const APIKey = 'b63cc0570671b2b842dec8645bbcc65f'; //Clave API de OpenWeather
    const city = document.querySelector('.search-box input').value; //Obtiene el valor ingresado por el usuario
//Validación del Campo de Búsqueda:
    if (city === '')
        return; //Si el campo de la ciudad está vacío, el código no hace nada (usando return para salir de la función).
//Solicitud a la API de OpenWeather:
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`) //Realizo una solicitud HTTP a la API de OpenWeather, usando el nombre de la ciudad ingresada por el usuario y la clave API.
        .then(response => response.json()) //Convierte la respuesta de la API en un objeto JSON para que sea fácil de manejar en JavaScript.
        .then(json => {
        //Gestión de Errores (Ciudad No Encontrada):
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
        //Si la API devuelve un código de error 404, que significa que la ciudad no fue encontrada, se muestra un mensaje de error
            error404.style.display = 'none'; //Se ocultan los contenedores de información del clima (weatherBox y weatherDetails) y se muestra el contenedor de error (error404).
            error404.classList.remove('fadeIn');
        //Mostrar Información del Clima:
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
        //Si no hay error, se seleccionan los elementos HTML donde se va a mostrar la información del clima: imagen, temperatura, descripción, humedad y velocidad del viento.
            //Menu Switch-Case para el Cambio de Imagen Según el Clima:
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '../assest/clear.png';
                    break;

                case 'Rain':
                    image.src = '../assest/rain.png';
                    break;

                case 'Snow':
                    image.src = '../assest/snow.png';
                    break;

                case 'Clouds':
                    image.src = '../assest/cloud.png';
                    break;

                case 'Haze':
                    image.src = '../assest/mist.png';
                    break;

                default:
                    image.src = '';
            } //Dependiendo de la condición climática (json.weather[0].main), se cambia la imagen correspondiente para representar el estado del tiempo: despejado, lluvia, nieve, nubes, o neblina.
        //Mostrar los Detalles del Clima:
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; //Se actualiza con la temperatura actual de la ciudad.
            description.innerHTML = `${json.weather[0].description}`; //Muestra una descripción del clima (por ejemplo, "lluvioso", "nublado").
            humidity.innerHTML = `${json.main.humidity}%`; //Muestra el porcentaje de humedad.
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; //Muestra la velocidad del viento en kilómetros por hora.
        //Mostrar los Contenedores y Animación:
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        }); //Finalmente, se muestran los contenedores del clima con una animación (fadeIn) y se ajusta el tamaño del contenedor para acomodar la información.
});