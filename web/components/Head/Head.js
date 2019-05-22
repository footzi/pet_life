import React from "react";
import NextHead from "next/head";

const Head = props => (
    <NextHead>
        <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
        />
        <title>{props.title || ""}</title>
    </NextHead>
);

export default Head;
