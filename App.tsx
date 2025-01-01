import React, {useEffect, useState} from "react";
import {ActivityIndicator, StatusBar, StyleSheet, View} from "react-native";
import {Colors} from "./constants/Colors";
import FlashCardSeries from "./components/flashCard/FlashCardSeries";
import {fetchUserSeries} from "./hooks/flashCard/fetchUserSeries";
import {fetchFlashCardByID} from "./hooks/flashCard/fetchFlashCardByID";

export default function App() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjects = await fetchUserSeries("Thawyn");
                setSubjects(subjects);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();  // Call the async function
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlashCardSeries username={'Thawyn'} subject={subjects[0]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
