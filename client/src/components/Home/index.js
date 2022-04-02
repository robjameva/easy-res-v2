import React from 'react';
import CarouselArr from '../Carousel';
import Hero from '../Hero';


function Home() {
    return (
        <section className='home'>
            <Hero />
            <CarouselArr />
        </section>
    );
}

export default Home;