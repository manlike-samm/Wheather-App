//api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
const info = document.querySelector('.info'),
weatherPart = document.querySelector('.weather-part'),
inputPart = document.querySelector('.input-part'),
textInput = document.querySelector('.text-input'),
temperature = document.querySelector('.temp'),
temperature2 = document.querySelector('.temp-2'),
weather = document.querySelector('.weather'),
state = document.querySelector('.location'),
humidity = document.querySelector('.hum'),
wIcon = document.querySelector('img'),
arrow = document.querySelector('.arrow')

let api;

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ee928ee26dc35bcd3f3efeafec71d151`;
    fetchData();
}
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ee928ee26dc35bcd3f3efeafec71d151`;
    fetchData();
}

function fetchData(){
    //infoTxt.innerText = "Getting weather details...";
    //infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => {//weatherDetails(result)).catch(() =>{
        //infoTxt.innerText = "Something went wrong";
        //infoTxt.classList.replace("pending", "error");
        info.classList.remove('hidden')
        if (result.message) {
            setTimeout(() =>{
                info.innerText = 'City not found, please try another';
                info.classList.replace('bg-green-100', 'bg-red-200')
            }, 1000);

        } else {
            setTimeout(() =>{
                info.classList.add('hidden');
                arrow.classList.remove('hidden')
                inputPart.classList.add('hidden');
                weatherPart.classList.replace('hidden', 'flex');
            }, 1000);
           
            console.log(result);
            temperature.innerText = Math.floor(result.main.temp);
            weather.innerText = result.weather[0].description;
            state.innerText = result.name + ', ' + result.sys.country;
            humidity.innerText = Math.floor(result.main.humidity) + '%'
            temperature2.innerText = Math.floor(result.main.feels_like);
    
            let id = result.weather[0].id;
    
            if(id == 800){
                wIcon.src = "../icons/clear.svg";
            }else if(id >= 200 && id <= 232){
                wIcon.src = "../icons/storm.svg";  
            }else if(id >= 600 && id <= 622){
                wIcon.src = "../icons/snow.svg";
            }else if(id >= 701 && id <= 781){
                wIcon.src = "../icons/haze.svg";
            }else if(id >= 801 && id <= 804){
                wIcon.src = "../icons/cloud.svg";
            }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
                wIcon.src = "../icons/rain.svg";
            }
        }
    });
}

textInput.addEventListener("keyup", e =>{
    if(e.key == "Enter" && textInput.value != ""){
        requestApi(textInput.value);
    }
});

arrow.addEventListener("click", ()=>{
    arrow.classList.add('hidden');
    info.innerText = 'fetching weather details...';
    info.classList.replace('bg-red-200', 'bg-green-100')
    inputPart.classList.remove('hidden');
    weatherPart.classList.replace('flex', 'hidden');
    textInput.value = "";
});