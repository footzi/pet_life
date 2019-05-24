import React, { Component } from "react";
import Head from "components/Head.js";
import "./about.scss";

class About extends Component {
    render() {
        console.log('1')
        return (
            <div className="about">
                <Head title="blog" />
                <h1>Hello, about page!</h1>
            </div>
        );
    }
}

export default About;
