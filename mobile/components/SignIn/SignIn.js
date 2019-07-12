import React, { useState } from 'react';
import { Button, View, TextInput, StyleSheet } from 'react-native';
import { toSignIn } from 'store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  signIn: body => dispatch(toSignIn(body))
});

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  }
});

const SignIn = ({ signIn }) => {
  const [name, setName] = useState();
  const [password, setPassword] = useState('');

  const submit = () => {
    signIn({ name, password });
  };
  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input} placeholder="Имя" onChangeText={value => setName(value)} />
      <TextInput style={styles.input} placeholder="Пароль" onChangeText={value => setPassword(value)} />
      <Button title="Submit" onPress={submit} />
    </View>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
