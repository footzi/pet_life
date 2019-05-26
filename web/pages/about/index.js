import Head from 'components/Head';
import React from 'react';
import { connect } from 'react-redux';
import { loadAboutData } from 'store';
import './test.scss';

const Todo = ({ data }) => (
	<li>
		{data.title} - {data.completed ? 'ВЫПОЛНЕНО' : 'НЕВЫПОЛНЕНО'}
	</li>
);

const About = props => (
	<div className="about">
		<Head title="О проекте"/>
		<h1>Hello, about page!</h1>
		<h2>Список дел:</h2>
		<ul className="Users">
			{props.todos.map(item => <Todo data={item} key={item.id}/>)}
		</ul>
	</div>
);

const mapStateToProps = (state) => {
	const data = state.pages.about;

	return {
		todos: data,
	};
};

About.getInitialProps = async ({ store }) => {
	await store.dispatch(loadAboutData());
};


export default connect(mapStateToProps)(About);
