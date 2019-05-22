import React, { Component } from "react";
import { connect } from "react-redux";
import Head from "../components/Head/Head";
import Link from "next/link";
//import "./Home.scss";

import { changeText, getHomeData, someAsyncAction} from "../../store";

class Home extends Component {

    static async getInitialProps({ store, isServer, pathname, query }) {
        await store.dispatch(someAsyncAction());
    }
    
    render() {
        const {data} = this.props;

        return (
            <div>
                <div className="Home">
                    <Head title="Home" />
                    <h1>Hello, home page!</h1>
                    <h2>Prop from Redux {this.props.text}</h2>
                    <h3>Prop from getInitialProps {this.props.data}</h3>
                    <button onClick={this.props.tick}>Кнопка</button>
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
                    {/* <img src="/upload/cart.png" /> */}
                    <div>Тудус {data}</div>
                </div>
            </div>
        );
    }
}

//tick: () => dispatch({ type: "TICK" }) - передаем редьюсер напрямуб
const mapDispatchToProps = dispatch => {
    return {
        tick: () => dispatch(changeText())
    };
};

const mapStateToProps = state => {
    return {
        text: state.text,
        data: state.data
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
