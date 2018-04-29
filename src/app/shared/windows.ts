export class Window{
    createTopic: boolean;
    updateTopic: boolean;
    collaboratorDemo : boolean;
    topicDemo : boolean;
    createTopicAndDetail : boolean;
    createDetail : boolean;
    updateDetail :boolean;
    showDefaultCreateDetail:boolean;
    isColDemoInit:boolean;
    constructor(){
        this.createTopic = false;
        this.updateTopic = false;
        this.collaboratorDemo = true;
        this.topicDemo = false;
        this.updateDetail = false;
        this.createTopicAndDetail = false;
        this.showDefaultCreateDetail = true;
        this.isColDemoInit = false;
    }
}
