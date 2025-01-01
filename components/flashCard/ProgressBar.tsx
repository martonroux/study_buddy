import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {TextTypes} from "../../constants/TextTypes";

type ProgressBar = {
    max: number;
    progress: number;
};

const ProgressBar:React.FC<ProgressBar> = ({max, progress}) => {
    return (
        <View style={styles.mainProgressBar}>
            <View style={styles.fullProgressBar}>
                <View style={[styles.actualProgressBar, { width: `${(progress / max)* 100}%` }]}>
                </View>
                <Text style={[TextTypes.p, styles.progressText]}>{max - progress}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainProgressBar: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25
    },
    fullProgressBar: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.secondary,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row'
    },
    actualProgressBar: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        height: '100%',
        paddingLeft: 20
    },
    progressText: {
        position: 'absolute',
        right: 20
    }
});

export default ProgressBar;
