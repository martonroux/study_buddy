import React from "react";
import {Text, View} from "react-native";
import {TextTypes} from "../../constants/TextTypes";

type RecentTabProps = {
    recentSubjects: string[]
}

export const RecentTab:React.FC<RecentTabProps> = ({recentSubjects}) => {
    return (
        <View>
            <Text style={TextTypes.h3}>Recent</Text>

        </View>
    );
}
