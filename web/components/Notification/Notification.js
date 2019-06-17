import React from 'react';
import './notification.scss';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setNotification } from 'store';

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(setNotification({
    open: false,
    success: '',
    error: ''
  })),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

const Notification = enhance(({ notification, onClose }) => (
  <div className={`notification ${notification.open ? 'is-open' : ''}`}>
    {notification.success && (
      <div className='notification__success'>
        {notification.success}
      </div>
    )}

    {notification.error && (
      <div className='notification__error'>
        {notification.error}
      </div>
    )}

    <button className='notification__button' onClick={onClose}>Закрыть</button>
  </div>
));

export default Notification;
