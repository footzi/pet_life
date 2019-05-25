import './about.scss';
import Head from 'components/Head.js';
import React from 'react';

const About = () => {
    return (
        <div className='about'>
            <Head title='blog' />
            <h1>Hello, about page!</h1>
        </div>
    );
}

export default About;
