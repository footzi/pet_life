import React, { Component } from "react";
import Head from "../../components/Head/Head";
import Link from "next/link";
import "./Blog.scss";

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <Head title="Blog" />
                <h1>Hello, blog page!</h1>
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

export default Blog;
