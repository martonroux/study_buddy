import React from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {Colors} from "./constants/Colors";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomePage from "./components/HomePage";
import FlashCardSeries from "./components/flashCard/FlashCardSeries";
import {SubjectType} from "./constants/DataTypes";

type RootStackParamList = {
    HomePage: undefined;
    FlashCardSeries: { username: string, subject: SubjectType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator id={undefined}>{/* No idea why id=undefined suppresses a TypeScript error */}
                <Stack.Screen name={'HomePage'} component={HomePage} options={{headerShown: false}}/>
                <Stack.Screen name={'FlashCardSeries'} component={FlashCardSeries} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
