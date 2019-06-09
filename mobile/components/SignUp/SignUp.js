import React from 'react';
import { toSignUp } from 'store';
import { Button, View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
});

const data = {
    name: '',
    surname: '',
    password: ''
};

const change = (value, name) => {
    data[name] = value;
};

const submit = () => {
    toSignUp(data);
};

const SignUp = () => (
    <View style={styles.wrapper}>
        <TextInput style={styles.input} placeholder="Ваше Имя" onChangeText={(e) => change(e, 'name')}/>
        <TextInput style={styles.input} placeholder="Ваша Фамилия" onChangeText={(e) => change(e, 'surname')}/>
        <TextInput style={styles.input} placeholder="Ваш Пароль" onChangeText={(e) => change(e, 'password')}/>
        <Button title="Submit" onPress={submit}/>
    </View>
);

export default SignUp;
