import React, { Component } from "react";
import { connect } from "react-redux";
import Head from "components/Head";
import "./index.scss";

import { changeText, getHomeData, someAsyncAction} from "store";

class Home extends Component {

    static async getInitialProps({ store, isServer, pathname, query }) {
        await store.dispatch(someAsyncAction());
    }
    
    render() {
        const {data} = this.props;

        return (
            <div>
                <div className="home">
                    
                    <Head title="Home" />
                    <h1>Hello, home page!</h1>
                    <h2>Prop from Redux {this.props.text}</h2>
                    <h3>Prop from getInitialProps {this.props.data}</h3>
                    <button onClick={this.props.tick}>Кнопка</button>
                    {/* <img src="/upload/cart.png" /> */}
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