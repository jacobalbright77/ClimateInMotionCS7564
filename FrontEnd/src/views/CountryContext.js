import React, {createContext, useState} from 'react';

export const CountryContext = createContext();

export const CountryProvider = ({children}) => {
  const [selectedCountries, setCountries] = useState([])

  return (
    <CountryContext.Provider value = {{selectedCountries, setCountries}}>
      {children}
    </CountryContext.Provider>
  )
}

