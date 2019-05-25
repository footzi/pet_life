import {connect} from 'react-redux';
import {loadAboutData} from '../../../store';
import {Button, ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';

class About extends Component {
    componentDidMount() {
        this.props.getData();
    }

    render() {
        const {todos} = this.props;

        return (
            <ScrollView>
                <Text>Home page</Text>
                <View>
                    {todos.map((item) => <Text key={item.id}>{item.title}</Text>)}
                </View>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const data = state.pages.about;

    return {
        todos: data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(loadAboutData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
