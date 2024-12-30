import React from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {Colors} from "./constants/Colors";
import FlashCardSeries from "./components/flashCard/FlashCardSeries";

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlashCardSeries flashCardDataList={
                [
                    {
                        subject: "Analyse 1",
                        title: "Dérivation I",
                        question: "Quelle est la dérivée de: \n$\\frac{u(x)}{v(x)}$ ?",
                        answer: "\\[ \\frac{u'(x) v(x) - u(x) v'(x)}{v(x)^{2}} \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                    {
                        subject: "Analyse 1",
                        title: "Dérivation II",
                        question: "Quelle est la dérivée de: \n$u(x) \\times v(x)$ ?",
                        answer: "\\[ u'(x)v(x) + u(x)v'(x) \\]"
                    },
                ]
            }></FlashCardSeries>
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
