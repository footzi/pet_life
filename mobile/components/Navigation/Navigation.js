import { connect } from 'react-redux';
import { Button } from 'react-native';
import React from 'react';

const Navigation = (props) => {
  return (
    <Button
      title="Go to About"
      onPress={() => props.navigation.navigate('About')}
    />
  );
};

const mapDispatchToProps = dispatch => ({
});
  
export default connect(null, mapDispatchToProps)(Navigation);
