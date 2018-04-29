import { Detail } from './detail';

export class DetailTable {
    db_id:string;
    id: number;
    topic:string;
    description:string;
    createdAt:string;
    expertise:number;
    constructor(id?:number, detail?: Detail, createdAt?:string, expertise?:number){
        if(detail){
            this.id = id;
            this.db_id = detail.topic.id;
            this.topic = detail.topic.name;
            this.description = detail.topic.description;
            this.createdAt = createdAt;
            this.expertise = expertise;
        }
    }
}
