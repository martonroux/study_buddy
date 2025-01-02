import axios from "axios";
import {SubjectType} from "../../constants/DataTypes";

export const fetchUserSeries = async (username: string) : Promise<SubjectType[]> => {
    try {
        const response = await axios.get(`http://192.168.0.104:8080/get-subjects?username=${username}`);

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
