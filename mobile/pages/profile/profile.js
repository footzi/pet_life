import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Api from 'api';

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(Api.loadProfileData())
});

const Profile = ({ profile }) => {
  useEffect(() => {
    getData();
  });
  
  return (
    <>
      <View>Профиль</View>
      <ul>
        <View>id - {profile.id}></View>
        <View>Имя - {profile.name}</View>
        <View>Фамилия - {profile.surname}</View>
        <View>Создан - {profile.createDate}</View>
      </ul>
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string,
    createDate: PropTypes.string.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
