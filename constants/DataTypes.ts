export type SubjectType = {
    name: string,
    color: string,
    id: number
}

export type FlashCardType = {
    id: number,
    title: string,
    question: string,
    answer: string,
    subject: SubjectType
}
