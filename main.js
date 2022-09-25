let url;

function pegarPosicao(){
    navigator.geolocation.getCurrentPosition((pos) =>{
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=95b11822eb429c84c1143a19251b1881`;
        fetchApi(url);
    })
}

function fetchApi(url){
    let cidade = document.querySelector('.cidade');
    let temperatura = document.querySelector('.temperaturaSpan');
    fetch(url)
    .then((dado) => {
        return dado.json();
    })
    .then((dado) => {

        let temperaturaCelcius = ((5/9) * (dado.main.temp-32)).toFixed(1);
        cidade.innerText = dado.name;
        temperatura.innerText = `${temperaturaCelcius}°C`;

        let temperaturaMax = ((5/9) * (dado.main.temp_max-32)).toFixed(1);
        let temperaturaMin = ((5/9) * (dado.main.temp_min-32)).toFixed(1);

        let temperaturaMaxMin = document.querySelector('.maximo-minima');
        temperaturaMaxMin.innerText = `${temperaturaMin}/${temperaturaMax}`;

        let weather = dado.weather[0].description;
        let clima = document.querySelector('.clima');
        clima.innerText = weather;
    })
    .catch ((err => {
        cidade.innerText = `Impossível acessar o OpenWeather. Verifique sua conexão`;
        temperatura.innerText = '-';
    }))
}

pegarPosicao();

function data(){
    dataAtual = new Date();
    dia = dataAtual.getDate();
    diaSemana = dataAtual.getDay();
    switch(diaSemana) {
        case 0 : diaSemana = 'Domingo'; break;
        case 1 : diaSemana = 'Segunda'; break;
        case 2 : diaSemana = 'Terça'; break;
        case 3 : diaSemana = 'Quarta'; break;
        case 4 : diaSemana = 'Quinta'; break;
        case 5 : diaSemana = 'Sexta'; break;
        case 6 : diaSemana = 'Sábado'; break;
    }
    mes = (dataAtual.getMonth())+1;
    switch(mes) {
        case 1 : mes = 'Janeiro'; break;
        case 2 : mes = 'Fevereiro'; break;
        case 3 : mes = 'Março'; break;
        case 4 : mes = 'Abril'; break;
        case 5 : mes = 'Maio'; break;
        case 6 : mes = 'Junho'; break;
        case 7 : mes = 'Julho'; break;
        case 8 : mes = 'Agosto'; break;
        case 9 : mes = 'Setembro'; break;
        case 10 : mes = 'Outubro'; break;
        case 11 : mes = 'Novembro'; break;
        case 12 : mes = 'Dezembro'; break;

    }
    ano = dataAtual.getFullYear();

    let data = document.querySelector('.data');
    data.innerText = `${diaSemana}, ${dia} de ${mes} de ${ano}`
}

data();