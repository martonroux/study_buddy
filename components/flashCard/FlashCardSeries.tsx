import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FlashCard from "./FlashCard";
import ProgressBar from "./ProgressBar";
import {fetchFlashCardByID} from "../../hooks/flashCard/fetchFlashCardByID"
import {Colors} from "../../constants/Colors";
import {fetchUserSeriesCardIDs} from "../../hooks/flashCard/fetchUserSeriesCardIDs";
import {FlashCardType, SubjectType} from "../../constants/DataTypes";
import EndOfSeriesStats from "./endOfSeries/EndOfSeriesStats";
import {rem, TextTypes} from "../../constants/TextTypes";

type FlashCardSeriesProps = {
    username: string;
    subject: SubjectType;
};

const FlashCardSeries: React.FC<{ navigation: any, route: any }> = ({navigation, route}) => {
    const {username, subject}: FlashCardSeriesProps = route.params;
    const [cardIdx, setCardIdx] = useState(0);
    const [flashCardList, setFlashCardList]: [FlashCardType[], Dispatch<SetStateAction<FlashCardType[]>>] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amountGood, setAmountGood] = useState(0);
    const [amountOK, setAmountOK] = useState(0);
    const [amountBad, setAmountBad] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onSwipe = (outcome) => {
        if (outcome === "good")
            setAmountGood(amountGood + 1);
        if (outcome === "ok")
            setAmountOK(amountOK + 1);
        if (outcome === "bad")
            setAmountBad(amountBad + 1);

        setCardIdx(cardIdx + 1);
    };

    const goHome = () => {
        navigation.goBack();
    }

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
                <EndOfSeriesStats subject={subject} before={{amountGood: 0, amountOK: 0, amountBad: 1}} now={{amountOK: amountOK, amountGood: amountGood, amountBad: amountBad}} />
                <View style={styles.flexCenter}>
                    <TouchableOpacity style={styles.homeButton} onPress={goHome}>
                        <Text style={[TextTypes.p, {fontWeight: 500}]}>
                            Menu
                        </Text>
                    </TouchableOpacity>
                </View>
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
        flex: 1,
        backgroundColor: '#000',
    },
    flexCenter: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    homeButton: {
        backgroundColor: Colors.primary,
        borderRadius: 4,
        padding: rem(0.7),
    }
});

export default FlashCardSeries;
