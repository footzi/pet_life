import Head from 'components/Head';
import SignIn from 'components/SignIn';
import React from 'react';
import { connect } from 'react-redux';
import { loadHomeData } from 'store';
import './index.scss';

const Index = () => (
  <div className="index">
    <Head title="Вход"/>
    <h1>Привет, введите свой логин и пароль:</h1>

    <SignIn />
  </div>
);

Index.getInitialProps = async ({ store, req }) => {
  await store.dispatch(loadHomeData(req));
};

export default connect()(Index);
