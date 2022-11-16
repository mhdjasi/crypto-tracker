import { Container } from '@material-ui/core'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel'

function Banner() {
  return (
    <div className='banner'>
        <Container>
<div className='tagline'>

<h1 className='tophead'>Crypto Tracker</h1>

<h6 className='subtitle'>Paper Money is going away</h6>
</div>
<Carousel/>
        </Container>
        
    </div>
  )
}

export default Banner