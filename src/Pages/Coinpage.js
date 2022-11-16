import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import CoinInfo from '../Components/CoinInfo';
import { CryptoState } from '../CryptoContext'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../Components/Banner/Carousel'

import './CoinPage.css'
import { LinearProgress } from '@material-ui/core';


function Coinpage() {

  const {id} = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async() =>{
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);
  

  if (!coin) return <LinearProgress style={{backgroundColor:"gold"}} />;

  return (
    <div className='coininfomain'>


<div className='sidebar'>

<img 
src={coin?.image.large}
alt={coin?.name}
height="200"
style={{
  marginBottom:"20px"
}}
/>

<h3 className='coinlargename' >{coin?.name}</h3>
<p className='description'>{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</p>

<div className='marketdata'>
<span style={{display:"flex"}}>
<h5 className='rank'>Rank : </h5>
<h5 className='rank'>&nbsp;&nbsp;{coin?.market_cap_rank}</h5>

</span>
<span style={{display:"flex"}}>
<h5 className='rank'>Current Price : </h5>
<h5 className='rank'>&nbsp;&nbsp;{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]
)}</h5>

</span>
<span style={{display:"flex"}}>
<h5 className='rank'>Market Cap : </h5>
<h5 className='rank'>&nbsp;&nbsp;{Symbol}{" "}
                          {numberWithCommas(
                            coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                          )}
                          M</h5>

</span>
</div>

</div>


{/* chart */}
<CoinInfo coin={coin} />

    </div>
  )
}

export default Coinpage