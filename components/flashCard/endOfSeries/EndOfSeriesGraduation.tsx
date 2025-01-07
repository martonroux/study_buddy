import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {rem, TextTypes} from "../../../constants/TextTypes";
import {Colors} from "../../../constants/Colors";

const EndOfSeriesGraduation = () => {
    return (
        <View style={styles.graduationContainer}>
            <View style={{alignItems: 'flex-start'}}>
                <View style={styles.graduationLine}/>
                <Text style={TextTypes.small}>0</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <View style={styles.graduationLine}/>
                <Text style={TextTypes.small}>25</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <View style={styles.graduationLine}/>
                <Text style={TextTypes.small}>50</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <View style={styles.graduationLine}/>
                <Text style={TextTypes.small}>75</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <View style={styles.graduationLine}/>
                <Text style={TextTypes.small}>100</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    graduationContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        opacity: 0.8,
    },
    graduationLine: {
        width: 2,
        height: rem(0.5),
        backgroundColor: Colors.text,
    },
});

export default EndOfSeriesGraduation;
