import { Feedback } from "./feedback";
import { Job } from "./job";

export class Card{
    id !:number;
    name ?: string;
    assignedPersonId ?: number;
    isReassigned ?: boolean;
    color !: number;
    assignedDate !: Date;
    dueDate !: Date;
    finishDate !: Date;
    feedbacks !: Feedback[];
    jobs !: Job[];

    constructor(name : string) {
        this.name = name;
        this.jobs = [];
        this.feedbacks = [];
    }
    
}

/**
 *
 */
