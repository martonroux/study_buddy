import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native";
import FlashCard from "./FlashCard";
import ProgressBar from "./ProgressBar";
import {fetchFlashCardByID} from "../../hooks/flashCard/fetchFlashCardByID"
import {Colors} from "../../constants/Colors";
import {fetchUserSeriesCardIDs} from "../../hooks/flashCard/fetchUserSeriesCardIDs";
import {FlashCardType, SubjectType} from "../../constants/DataTypes";

type FlashCardSeriesProps = {
    username: string;
    subject: SubjectType;
};

const FlashCardSeries: React.FC<FlashCardSeriesProps> = ({username, subject}) => {
    const [cardIdx, setCardIdx] = useState(0);
    const [flashCardList, setFlashCardList]: [FlashCardType[], Dispatch<SetStateAction<FlashCardType[]>>] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async function
        const fetchData = async () => {
            setLoading(true);  // Set loading to true when fetch starts
            try {
                const fcIDs = await fetchUserSeriesCardIDs(username, subject);

                for (let i = 0; i < fcIDs.length; i++) {
                    const flashCard = await fetchFlashCardByID(fcIDs[i], subject);
                    flashCardList.push(flashCard)
                    setFlashCardList(flashCardList);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);  // Set loading to false after data is fetched
            }
        };

        fetchData();  // Call the async function
    }, []);

    const onSwipe = (outcome) => {
        setCardIdx(cardIdx + 1);
        console.log(cardIdx);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        );
    }

    if (cardIdx < flashCardList.length)
        return (
            <View style={styles.main}>
                <FlashCard
                    title={flashCardList[cardIdx].title}
                    subject={flashCardList[cardIdx].subject.name}
                    question={flashCardList[cardIdx].question}
                    answer={flashCardList[cardIdx].answer}
                    color={flashCardList[cardIdx].subject.color}
                    onSwipe={onSwipe}
                />
                <SafeAreaView style={{position: 'absolute', top: 0, left: 0, right: 0}}>
                    <ProgressBar max={flashCardList.length} progress={cardIdx} />
                </SafeAreaView>
            </View>
        );

    return (
        <View style={styles.main}>
            <SafeAreaView style={{position: 'absolute', top: 0, left: 0, right: 0}}>
                <ProgressBar max={flashCardList.length} progress={cardIdx} />
            </SafeAreaView>
        </View>
    )
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
