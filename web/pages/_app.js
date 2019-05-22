import React from "react";
import makeStore from "../../store";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";

const Home = dynamic(() => import("./home"));

class Index extends App {
    static async getInitialProps({ Component, ctx }) {
        // we can dispatch from here too
        //ctx.store.dispatch({ type: "HOME", payload: "foo" });

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    // static async getInitialProps({ Component, ctx }) {
    //     return {
    //         pageProps: {
    //             // Call page-level getInitialProps
    //             ...(Component.getInitialProps
    //                 ? await Component.getInitialProps(ctx)
    //                 : {})
    //         }
    //     };
    // }

    // static getInitialProps({ pathname, query }) {
    //     return { custom: "custom" }; // это станет начальным набором props у страницы
    // }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <Home {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

//export default Index;
export default withRedux(makeStore)(Index);
