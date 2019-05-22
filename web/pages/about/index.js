import React, { Component } from "react";
import Head from "../../components/Head/Head";
import Link from "next/link";
import "./About.scss";

class About extends Component {
    render() {
        return (
            <div className="About">
                <Head title="About" />
                <h1>Hello, about page!</h1>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <br />
                <Link href="/blog">
                    <a>Blog</a>
                </Link>
                <br />
                <Link href="/">
                    <a>Home</a>
                </Link>
            </div>
        );
    }
}

export default About;
