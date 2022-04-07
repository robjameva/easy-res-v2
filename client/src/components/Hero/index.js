import React from 'react';
import logo from '../../assets/images/logo.png';

function Hero() {
    return (
        <section className='hero'>
                <h1>Make Your Reservation Today</h1>
           <img src={logo}></img>
        </section>
    );
}

export default Hero;