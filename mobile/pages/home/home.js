import { ScrollView, Text } from 'react-native';
import React from 'react';
import SignIn from 'components/SignIn';

const Index = () => (
  <ScrollView>
    <Text>Привет, введите свой логин и пароль:</Text>
    <SignIn />
  </ScrollView>
);

export default Index;
