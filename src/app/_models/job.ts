import { Feedback } from "./feedback";

export class Job{
    id !: number;
    description !: string;
    isDone !: boolean;
    feedbacks !: Feedback[];
}