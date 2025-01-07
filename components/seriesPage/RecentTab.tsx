import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {rem, TextTypes} from "../../constants/TextTypes";
import {SubjectType} from "../../constants/DataTypes";
import {Colors} from "../../constants/Colors";

type RecentTabProps = {
    recentSubjects: SubjectType[];
    onSubjectPress: (subject: SubjectType) => void;
};

export const RecentTab: React.FC<RecentTabProps> = ({recentSubjects, onSubjectPress}) => {
    function onPress(subject: SubjectType) {
        onSubjectPress?.(subject);
    }

    return (
        <View style={styles.main}>
            <Text style={[TextTypes.h4, styles.mainTitle]}>Recent</Text>

            <View style={styles.subjectList}>
                {recentSubjects.map((subject) => (
                    <TouchableOpacity
                        key={subject.id}
                        style={[styles.subjectContainer, {borderColor: subject.color}]}
                        onPress={() => onPress(subject)}
                    >
                        <Text style={[TextTypes.h6, {fontWeight: "600"}]}>{subject.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingLeft: rem(1),
        paddingRight: rem(1),
        paddingTop: rem(0.6),
        paddingBottom: rem(0.6),
        borderRadius: 12,
        backgroundColor: Colors.secondary,
    },
    mainTitle: {
        marginBottom: rem(1),
    },
    subjectList: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    subjectContainer: {
        borderRadius: 6,
        borderWidth: 2,
        padding: rem(0.3),
        marginRight: rem(0.7),
        marginBottom: rem(0.7),
    },
});
