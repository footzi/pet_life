import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import React, { Component } from 'react';
import { loadHomeData } from '../../../store';

const config = require('../../../server.config');

console.log(config.domain);

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {text: 'test'};
	  }

	componentDidMount() {
		this.props.getData();
	}

	send() {
		fetch('/test')
			.then((res)=> {
				console.log(res)
				
			})
			.catch((err)=>{
				console.log(err)
				
			})
	}

	render() {
		const { users } = this.props;

		return (
			<View>
				<Text>Home page</Text>
				<View>
					{users.map(item => <Text key={item.id}>{item.name}</Text>)}
				</View>
				<Button
					title="Go to About"
					onPress={() => this.props.navigation.navigate('About')}
				/>
				<Button
					title="Test send"
					onPress={() => this.send()}
				/>
				<Text>{this.state.text}</Text>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const data = state.pages.home;

	return {
		users: data,
	};
};

const mapDispatchToProps = dispatch => ({
	getData: () => dispatch(loadHomeData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
