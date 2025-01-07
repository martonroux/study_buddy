import React from "react";
import {SubjectType} from "../../../constants/DataTypes";
import {StyleSheet, Text, View} from "react-native";
import {rem, TextTypes} from "../../../constants/TextTypes";
import {Colors} from "../../../constants/Colors";
import EndOfSeriesStatBar from "./EndOfSeriesStatBar";

type EndOfSeriesStatsProps = {
    subject: SubjectType,
    amountCards: number,
    amountGood: number,
    amountOK: number,
    amountBad: number,
    amountNewLearned: number
};

const EndOfSeriesStats: React.FC<EndOfSeriesStatsProps> = ({subject, amountCards, amountGood, amountOK, amountBad, amountNewLearned}) => {


    return (
        <View style={styles.main}>
            <Text style={TextTypes.h4}>Félicitations 🎉</Text>
            <View style={[styles.subjectContainer, {backgroundColor: subject.color}]}>
                <Text style={[TextTypes.p, {fontWeight: 600}]}>{subject.name}</Text>
            </View>
            <EndOfSeriesStatBar before={{amountGood: 5, amountOK: 3, amountBad: 4}} now={{amountGood: 8, amountOK: 2, amountBad: 3}} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.secondary,
        borderRadius: 12,
        margin: 20,
        padding: rem(1),
        flex: 1,
        gap: rem(0.5),
    },
    subjectContainer: {
        padding: rem(0.5),
        borderRadius: 4,
        alignSelf: 'flex-start',
    }
})

export default EndOfSeriesStats;
