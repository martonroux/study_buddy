import axios from "axios";

export type FlashCardData = {
    id: number,
    title: string,
    question: string,
    answer: string,
    color: string,
    subject: string
}

export const fetchFlashCardByID = async (id: number, subject: string) => {
    try {
        const response = await axios.get(`http://192.168.0.104:8080/get-flash-card?id=${id}`);

        const flashCard: FlashCardData = {
            id: id,
            title: response.data["title"],
            question: response.data["question"],
            answer: response.data["answer"],
            color: response.data["color"],
            subject: subject
        }

        return flashCard
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
