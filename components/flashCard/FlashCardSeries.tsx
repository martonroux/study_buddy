import React, {useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native";
import FlashCard from "./FlashCard";
import ProgressBar from "./ProgressBar";
import {fetchFlashCardByID, FlashCardData} from "../../hooks/flashCard/fetchFlashCardByID"
import {Colors} from "../../constants/Colors";

type FlashCardSeriesProps = {
    username: string;
    subject: string;
};

const FlashCardSeries: React.FC<FlashCardSeriesProps> = ({username, subject}) => {
    const [cardIdx, setCardIdx] = useState(0);
    const [flashCardList, setFlashCardList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async function
        const fetchData = async () => {
            setLoading(true);  // Set loading to true when fetch starts
            try {
                const flashCard = await fetchFlashCardByID(1, subject);
                setFlashCardList([flashCard]);  // Update the state with the fetched data as an array
                console.log(flashCard.id, flashCard.title, flashCard.question, flashCard.answer);  // Log the flashCard properties
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);  // Set loading to false after data is fetched
            }
        };

        fetchData();  // Call the async function
    }, []);

    const onSwipe = (outcome) => {
        console.log(outcome);
        if (flashCardList.length - 1 > cardIdx)
            setCardIdx(cardIdx + 1);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        );
    }

    // After loading, render FlashCard and ProgressBar
    return (
        <View style={styles.main}>
            <FlashCard
                title={flashCardList[cardIdx].title}
                subject={flashCardList[cardIdx].subject}
                question={flashCardList[cardIdx].question}
                answer={flashCardList[cardIdx].answer}
                onSwipe={onSwipe}
            />
            <SafeAreaView style={{position: 'absolute', top: 0, left: 0, right: 0}}>
                <ProgressBar max={flashCardList.length} progress={cardIdx} />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {

    }
});

export default FlashCardSeries;
