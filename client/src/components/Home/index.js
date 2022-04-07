import React from 'react';
import CarouselHome from '../Carousel';
import Hero from '../Hero';


function Home() {
    return (
        <section className='home'>
            <Hero />
            <CarouselHome />
        </section>
    );
}

export default Home;