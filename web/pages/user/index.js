import React from 'react';

const User = (props) => (
    <p> User - {props.test.id}</p>
);

User.getInitialProps = ({query}) => {
    return {test: query};
};

export default User;
