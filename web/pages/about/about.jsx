import Head from 'components/Head';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Api from 'api';
import './about.scss';

const mapStateToProps = (state) => ({
  items: state.pages.about
});

const About = ({ items }) => (
  <div className="about">
    <Head title="О проекте"/>
    <h1>Hello, about page!</h1>
    <h2>Список дел:</h2>
    <ul className="Users">
      {items.map(item => <p key={item.id}>{item.name}</p>)}
    </ul>
  </div>
);

About.propTypes = {
  items: PropTypes.array,
};

About.getInitialProps = async ({ store, res, req }) => {
  await store.dispatch(Api.getAboutData(res, req));
};

export default connect(mapStateToProps)(About);
