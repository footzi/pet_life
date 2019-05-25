import './index.scss';
import axios from 'axios';
import Head from 'components/Head';
import {Link} from 'web/routes';
import React from 'react';
import {connect} from 'react-redux';
import {loadHomeData} from 'store';

const User = ({data}) => {
    return (
        <li>
            <Link route="user" params={{id: data.id}}>
                <a>{data.name}</a>
            </Link>
        </li>
    );
};

const send = () => {
    axios.post('/api', '123')
        .then((response) => {
            console.log(response.data)
        });
};

const Index = (props) => (
    <div className="home">
        <Head title="Главная"/>
        <h1>Hello, home page!</h1>
        <h2>Пользователи:</h2>
        <ul className="Users">
            {props.users.map((item) => <User data={item} key={item.id}/>)}
        </ul>
        <button onClick={send}>SEND</button>
    </div>
);

const mapStateToProps = (state) => {
    const data = state.pages.home;

    return {
        users: data
    };
};

Index.getInitialProps = async({store}) => {
    await store.dispatch(loadHomeData());
};


export default connect(mapStateToProps)(Index);

