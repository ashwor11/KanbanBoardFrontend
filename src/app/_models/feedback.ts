export class Feedback{
    id !: number;
    writtenByPersonId !: number;
    content !: string;
    writtenByPersonName ?: string;

    constructor(content:string, writttenByPersonId : number){
        this.content = content,
        this.writtenByPersonId = writttenByPersonId
    }
}

