import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {rem, TextTypes} from "../../constants/TextTypes";
import {SubjectType} from "../../constants/DataTypes";
import {fetchUserSubjects} from "../../hooks/flashCard/fetchUserSubjects";
import {Colors} from "../../constants/Colors";
import {RecentTab} from "./RecentTab";

type SeriesPageType = {
    username: string,
    navigateToFlashCards: (subject: SubjectType) => void,
}

export const SeriesPage: React.FC<SeriesPageType> = ({username, navigateToFlashCards})=> {
    const [subjects, setSubjects]: [SubjectType[], Dispatch<SetStateAction<SubjectType[]>>] = useState([]);
    const [loading, setLoading] = useState(true);

    function getLatestSubjects(): SubjectType[] {
        let latest: SubjectType[] = []
        let subjSorted = subjects.sort((a, b) => {
            return a.lastUsed - b.lastUsed;
        });

        for (let i = 0; i < 5; i++) {
            if (i >= subjSorted.length)
                break;

            latest.push(subjSorted[i]);
        }
        return latest;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjects = await fetchUserSubjects(username);
                setSubjects(subjects);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.main}>
                    <Text style={TextTypes.h3}>My Series</Text>

                    <View style={styles.centerActivityIndicator}>
                        <ActivityIndicator size={'small'} color={Colors.primary}/>
                    </View>
                </View>
            </SafeAreaView>
        )

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.main}>
                <Text style={TextTypes.h3}>My Series</Text>

                <RecentTab recentSubjects={getLatestSubjects()} onSubjectPress={navigateToFlashCards} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        width: '100%'
    },
    main: {
        flex: 1,
        width: '100%',
        padding: rem(1),
        gap: rem(1.5),
    },
    centerActivityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
