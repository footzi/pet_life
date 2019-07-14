import { View, Text, Button } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from 'store';
import { isEmptyObject } from 'helpers';
import PropTypes from 'prop-types';
import styles from './styles';

const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(setNotification({}))
});

const Notification = ({ notification, onClose }) => (
  <>
    {!isEmptyObject(notification) && (
      <View style={styles.wrapper}>
        {notification.success && <Text style={styles.success}>{notification.success}</Text>}
        {notification.error && <Text style={styles.error}>{notification.error.message}</Text>}

        <View style={styles.button}>
          <Button onPress={onClose} title="Закрыть" />
        </View>
      </View>
    )}
  </>
);

Notification.propTypes = {
  notification: PropTypes.shape({
    success: PropTypes.string,
    error: PropTypes.object
  }),
  onClose: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
