import { TopicRequest  } from './topicRequest';
export class Topic {
    id:string;
    name: string;
    description: string;
    createdAt: string;
    expiredAt: any;
    openedAt: any;
    teachers: number;
    students: number;
    constructor(topic?: TopicRequest){
        if(topic){
            this.id = topic.id;
            this.name = topic.name;
            this.description = topic.description;
            this.createdAt = topic.createdAt;
            this.expiredAt = topic.expiredAt;
            this.openedAt = topic.openedAt;
            this.teachers = topic.teachers;
            this.students = topic.students;
        }else{
            this.teachers = 0;
            this.students = 0;
        }
    }
}
