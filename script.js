function abrirlogin()   {
    document.getElementById('modal').style.top = "0%";
}
function fecharlogin()   {
    document.getElementById('modal').style.top = "-100%";
}

const api = {
    key: "b1acd38efcd959af9979088d310b48a2",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric",
}

const pesquisa = document.querySelector('.form-control');

const pesquisa_button = document.querySelector('.btn');

const cidade = document.querySelector('.cidade');

const date = document.querySelector('.date');

const weather_t = document.querySelector('.ceu');

const tempo_img = document.querySelector('.tempo-img');

const tempo_temp = document.querySelector('.tempo-temp');

const temp_number = document.querySelector('.tempo-temp div');

const temp_unit = document.querySelector('.tempo-temp span');

const max_min = document.querySelector('.max-min');

const humidade = document.querySelector('.humidade');

function javascript(){
    
    window.addEventListener('load', () => {

        navigator.geolocation.getCurrentPosition(setPosition, showError);

        function setPosition(position) {
            console.log(position)
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            Resultado(lat, long);
        }
        function showError(error) {
            alert(`erro: ${error.message}`);
        }
    })

    function Resultado(lat, long) {

        fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`http ERROR`)
                }
                return res.json();
            })
            .catch(error => {
                alert(error.message)
            })
            .then(res => {
                displayResultado(res)
            });
    }

    pesquisa_button.addEventListener('click', function() {
        buscaResultado(pesquisa.value)
    })

    pesquisa.addEventListener('keypress', enter)
    function enter(event) {
        key = event.keyCode
        
        if (key === 13) {
            buscaResultado(pesquisa.value)
        }
    }

    function buscaResultado(cidade) {

        fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`http error: status ${res.status}`)
                }
                return res.json();
            })
            .catch(error => {
                alert(error.message)
            })
            .then(res => {
                displayResultado(res)
            });
    }

    function displayResultado(weather) {

        console.log(weather)

        cidade.innerText = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        date.innerText = dataDeHoje(now);

        let iconName = weather.weather[0].icon;
        tempo_img.innerHTML = `<img src="./icons/${iconName}.png">`;

        let temperatura = `${Math.round(weather.main.temp)}`;
        temp_number.innerHTML = temperatura;
        temp_unit.innerHTML = `°c`;

        weather_tempo = weather.weather[0].description;

        weather_t.innerText = Letter(weather_tempo);

        max_min.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

        humidade.innerHTML = weather.main.humidity;
    }

    function dataDeHoje(d) {

        let dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        let diaSemana = dias[d.getDay()];
        let dia = d.getDate();
        let mes = meses[d.getMonth()];
        let ano = d.getFullYear();

        return `${diaSemana}, ${dia} de ${mes} ${ano}`;
    }

    function Letter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

javascript();

async function getUserInfo() {
    const response = await fetch('https://reqres.in/api/users')
    const data = await response.json()
    console.log(data)
}

entrar.addEventListener('click', function(data) { 

    let email = document.querySelector('#email');
    let senha = document.querySelector('#senha');

    if(email.value == data){
        javascript();
        alert("Sucesso!")
    }else{
        alert("usuário ou senha incorretos!")
    }
})

getUserInfo()
