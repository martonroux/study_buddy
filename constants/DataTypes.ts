export type SubjectType = {
    name: string,
    color: string,
    id: number,
    lastUsed: number,
    graphId: number
}

export type FlashCardType = {
    id: number,
    title: string,
    question: string,
    answer: string,
    lastResult: number,
    subject: SubjectType
}
