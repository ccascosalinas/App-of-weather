let date= new Date()
let currentTime = date.getHours()
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)

let show= document.getElementById('date').innerHTML =  ye.concat(', ' + mo + ' ' + da) 
let time= document.getElementById('time').innerHTML =  'Time is:  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
const apikey = '5a19bc4a4cb468316713d4ffa2b38d08'
let icon = document.getElementById('icon')


if(currentTime >= 15 && currentTime < 19 ){
    $('.container-fluid').attr('class', 'afternoon')
}

if(currentTime >= 19 && currentTime < 24 || currentTime >= 1 && currentTime < 5 ){
    $('.container-fluid').attr('class', 'night')
   
}

$(document).ready(function(){
    $('#currentLocation').click(function(){
        myUbication()
    })
     
})

let city = document.getElementById("myCity");
function myUbication() {
        navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    let count = 1;
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey)
    .then(response => response.json())
    .then(weather =>{
        degree.innerText = (weather.main.temp - 273.15).toFixed(2) + 'C°'  
        temp.innerText = (weather.main.temp - 273.15).toFixed(2) + 'C°'
        description.innerText =   weather.weather[0].description
        humidity.innerText =  weather.main.humidity + ' %';
        tempMax.innerText =   (weather.main.temp_max - 273.15).toFixed(2) + 'C°'
        tempMin.innerText =  (weather.main.temp_min - 273.15).toFixed(2) + 'C°' 
        icon.src = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
        myCity.innerText =    weather.name + ', ' + weather.sys.country
    })  
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon='  + lon + '&&appid=' + apikey)
    .then(response => response.json())
    .then(weather =>{
        weather.daily.forEach(day => {
            
            document.getElementById("max"+count).innerText =   (day.temp.max -273.15).toFixed(2) + 'C°';
            document.getElementById('min'+count).innerText =  + (day.temp.min -273.15).toFixed(2) + 'C°'
            document.getElementById('des'+count).innerText =   day.weather[0].description
            document.getElementById('icon'+count).src = 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'
            count = count + 1;
        })

    })
}


function findCity(){
    let count = 1 
    let newUbication = document.getElementById('findUbication').value
    if(newUbication) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + newUbication + '&appid=' + apikey)
        .then(response => response.json())
        .then(weather =>{
        degree.innerText = (weather.main.temp - 273.15).toFixed(2) + 'C°'
        temp.innerText =  (weather.main.temp - 273.15).toFixed(2) + 'C°'
        description.innerText =   weather.weather[0].description
        humidity.innerText =  weather.main.humidity + ' %';
        tempMax.innerText =  +  (weather.main.temp_max - 273.15).toFixed(2) + 'C°'
        tempMin.innerText =  (weather.main.temp_min - 273.15).toFixed(2) + 'C°'
        icon.src = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
        myCity.innerText =  document.getElementById('findUbication').value + ', ' + weather.sys.country
        let latCity = weather.coord.lat
        let lonCity = weather.coord.lon
        

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latCity + '&lon='  + lonCity + '&&appid=' + apikey)
        .then(response => response.json())
        .then(weather =>{
            weather.daily.forEach(day => {
                document.getElementById("max"+count).innerText =  + (day.temp.max -273.15).toFixed(2) + 'C°';
                document.getElementById('min'+count).innerText =  + (day.temp.min -273.15).toFixed(2) + 'C°';
                document.getElementById('des'+count).innerText =  day.weather[0].description
                document.getElementById('icon'+count).src = 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'
                count = count + 1;
            })
        })
    })
    } else {
        alert('Enter a city')
    }
   
}
    
    function celsius(){
        let arrayOfElements = document.getElementsByClassName('temperatures');
        let newArray = Array.from(arrayOfElements)
        if(newArray[0].innerHTML.lastIndexOf('C°') == -1){
            newArray.forEach(element => {
                let a = element.innerHTML
                let b = a.replace('°F', '')
                let c = ((b - 32) * 5/9).toFixed(2) + 'C°'
                element.innerText = c
            }) 
        }    
    }
        
        
function fahrenheit(){
    let arrayOfElements = document.getElementsByClassName('temperatures');
    let newArray= Array.from(arrayOfElements)
    if(newArray[0].innerHTML.lastIndexOf('°F') == -1){
    newArray.forEach(element => {
       let a = element.innerHTML 
       let b = a.replace('C°', '')
       let c = (b * 9/5 + 32).toFixed(2) + '°F'
       element.innerText = c
    })
    }
}

document.onload(myUbication())


