import React, {useEffect, useRef, useState} from "react";
import {Animated, Easing, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../../constants/Colors";
import {TextTypes} from "../../../constants/TextTypes";
import EndOfSeriesGraduation from "./EndOfSeriesGraduation";

type EndOfSeriesStatBarType = {
    amountGood: number,
    amountOK: number,
    amountBad: number
}

type EndOfSeriesStatBarProps = {
    before: EndOfSeriesStatBarType,
    now: EndOfSeriesStatBarType
}

const EndOfSeriesStatBar: React.FC<EndOfSeriesStatBarProps> = ({before, now}) => {

    const totalBefore = before.amountGood + before.amountOK + before.amountBad;
    const totalNow = now.amountGood + now.amountOK + now.amountBad;

    const goodWidth = useRef(new Animated.Value((before.amountGood / totalBefore) * 100)).current;
    const okWidth = useRef(new Animated.Value(((before.amountGood + before.amountOK) / totalBefore) * 100)).current;
    const [displayedPercentage, setDisplayedPercentage] = useState(Math.round((before.amountGood / totalBefore) * 100));


    useEffect(() => {
        const listenerId = goodWidth.addListener(({ value }) => {
            setDisplayedPercentage(Math.round(value));
        });

        Animated.sequence([
            Animated.delay(500),
            Animated.parallel([
                Animated.timing(goodWidth, {
                    toValue: (now.amountGood / totalNow) * 100,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.quad),
                }),
                Animated.timing(okWidth, {
                    toValue: ((now.amountGood + now.amountOK) / totalNow) * 100,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.quad),
                }),
            ]),
        ]).start();

        return () => {
            goodWidth.removeListener(listenerId);
        };
    }, [now]);

    return (
        <View style={styles.main}>
            <View style={[styles.bad]} />
            <Animated.View
                style={[
                    styles.ok,
                    { width: okWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
                ]}
            >
            </Animated.View>
            <Animated.View
                style={[
                    styles.good,
                    { width: goodWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
                ]}
            >
                <Text style={TextTypes.p}>
                    {displayedPercentage}%
                </Text>
            </Animated.View>
            <EndOfSeriesGraduation />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'column'
    },
    bad: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.danger,
        padding: 0,
        borderTopRightRadius: 4
    },
    ok: {
        height: 40,
        borderRadius: 4,
        padding: 0,
        flex: 1,
        backgroundColor: Colors.warning,
        position: 'absolute'
    },
    good: {
        height: 40,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: Colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'

    }
});

export default EndOfSeriesStatBar;
