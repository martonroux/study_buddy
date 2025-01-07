import axios from "axios";
import {SubjectType} from "../../constants/DataTypes";
import {ServerIP} from "../../constants/Server";

export const fetchUserSeriesCardIDs = async (username: string, subject: SubjectType) : Promise<number[]> => {
    try {
        const response = await axios.get(`${ServerIP}/get-subject-fc-ids?username=${username}&subject=${subject.name}`);
        let result: number[] = []

        for (let i = 0; i < response.data.length; i++) {
            result.push(response.data[i]);
        }
        return result
    } catch (error) {
        console.error('Error fetching data [fetchUserSeriesCardIDs]:', error);
    }
};
