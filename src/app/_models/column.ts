import { Card } from "./card";

export class Column{
    id !: string;
    cards !: Card[];
    status !: number;


    constructor(){
        this.cards = []
    }

}