import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {rem, TextTypes} from "../../constants/TextTypes";
import WebTextDisplay from "../WebTextDisplay";
import {Colors} from "../../constants/Colors";

export const FlashCardFace = ({title, subject, subjectColor, text})=> {
    return (
        <View style={styles.container}>
            <Text style={TextTypes.h4}>{title}</Text>
            <View style={[styles.subject, { backgroundColor: subjectColor }]}>
                <Text style={TextTypes.small}>{subject}</Text>
            </View>
            <View style={styles.textContainer}>
                <WebTextDisplay
                    input={text}
                    textStyle={TextTypes.p}
                    bodyStyle={styles.webViewStyle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webViewStyle: {
        backgroundColor: Colors.secondary,
    },
    subject: {
        borderRadius: 4,
        paddingVertical: rem(0.2),
        paddingHorizontal: rem(0.6),
        alignSelf: "flex-start",
        marginTop: rem(0.2),
    },
    textContainer: {
        flex: 1,
        marginTop: rem(1.5),
    },
});
