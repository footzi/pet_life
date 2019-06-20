import Head from 'components/Head';
import SignUp from 'components/SignUp';
import React from 'react';
import { connect } from 'react-redux';
import './checkin.scss';

const Checkin = () => (
  <div className="checkin">
    <Head title="Регистрация"/>
    <h1>Привет, зарегистрируйтесь:</h1>

    <SignUp />
  </div>
);

export default connect()(Checkin);
