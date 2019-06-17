import { connect } from 'react-redux';
import { Button, ScrollView, Text, View } from 'react-native';
import React, { Component } from 'react';
import { loadAboutData } from 'store';

const mapStateToProps = (state) => {
  const data = state.pages.about;
  return {
    todos: data,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(loadAboutData()),
});

class About extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { todos } = this.props;

    return (
      <ScrollView>
        <Text>Home page</Text>
        <View>
          {todos.map(item => <Text key={item.id}>{item.title}</Text>)}
        </View>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
