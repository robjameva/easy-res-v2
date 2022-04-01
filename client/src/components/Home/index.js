import React from 'react';
import Hero from '../Hero';
import Carouseld from '../Carousel';


function Home() {
    return (
        <section className='home'>
            <Hero />
            <Carouseld />
        </section>
    );
}

export default Home;