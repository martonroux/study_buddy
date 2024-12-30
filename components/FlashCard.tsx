import React, {useState, useRef} from "react";
import {Animated, Image, PanResponder, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { TextTypes, rem } from "../constants/TextTypes";
import { Colors } from "../constants/Colors";
import WebTextDisplay from "./WebTextDisplay";
import {BlurView} from "expo-blur";
import {FlashCardFace} from "./flashCard/FlashCardFace";

const FlashCard = ({ subject, title, question, answer }) => {
    const [flipped, setFlipped] = useState(false);
    const [stopMovement, setStopMovement] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const pan = useRef(new Animated.ValueXY()).current;
    const isFlipping = useRef(false);

    // Interpolation to create front and back rotation
    const frontRotation = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const backRotation = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    // Interpolation for tilt effect
    const tilt = pan.x.interpolate({
        inputRange: [-200, 0, 200], // Adjust range to control tilt sensitivity
        outputRange: ["-10deg", "0deg", "10deg"], // Max tilt angles
        extrapolate: "clamp", // Prevent values from exceeding range
    });

    const rightBoxOpacity = pan.x.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1], // Adjust the opacity based on the drag distance
        extrapolate: "clamp",
    });

    const leftBoxOpacity = pan.x.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0], // Adjust the opacity based on the drag distance
        extrapolate: "clamp",
    });

    const topBoxOpacity = pan.y.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0], // Adjust the opacity based on the drag distance
        extrapolate: "clamp",
    });

    const stopMovementAndReturn = () => {
        // Animate the card back to the initial position
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    const handleFlip = () => {
        // Disable dragging while flipping
        isFlipping.current = true;

        // Trigger flip animation
        if (flipped) {
            Animated.timing(flipAnimation, {
                toValue: 0, // Rotate back to 0 degrees
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                isFlipping.current = false; // Re-enable dragging once the flip is finished
            });
        } else {
            Animated.timing(flipAnimation, {
                toValue: 180, // Rotate to 180 degrees
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                isFlipping.current = false; // Re-enable dragging once the flip is finished
            });
        }
        setFlipped(!flipped); // Update state
    };

    // PanResponder to handle drag gestures
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !isFlipping.current, // Disable pan responder while flipping
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
        onPanResponderRelease: (event, gestureState) => {
            pan.flattenOffset();

            if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
                // Trigger flip if it's a short tap
                handleFlip();
            } else {
                // Animate back to center if dragging is not detected
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            }
        },
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
                                { rotate: tilt }, // Apply tilt based on drag
                            ],
                        },
                    ]}
                >
                    {/* Front Side */}
                    <Animated.View
                        style={[
                            styles.flashcard,
                            styles.front,
                            { transform: [{ rotateY: frontRotation }] },
                        ]}
                    >
                        <FlashCardFace title={title} subject={subject} text={question} subjectColor={Colors.highlight1}/>
                    </Animated.View>

                    {/* Back Side */}
                    <Animated.View
                        style={[
                            styles.flashcard,
                            styles.back,
                            { transform: [{ rotateY: backRotation }] },
                        ]}
                    >
                        <FlashCardFace title={"Réponse"} subject={subject} text={answer} subjectColor={Colors.highlight1}/>
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
        backfaceVisibility: "hidden", // Hide the back side when flipped
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.highlight1,
        padding: rem(1),
    },
    front: {
        backgroundColor: Colors.secondary,
    },
    back: {
        backgroundColor: Colors.secondary,
        transform: [{ rotateY: "180deg" }], // Start flipped
    },
    subject: {
        backgroundColor: Colors.highlight1,
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
        height: '60%',
        width: '10%',
        maxWidth: 40,
        position: "absolute",
        left: 0,
        backgroundColor: Colors.danger
    },
    rightBox: {
        height: '60%',
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
