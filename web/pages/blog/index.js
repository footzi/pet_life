import React, { Component } from "react";
import Head from "components/Head.js";
import "./blog.scss";

class Blog extends Component {
    render() {
        return (
            <div className="blog">
                <Head title="Blog" />
                <h1>Hello, blog page!</h1>
            </div>
        );
    }
}

export default Blog;
