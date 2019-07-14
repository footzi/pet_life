import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadAboutData } from 'store';

const mapStateToProps = state => ({
  items: state.pages.about
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(loadAboutData())
});

const About = ({ getData, items }) => {
  useEffect(() => {
    getData();
  });

  return (
    <ScrollView>
      <Text>About page</Text>
      {items.length > 0 && (
        <View>
          {items.map(item => (
            <Text key={item.id}>{item.title}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

About.propTypes = {
  getData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
