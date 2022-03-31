import React from 'react';
import Carousel from '../Carousel';
import Hero from '../Hero';


function Home() {
    return (
        <section className='home'>
            <Hero/>
            <Carousel/>
        </section>
    );
}

export default Home;