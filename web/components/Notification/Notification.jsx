import React from 'react';
import './Notification.scss';
import { connect } from 'react-redux';
import { setNotification } from 'store';
import { isEmptyObject } from 'helpers';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(setNotification({}))
});

const Notification = ({ notification, onClose }) => (
  <div className={`notification ${isEmptyObject(notification) ? '' : 'is-open'}`}>
    {notification.success && <div className="notification__success">{notification.success}</div>}

    {notification.error && <div className="notification__error">{notification.error.message}</div>}

    <button className="notification__button" onClick={onClose}>
      Закрыть
    </button>
  </div>
);

Notification.propTypes = {
  notification: PropTypes.shape({
    success: PropTypes.string,
    error: PropTypes.object,
  }),
  onClose: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
