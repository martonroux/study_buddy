import axios from "axios";
import {FlashCardType, SubjectType} from "../../constants/DataTypes";

export const fetchFlashCardByID = async (id: number, subject: SubjectType) => {
    try {
        const response = await axios.get(`http://192.168.0.104:8080/get-flash-card?id=${id}`);

        const flashCard: FlashCardType = {
            id: id,
            title: response.data["title"],
            question: response.data["question"],
            answer: response.data["answer"],
            subject: subject
        }

        return flashCard
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
