import React from "react";
import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {BlurView} from "expo-blur";
import {TextTypes} from "./constants/TextTypes";
import FlashCard from "./components/FlashCard";
import {Colors} from "./constants/Colors";

export default function App() {
    return (
        <View style={styles.container}>
            <FlashCard subject={"Analyse 1"} title={"Dérivation I"} question={
                "Quelle est la dérivée de: \n$\\frac{u(x)}{v(x)}$ ?"
            } answer={"\\[ \\frac{u'(x) v(x) - u(x) v'(x)}{v(x)^{2}} \\]"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    webViewStyle: {
        padding: 60,
        backgroundColor: Colors.background
    },
    blurContainer: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});
