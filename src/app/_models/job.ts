import { Feedback } from "./feedback";

export class Job{
    id !: number;
    description !: string;
    isDone !: boolean;
    feedbacks !: Feedback[];

    constructor(description : string, id : number){
    this.description = description;
    this.id = id;
    this.feedbacks = [];
    this.isDone = false;
    }
}

