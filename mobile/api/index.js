import AsyncStorage from '@react-native-community/async-storage';
import { SignIn } from 'store';

export default class Api {
  static setToken(token) {
    AsyncStorage.setItem('token', token);
  }

  static getToken() {
    AsyncStorage.getItem('token');
  }

  static signIn(data) {
    SignIn({data, setToken: this.setToken})
  }
}