import App, { Container } from 'next/app';
import makeStore from 'store';
import Navigation from 'components/Navigation/Navigation';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from 'next-redux-wrapper';

class Index extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Container>
				<Provider store={store}>
					<Navigation />
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(Index);
