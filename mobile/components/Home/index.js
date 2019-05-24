import React, { Component } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { changeText, someAsyncAction } from "../../../store";

class Home extends Component {
    componentDidMount() {
       this.props.getData();
    }

    render() {
        return (
            <View>
                <Text style={styles.container}>
                    Home page, async: {this.props.data}
                </Text>

                <Text style={styles.container}>
                    Home page, data: {this.props.text}
                </Text>
                
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        color: "red",
        fontSize: 20
    }
});

const mapStateToProps = state => {
    return {
        text: state.text,
        data: state.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(someAsyncAction()),
        tick: () => dispatch(changeText())
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);