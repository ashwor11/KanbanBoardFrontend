import { Column } from "./column";
import { PersonForBoard } from "./personForBoard";

export class Board{
    id !: number;
    name !: string;
    descriptipn !: string;
    creatorId !: number;
    persons !: PersonForBoard[]
    backlog !: Column;
    toDo !: Column;
    inProgress !: Column;
    review !: Column;
    done !: Column;


    
}