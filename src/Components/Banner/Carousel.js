import { Container } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import './Carousel.css'
import { CryptoState } from '../../CryptoContext.js'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
const [trending, setTrending] = useState([]);

const { currency, symbol } = CryptoState();

const fetchTrendingCoins = async () =>{
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
    setTrending(data);
}

console.log(trending);

useEffect(() =>{
fetchTrendingCoins()
// eslint-disable-next-line
},[currency]);

const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return(
        <Link className='carouselItem' to={`/coins/${coin.id}`}>
            <img className='carousallogo'
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
            />
            <span className='symbol'>
                {coin.symbol}
                &nbsp;
                <span className='price' style={{
                    color: profit > 0 ? "rgb(14,203,129)" : "red",
                }}>
{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
            </span>
            <span className='actualprice' style={{ fontWeight: 500}}>
                {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
            </span>
        </Link>
    );
});

const responsive ={
    0: {
        items: 2,
    },
    512: {
        items: 4,
    },
};

  return (
    <Container>
        <div className='carousel'>
            <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
            />
            </div>
        </Container>
  )
}

export default Carousel