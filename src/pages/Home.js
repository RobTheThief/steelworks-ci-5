import React from 'react';
import hero from '../img/hero.jpg';

function Home(props) {
  return <div className='mt-16'>
    <img src={hero} alt='hero image of a man and woman lifting weights'/>
  </div>;
}

export default Home;
