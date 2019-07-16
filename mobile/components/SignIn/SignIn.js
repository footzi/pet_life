import React, { useState } from 'react';
import { Button, View, TextInput, StyleSheet } from 'react-native';
import Api from 'api';
import PropTypes from 'prop-types';

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

const SignIn = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState('');

  const submit = () => {
    Api.signIn({ body: { name, password } });
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

export default SignIn;
