import axios from "axios";

export const fetchUserSeries = async (username: string) : Promise<string[]> => {
    try {
        const response = await axios.get(`http://192.168.0.104:8080/get-subjects?username=${username}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
