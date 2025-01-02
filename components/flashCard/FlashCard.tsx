import React, {useState, useRef} from "react";
import {Animated, Image, PanResponder, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { TextTypes, rem } from "../../constants/TextTypes";
import { Colors } from "../../constants/Colors";
import {BlurView} from "expo-blur";
import {FlashCardFace} from "./FlashCardFace";
import {Dimensions} from 'react-native';


const FlashCard = ({ subject, title, question, answer, color, onSwipe }) => {
    const [flipped, setFlipped] = useState(false);
    const [stopMovement, setStopMovement] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const pan = useRef(new Animated.ValueXY()).current;
    const isFlipping = useRef(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const frontRotation = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const backRotation = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    const tilt = pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-10deg", "0deg", "10deg"],
        extrapolate: "clamp",
    });

    const rightBoxOpacity = pan.x.interpolate({
        inputRange: [0, windowWidth / 4],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    const leftBoxOpacity = pan.x.interpolate({
        inputRange: [-windowWidth / 4, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const topBoxOpacity = pan.y.interpolate({
        inputRange: [-windowHeight / 6, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const stopMovementAndReturn = () => {
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    const handleFlip = (fast: Boolean = false) => {
        isFlipping.current = true;

        if (flipped) {
            Animated.timing(flipAnimation, {
                toValue: 0,
                duration: fast ? 1 : 500,
                useNativeDriver: false,
            }).start(() => {
                isFlipping.current = false;
            });
        } else {
            Animated.timing(flipAnimation, {
                toValue: 180,
                duration: fast ? 1 : 500,
                useNativeDriver: false,
            }).start(() => {
                isFlipping.current = false;
            });
        }
        setFlipped(!flipped);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !isFlipping.current,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: 0,
                y: 0,
            });
            pan.setValue({ x: 0, y: 0 });
            setStopMovement(false);
        },
        onPanResponderMove: (evt, gestureState) => {
            if (!flipped && stopMovement) return;

            Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            )(evt, gestureState);

            if (!flipped && (Math.abs(gestureState.dx) > 30 || Math.abs(gestureState.dy) > 30)) {
                setStopMovement(true);
                stopMovementAndReturn();
            }
        },
        onPanResponderRelease(event, gestureState) {
            pan.flattenOffset();

            if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
                handleFlip();
            } else {
                if (flipped && gestureState.dx > windowWidth / 4) {
                    Animated.timing(pan, {
                        toValue: { x: windowWidth, y: 0 },
                        duration: 100,
                        useNativeDriver: false,
                    }).start(() => {
                        onSwipe?.('correct');
                        handleFlip(true);
                        pan.setValue({ x: 0, y: windowHeight });
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: false,
                        }).start(() => {
                        });
                    });
                } else if (flipped && gestureState.dx < -windowWidth / 4) {
                    Animated.timing(pan, {
                        toValue: { x: -windowWidth, y: 0 },
                        duration: 100,
                        useNativeDriver: false,
                    }).start(() => {
                        onSwipe?.('incorrect');
                        handleFlip(true);
                        pan.setValue({ x: 0, y: windowHeight });
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: false,
                        }).start(() => {
                        });
                    });
                } else if (flipped && gestureState.dy < -windowHeight / 5) {
                    Animated.timing(pan, {
                        toValue: { x: 0, y: -windowHeight },
                        duration: 100,
                        useNativeDriver: false,
                    }).start(() => {
                        onSwipe?.('not sure');
                        handleFlip(true);
                        pan.setValue({ x: 0, y: windowHeight });
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: false,
                        }).start(() => {
                        });
                    });
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            }
        }
    });

    return (
        <View style={styles.main}>
            <Animated.View style={[styles.leftBox, { opacity: leftBoxOpacity }]}>
            </Animated.View>
            <Animated.View style={[styles.rightBox, { opacity: rightBoxOpacity }]}>
            </Animated.View>
            <Animated.View style={[styles.topBox, { opacity: topBoxOpacity }]}>
            </Animated.View>
            <BlurView intensity={100} tint={'dark'} style={styles.blurContainer}>
            </BlurView>
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        styles.container,
                        {
                            transform: [
                                { translateX: pan.x },
                                { translateY: pan.y },
                                { rotate: tilt },
                            ],
                        },
                    ]}
                >
                    {/* Front Side */}
                    <Animated.View
                        style={[
                            styles.flashcard,
                            styles.front,
                            { borderColor: color },
                            { transform: [{ rotateY: frontRotation }] },
                        ]}
                    >
                        <FlashCardFace title={title} subject={subject} text={question} subjectColor={color}/>
                    </Animated.View>

                    {/* Back Side */}
                    <Animated.View
                        style={[
                            styles.flashcard,
                            styles.back,
                            { borderColor: color },
                            { transform: [{ rotateY: backRotation }] },
                        ]}
                    >
                        <FlashCardFace title={"Réponse"} subject={subject} text={answer} subjectColor={color}/>
                    </Animated.View>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        width: '100%',
        height: '100%',
    },
    webViewStyle: {
        backgroundColor: Colors.secondary,
    },
    container: {
        position: "relative",
        width: 250,
        height: 402,
    },
    flashcard: {
        position: "absolute",
        width: 250,
        height: 450,
        backfaceVisibility: "hidden",
        borderRadius: 12,
        borderWidth: 2,
        padding: rem(1),
    },
    front: {
        backgroundColor: Colors.secondary,
    },
    back: {
        backgroundColor: Colors.secondary,
        transform: [{ rotateY: "180deg" }],
    },
    subject: {
        borderRadius: 4,
        paddingVertical: rem(0.2),
        paddingHorizontal: rem(0.6),
        alignSelf: "flex-start",
        marginTop: rem(0.2),
    },
    questionContainer: {
        flex: 1,
        marginTop: rem(1.5),
    },
    answerContainer: {
        flex: 1,
        marginTop: rem(1.5),
    },
    leftBox: {
        height: '80%',
        width: '10%',
        maxWidth: 40,
        position: "absolute",
        left: 0,
        backgroundColor: Colors.danger
    },
    rightBox: {
        height: '80%',
        width: '10%',
        maxWidth: 40,
        position: "absolute",
        right: 0,
        backgroundColor: Colors.success
    },
    topBox: {
        height: '15%',
        width: '75%',
        maxHeight: 50,
        maxWidth: 500,
        position: "absolute",
        top: 0,
        backgroundColor: Colors.warning
    },
    leftRightImages: {
        height: '100%',
        width: null,
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

export default FlashCard;
