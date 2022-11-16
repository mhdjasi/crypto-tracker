import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext'
import Chart from 'chart.js/auto';

import './Coininfo.css'
import SelectButton from './SelectButton';

function CoinInfo({coin}) {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

   const { currency } = CryptoState();

  const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

  const fetchHistoricalData = async() =>{
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  console.log("data",historicalData);

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [currency,days]);
  

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  return (
    <ThemeProvider theme={darkTheme} >
<div className='chartcontainer'>
{
    !historicalData ? (
        <CircularProgress 
        style={{color:"gold"}}
        size={250}
        thickness={1}
        />
    ):
     <>
    <Line  
    data={{
        labels:historicalData.map(coin => {
            let date = new Date(coin[0]);
            let time =
                date.getHours() > 12? `${date.getHours() -12}:${date.getMinutes()} PM`: `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1?time:date.toLocaleDateString()
            }),

            datasets: [
                {data:historicalData.map((coin)=>coin[1]),
                label: `Price ( Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
                borderWidth:"1"
                }
            ],
    }}
    options={{
        elements: {
            point: {
                radius:0,
                width:1,
            },
        }
    }}
    />
    <div style={{
        display:"flex",
        marginTop:"20px",
        justifyContent:"space-around",
        width:"100%",

    }}>
        {chartDays.map(day => (
            <SelectButton
            key={day.value}
            onClick={()=> setDays(day.value)}
            selected={day.value === days}
            >
                {day.label}
            </SelectButton>
        ))}
    </div>
    </>
}
</div>
    </ThemeProvider>
  );
}

export default CoinInfo