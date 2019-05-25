
import {connect} from 'react-redux';
import {loadHomeData} from '../../../store';
import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(loadHomeData());
    }

    render() {
        const {users} = this.props;

        return (
            <View>
                <Text>1234</Text>
                <View>
                    {users.map((item) => <Text key={item.id}>{item.name}</Text>)}
                </View>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getData: () => dispatch(loadHomeData())
//     };
// };

export default connect(mapStateToProps)(Home);
