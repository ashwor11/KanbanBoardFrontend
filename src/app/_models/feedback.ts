export class Feedback{
    id !: number;
    writtenByPersonId !: number;
    content !: string;

    constructor(content:string, writttenByPersonId : number){
        this.content = content,
        this.writtenByPersonId = writttenByPersonId
    }
}

