import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex             : 1,
        justifyContent   : 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems     : 'center',
        backgroundColor: '#DDDDDD',
        padding        : 10
    },
    countContainer: {
        alignItems: 'center',
        padding   : 10
    },
    countText: {
        color: '#FF00FF'
    }
});

const Navigation = () => (
    <View style={styles.container}>
        <TouchableHighlight style={styles.button}>
            <Text> Touch Here </Text>
        </TouchableHighlight>
    </View>
);


export default Navigation;
