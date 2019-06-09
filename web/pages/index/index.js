import axios from 'axios';
import Head from 'components/Head';
import { Link } from 'web/routes';
import SignUp from 'components/SignUp/SignUp';
import React from 'react';
import { connect } from 'react-redux';
import { loadHomeData } from 'store';
import './index.scss';

const DOMAIN = require('config').domain;

const User = ({ data }) => (
	<li>
		<Link route="user" params={{ id: data.id }}>
			<a>{data.name}</a>
		</Link>
	</li>
);

const send = () => {
	axios.post('/api', '1231234')
		.then((response) => {
			console.log(response.data);
		});
};

const Index = props => (
	<div className="index">
		<Head title="Главная"/>
		<h1>Hello, home page!</h1>
		<img src={`${DOMAIN}/upload/fraj.jpg`}/>

		<SignUp />

		{/* <h2>Пользователи:</h2>
		<ul className="Users">
			{props.users.map(item => <User data={item} key={item.id}/>)}
		</ul>
		<button onClick={send}>SEND</button> */}


	</div>
);

const mapStateToProps = (state) => {
	const data = state.pages.home;

	return {
		users: data,
	};
};

Index.getInitialProps = async ({ store }) => {
	await store.dispatch(loadHomeData());
};


export default connect(mapStateToProps)(Index);
