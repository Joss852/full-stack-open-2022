import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Country = ({ country }) => {
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

const Countries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length <= 10 && countries.length > 1) {
    return <CountryList countries={countries} handleClick={handleClick} />
  }

  if (countries.length !== 0) {
    return <Country country={countries[0]} />
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  const handleChange = e => {
    setValue(e.target.value)
    const filter = allCountries.filter(country => {
      const name = country.name.common.toLowerCase()

      return name.includes(value)
    })
    setCountries(filter)
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
  }

  return (
    <div>
      <label>
        find countries
        <input value={value} onChange={handleChange} />
      </label>
      <Countries countries={countries} handleClick={handleClick} />
    </div>
  )
}

export default App
