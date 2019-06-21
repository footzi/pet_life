import Head from 'components/Head';
import React from 'react';
import { connect } from 'react-redux';
import { loadAboutData } from 'store';
import './about.scss';
import { compose } from 'recompose';

const mapStateToProps = (state) => ({
  items: state.pages.about
});

const enhance = compose(
  connect(
    mapStateToProps
  )
);

const About = enhance(({ items }) => (
  <div className="about">
    <Head title="О проекте"/>
    <h1>Hello, about page!</h1>
    <h2>Список дел:</h2>
    <ul className="Users">
      {items.map(item => <p key={item.id}>{item.name}</p>)}
    </ul>
  </div>
));

About.getInitialProps = async ({ store, req }) => {
  await store.dispatch(loadAboutData(req));
};

export default About;
