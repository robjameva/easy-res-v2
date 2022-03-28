import React from 'react';
import Carousel from '../Carousel';
import SearchAppBar from '../AppBar';
import Hero from '../Hero';


function Home() {
    return (
        <section className='home'>
            <SearchAppBar/>
            <Hero/>
            <Carousel/>
        </section>
    );
}

export default Home;