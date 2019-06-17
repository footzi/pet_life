import Head from 'components/Head';
import React from 'react';
import { connect } from 'react-redux';
import { loadBlogData } from 'store';
import './blog.scss';

const Post = ({ data }) => (
  <li>
    {data.title}
    {data.body}
  </li>
);

const Blog = props => (
  <div className="blog">
    <Head title="Блог"/>
    <h1>Hello, blog pagggeeee!</h1>
    <h2>Посты:</h2>
    <ul className="Users">
      {props.posts.map(item => <Post data={item} key={item.id}/>)}
    </ul>
  </div>
);

const mapStateToProps = (state) => {
  const data = state.pages.blog;

  return {
    posts: data,
  };
};

Blog.getInitialProps = async ({ store }) => {
  await store.dispatch(loadBlogData());
};


export default connect(mapStateToProps)(Blog);
