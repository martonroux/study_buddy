import React, {useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import FlashCard from "./FlashCard";
import ProgressBar from "./ProgressBar";

type FlashCardData = {
    subject: string,
    title: string,
    question: string,
    answer: string
};

type FlashCardSeriesProps = {
    flashCardDataList: FlashCardData[];
};

const FlashCardSeries: React.FC<FlashCardSeriesProps> = ({flashCardDataList}) => {
    const [cardIdx, setCardIdx] = useState(0);

    const onSwipe = (outcome) => {
        console.log(outcome);
        if (flashCardDataList.length - 1 > cardIdx)
            setCardIdx(cardIdx + 1);
    };

    return (
        <View style={styles.main}>
            <FlashCard title={flashCardDataList[cardIdx].title}
                       subject={flashCardDataList[cardIdx].subject}
                       question={flashCardDataList[cardIdx].question}
                       answer={flashCardDataList[cardIdx].answer}
                       onSwipe={onSwipe}>

            </FlashCard>
            <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0}}>
                <ProgressBar max={flashCardDataList.length} progress={cardIdx}/>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {

    }
});

export default FlashCardSeries;
