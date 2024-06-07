const apikey ="51d67b6bf78637f45c9beb1d967464c1"

const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const iconEle = document.querySelector(".icon") 

formEle.addEventListener("submit",(e)=>{
    //console.log(cityNameEle.value)
    e.preventDefault()
    const cityvalue = cityNameEle.value
    getweatherData(cityvalue)
})

async function getweatherData(cityvalue){
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`)
     if(!response.ok){
        throw new Error("Network response is not ok")
     }
     const data = await response.json()
     //console.log(data);
     const temperature = Math.floor(data.main.temp)
     const description = data.weather[0].description
     const icon = data.weather[0].icon
     const details = [
        `Feels Like: ${Math.floor(data.main.feels_like)}`,`Humidity:${data.main.humidity}%`,`Wind Speed: ${data.wind.speed}m/s`
     ]
      weatherDataEle.querySelector(".temp").textContent = `${temperature}°c`
      weatherDataEle.querySelector(".desc").textContent = `${description}`
      iconEle.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
      weatherDataEle.querySelector(".details").innerHTML =details.map((detail)=>{
      return `<div>${detail}</div>`
      }).join("")   
}catch( err ){
    weatherDataEle.querySelector(".temp").textContent =
    iconEle.innerHTML =
    weatherDataEle.querySelector(".desc").textContent = "An Error Occured!"
}
}
