import axios from "axios";
import {SubjectType} from "../../constants/DataTypes";
import {ServerIP} from "../../constants/Server";

export const fetchUserSeries = async (username: string) : Promise<SubjectType[]> => {
    try {
        const response = await axios.get(`${ServerIP}/get-subjects?username=${username}`);

        let subjects: SubjectType[] = []

        for (let i = 0; i < response.data.length; i++) {
            subjects.push({
                id: response.data[i].id,
                name: response.data[i].name,
                color: response.data[i].color
            });
        }
        return subjects;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
