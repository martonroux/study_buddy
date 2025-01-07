import React from "react";
import {SubjectType} from "../../../constants/DataTypes";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {rem, TextTypes} from "../../../constants/TextTypes";
import {Colors} from "../../../constants/Colors";
import EndOfSeriesStatBar, {EndOfSeriesStatBarType} from "./EndOfSeriesStatBar";

type EndOfSeriesStatsProps = {
    subject: SubjectType,
    before: EndOfSeriesStatBarType,
    now: EndOfSeriesStatBarType,
};

const EndOfSeriesStats: React.FC<EndOfSeriesStatsProps> = ({subject, before, now}) => {
    return (
        <View style={styles.main}>
            <Text style={TextTypes.h4}>Félicitations 🎉</Text>
            <View style={[styles.subjectContainer, {backgroundColor: subject.color, marginBottom: 25}]}>
                <Text style={[TextTypes.p, {fontWeight: 600}]}>{subject.name}</Text>
            </View>
            <EndOfSeriesStatBar before={before} now={now} />
            <View style={[styles.flexRowSpaceAround, {marginTop: 25}]}>
                <View style={styles.flexColumnCentered}>
                    <View style={{backgroundColor: Colors.success, borderRadius: 4, padding: rem(0.7)}}>
                        <Text style={TextTypes.h6}>
                            +{now.amountGood - before.amountGood}
                        </Text>
                    </View>
                    <Text style={[TextTypes.p, {fontWeight: 500}]}>Cartes apprises</Text>
                </View>
                <View style={styles.flexColumnCentered}>
                    <View style={{backgroundColor: Colors.highlight1, borderRadius: 4, padding: rem(0.7)}}>
                        <Text style={TextTypes.h6}>
                            {(now.amountBad - before.amountBad) >= 0 ? '+' : ''}{now.amountBad - before.amountBad}
                        </Text>
                    </View>
                    <Text style={[TextTypes.p, {fontWeight: 500}]}>Cartes ratées</Text>
                </View>
            </View>
            {
                (now.amountOK + now.amountBad > 0) && (
                    <TouchableOpacity style={[styles.startOverButton, {marginTop: 20}]}>
                        <Text style={[TextTypes.p, {fontWeight: 600}]}>Refaire les plus difficiles ({now.amountOK + now.amountBad}/{now.amountBad + now.amountOK + now.amountGood})</Text>
                    </TouchableOpacity>
                )
            }
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
        gap: rem(0.3),
    },
    subjectContainer: {
        padding: rem(0.5),
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    flexRowSpaceAround: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    flexColumnCentered: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    startOverButton: {
        backgroundColor: Colors.primary,
        borderRadius: 4,
        padding: rem(0.7),
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    }
})

export default EndOfSeriesStats;
