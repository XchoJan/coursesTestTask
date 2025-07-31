import React from 'react';
import {StyleSheet, View} from "react-native";

const AppContainer = ({children}: any) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default AppContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 84
    },

})
