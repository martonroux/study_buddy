import React from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {SeriesPage} from "./seriesPage/SeriesPage";
import {Colors} from "../constants/Colors";

const username = 'Thawyn';

const HomePage = ({navigation}) => {
    const navigateToFlashCards = (subject) => {
        navigation.navigate('FlashCardSeries', {username: username, subject: subject});
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SeriesPage username={username} navigateToFlashCards={navigateToFlashCards} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default HomePage;
