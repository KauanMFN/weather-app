import { useState } from "react"

export const WeatherForm = () => {
    const apiKey = "8623a749748564267bad93aea769aad5"

    const [city, setCity] = useState()
    const [temp, setTemp] = useState()
    const [description, setDescription] = useState()
    const [weather, setWeather] = useState()
    const [country, setCountry] = useState()
    const [humidity, setHumidity] = useState()
    const [wind, setWind] = useState()
    const [countryFlag, setCountryFlag] = useState()

    function Search(e) {
        e.preventDefault()
        console.log("Clicado")
        
        console.log(city)

        showWeatherData(city)
    }   

    const getWeatherData = async(city) => {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

        const res = await fetch(apiWeatherURL)
        const data = await res.json()
        
        console.log(data)

        return data;
    }

    const showWeatherData = async (city) => {
        const data = await getWeatherData(city)

        setCountry(data.name)

        setCountryFlag(data.sys.country)

        setWeather(data.weather[0].icon)

        setTemp(parseInt(data.main.temp))

        setDescription(data.weather[0].description)

        setHumidity(data.main.humidity)

        setWind(data.wind.speed)

        const infos = document.querySelector(".infos")
        infos.classList.remove("hidden")
    }

    return (
        <div className="text-center px-7 py-9 bg-indigo-500 w-fit rounded-2xl text-white font-ubuntu">
            <h3 className="font-bold text-xl mb-4">Confira o clima de uma cidade:</h3>
            <form className="">
                <input
                type="text"
                placeholder="Digite o nome de uma cidade"
                className="rounded-md px-3 py-3 mr-2 outline-none focus:ring-2 ring-blue-300 text-gray-800"
                onChange={(e)=> setCity(e.target.value)}
                />
                <button
                type="submit"
                className="px-4 py-3 bg-blue-300 rounded-md transition hover:bg-blue-400"
                onClick={Search}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>

            <div className="infos flex flex-col gap-7 pt-6 mt-6 border border-t-white border-l-0 border-b-0 border-r-0 hidden">
                <h2 className="flex justify-center items-center gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <span className="text-2xl font-bold" id="cidade">{country}</span>
                    <img
                    src={`https://countryflagsapi.com/png/${countryFlag}`}
                    alt="Bandeira do País"
                    className="h-5"/>
                </h2>

                <p className="italic">
                    <span>{temp}</span> &deg;C
                </p>

                <div className="flex justify-center items-center">
                    <p className="text-lg capitalize font-bold">{description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather}.png`} alt="Condições do Tempo" />
                </div>

                <div className="flex justify-center">
                    <p className="px-5 py-2 border-r flex items-center gap-2">
                        <i className="fa-solid fa-droplet"></i>
                        <span>{humidity}%</span>
                    </p>
                    <p className="px-5 py-2 flex items-center gap-2">
                        <i className="fa-solid fa-wind"></i>
                        <span>{wind} km/h</span>
                    </p>
                </div>

            </div>
        </div>
    )
}