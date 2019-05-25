import {connect} from 'react-redux';
import {loadHomeData} from '../../../store';
import {Button, Text, View} from 'react-native';
import React, {Component} from 'react';

class Home extends Component {
    componentDidMount() {
        this.props.getData();
    }

    render() {
        const {users} = this.props;

        return (
            <View>
                <Text>Home page</Text>
                <View>
                    {users.map((item) => <Text key={item.id}>{item.name}</Text>)}
                </View>
                <Button
                    title="Go to About"
                    onPress={() => this.props.navigation.navigate('About')}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const data = state.pages.home;

    return {
        users: data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(loadHomeData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
