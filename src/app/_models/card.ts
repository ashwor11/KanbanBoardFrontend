import { Feedback } from "./feedback";
import { Job } from "./job";

export class Card{
    id !:number;
    name ?: string;
    status !: string;
    assignedPersonId ?: number;
    isReassigned ?: boolean;
    color ?: string;
    assignedDate ?: Date | null;
    dueDate ?: Date | null;
    finishDate ?: Date | null;
    feedbacks ?: Feedback[];
    jobs ?: Job[];

    constructor(name : string) {
        this.name = name;
        this.jobs = [];
        this.feedbacks = [];
        this.isReassigned = false;
        this.color = '#b1bbc9';
        this.assignedDate = null;
        this.dueDate = null;
        this.finishDate = null
        this.assignedPersonId = 0
        
    }
    
}

/**
 *
 */
