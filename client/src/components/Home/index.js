import React from 'react';
import Carouseld from '../Carousel';
import SearchAppBar from '../AppBar';
import Hero from '../Hero';


function Home() {
    return (
        <section className='home'>
            <SearchAppBar/>
            <Hero/>
            <Carouseld/>
        </section>
    );
}

export default Home;