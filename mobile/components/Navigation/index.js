import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

// НЕТ ДОСТУПА К props.navigation, т.к это не контенер
const Navigation = props => (
  <View style={styles.container}>
    <Button
      title="Go to About"
      onPress={() => props.navigation.navigate('About')}
    />
  </View>
);


export default Navigation;
