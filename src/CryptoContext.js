import React, { Children, createContext, useContext, useEffect } from 'react'
import { useState } from 'react';


const Crypto = createContext()

function CryptoContext({ children }) {

const [currency, setCurrency] = useState("INR");
const [symbol, setSymbol] = useState("₹");


useEffect(() => {
  if(currency === "INR") setSymbol("₹");
  if(currency === "USD") setSymbol("$");

},[currency]);


  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
{children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () =>{
    return useContext(Crypto);
};