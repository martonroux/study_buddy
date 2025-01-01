import axios from "axios";

export const fetchUserSeriesCardIDs = async (username: string, subject: string) : Promise<number[]> => {
    try {
        const response = await axios.get(`http://192.168.0.104:8080/get-subject-fc-ids?username=${username}&subject=${subject}`);
        let result: number[] = []

        for (let i = 0; i < response.data.length; i++) {
            result.push(response.data[i]);
        }
        return result
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
