import {StyleSheet} from "react-native";
import {Colors} from "./Colors";

const remSize = 16;
const typeScale = 1.25;
export const rem = (size) => size * remSize;

export const TextTypes = StyleSheet.create({
    p: {
        fontSize: rem(1),
        color: Colors.text,
        fontWeight: "normal",
        fontFamily: "Inter",
        margin: 0
    },
    h6: {
        fontSize: rem(1) * typeScale,
        color: Colors.text,
        fontWeight: "400",
        fontFamily: "Inter"
    },
    h5: {
        fontSize: rem(1) * typeScale ** 2,
        color: Colors.text,
        fontWeight: "500",
        fontFamily: "Inter"
    },
    h4: {
        fontSize: rem(1) * typeScale ** 3,
        color: Colors.text,
        fontWeight: "600",
        fontFamily: "Inter"
    },
    h3: {
        fontSize: rem(1) * typeScale ** 4,
        color: Colors.text,
        fontWeight: "600",
        fontFamily: "Inter"
    },
    h2: {
        fontSize: rem(1) * typeScale ** 5,
        color: Colors.text,
        fontWeight: "600",
        fontFamily: "Inter"
    },
    h1: {
        fontSize: rem(1) * typeScale ** 6,
        color: Colors.text,
        fontWeight: "700",
        fontFamily: "Inter"
    },
    small: {
        fontSize: rem(0.8),
        color: Colors.text,
        fontWeight: "300",
        fontFamily: "Inter"
    }
});
