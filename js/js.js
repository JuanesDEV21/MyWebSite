const urlapi = 'http://127.0.0.1:5500/json/json.json';

async function fetchData() {
    try{
        const response = await fetch(urlapi);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error:', error);
    }
}

async function showData(){
    const data = await fetchData();

    const homeContent = document.querySelector('.home-content');
    const homeImg = document.querySelector('.home-img');

    const h1 = document.createElement('h1');
    h1.innerHTML = data.titulo
    homeContent.appendChild(h1);

    const h3 = document.createElement('h3');
    h3.className = 'text-animation';
    h3.innerHTML = data.subtitulo;
    homeContent.appendChild(h3);

    const p = document.createElement('p');
    p.innerHTML = data.descripcion;
    homeContent.appendChild(p);

    const socialDiv = document.createElement('div');
    socialDiv.className = 'social-icons';

    data.socialIcons.forEach(element => {
        const a = document.createElement('a');
        a.href = icon.url;
        const i = document.createElement('i');
        i.className = icon.clase;
        a.appendChild(i);
        socialDiv.appendChild(a);
    });
    homeContent.appendChild(socialDiv);

    const Socialbtn = document.createElement('div');
    Socialbtn.className = 'btn-group';

    data.buttons.forEach(button => {
    const btn = document.createElement('a');
    btn.className = 'btn';
    btn.textContent= button.texto;
    Socialbtn.appendChild(btn);
    });
    homecontent.appendChild(Socialbtn);
    
    const img = document.createElement('img');
    img.src = data.imagen.url;
    img.atl = data.imagen.alt;

    homeimg.appendChild(img);
}

window.onload = async () =>{
    await showData();
}