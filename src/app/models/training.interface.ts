
export interface Training {
    id: number;
    name: string;
    description: string;
    trainingDates: Date[];
    status: string;
    maxNoOfParticipants: number;
    currentNoOfParticipants: number;
}

