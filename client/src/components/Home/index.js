import React from 'react';
import Carouseld from '../Carousel';
import Hero from '../Hero';


function Home() {
    return (
        <section className='home'>
            <Hero/>
            <Carouseld/>
        </section>
    );
}

export default Home;