import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({ weather }) => {
  if (Object.keys(weather).length === 0) {
    return
  }

  const altImg = `${weather.weather.description} icon`
  const srcImg = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  const temperature = (weather.main.temp - 273.15).toFixed(2)

  return (
    <div>
      <h2>Wheater</h2>
      <p>Temperature: {temperature} Celcius</p>
      <img alt={altImg} src={srcImg} />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryFlag = ({ flagUrl, altImg }) => {
  return <img alt={altImg} src={flagUrl} />
}

const Language = ({ language }) => {
  return <li>{language}</li>
}

const LanguageList = ({ languages }) => {
  const languageArr = Object.values(languages)

  return (
    <ul>
      {languageArr.map(language => (
        <Language key={language} language={language} />
      ))}
    </ul>
  )
}

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <LanguageList languages={country.languages} />
      <CountryFlag
        flagUrl={country.flags.png}
        altImg={`${country.name.common} flag`}
      />
      <CountryWeather weather={weather} />
    </div>
  )
}

const CountryElement = ({ name, handleClick }) => {
  return (
    <li>
      {name} <button onClick={() => handleClick(name)}>show</button>
    </li>
  )
}

const CountryList = ({ countries, handleClick }) => {
  return (
    <ul>
      {countries.map(country => (
        <CountryElement
          key={country.name.official}
          name={country.name.common}
          handleClick={handleClick}
        />
      ))}
    </ul>
  )
}

const Countries = ({ countries, handleClick, weather }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length <= 10 && countries.length > 1) {
    return <CountryList countries={countries} handleClick={handleClick} />
  }

  if (countries.length !== 0) {
    return <Country country={countries[0]} weather={weather} />
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [weather, setWeather] = useState({})

  const fetchWeather = ({ lat, lon }) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then(response => setWeather(response.data))
      .catch(error => console.error(error.message))
  }

  const handleChange = e => {
    setValue(e.target.value)
    const filter = allCountries.filter(country => {
      const name = country.name.common.toLowerCase()

      return name.includes(value)
    })
    setCountries(filter)
    if (filter.length === 1) {
      const coordintes = {
        lat: countries[0].latlng[0],
        lon: countries[0].latlng[1],
      }
      fetchWeather(coordintes)
    }
  }

  const fetchData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setAllCountries(response.data))
      .catch(error => console.error('error fetching data'))
  }

  useEffect(fetchData, [])

  const handleClick = name => {
    const find = countries.find(country => country.name.common === name)
    setCountries([find])
    const coordintes = {
      lat: countries[0].latlng[0],
      lon: countries[0].latlng[1],
    }
    fetchWeather(coordintes)
  }

  return (
    <div>
      <label>
        find countries
        <input value={value} onChange={handleChange} />
      </label>
      <Countries
        countries={countries}
        handleClick={handleClick}
        weather={weather}
      />
    </div>
  )
}

export default App
