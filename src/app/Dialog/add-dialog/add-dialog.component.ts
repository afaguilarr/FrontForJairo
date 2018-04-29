import { Component,Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TopicsToTeachService } from '../../topicsToTeach.service';

import { TopicRequest } from '../../shared/topicRequest';
import { Topic } from '../../shared/topic';

import { Window } from '../../shared/windows';

import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormArray } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { Collaborator } from '../../shared/collaborator';
import { DetailTable } from '../../shared/detailTable';
import { Detail } from '../../shared/detail';
import { DetailFormTemplate } from '../../shared/detailFormTemplate';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  localTopics = [];
  detail: DetailFormTemplate;
  windows : Window;
  collaboratorDemo: Collaborator; 
  addDetailForm: FormGroup;
  addDetailAndTopicForm: FormGroup;
  detailExists: boolean;
  topicExists: boolean;
  addDescription:boolean;
  unselectedStars:boolean;
  whoIsCalling:string;
  selectedTopicDescription:string;

  filteredTopics:Observable<any[]>;
  filteredTopics1:Observable<any[]>;
  topics:string[];
  canFillOneStar: boolean = true;

    
  ngOnInit() {
   

  }

  constructor(public dialog: MatDialog, 
              private service : TopicsToTeachService, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddDialogComponent>
             ) {
        this.topics = [""];
        this.localTopics = data.localTopics;
        this.detail = data.detail;
        this.collaboratorDemo = data.collaboratorDemo;
        this.windows = data.windows;
        this.detailExists = false;
        this.topicExists = false;
        this.addDescription = false;
        this.unselectedStars = true;
        this.topics = [];
        this.whoIsCalling = data.whoIsCalling;
        if(data.whoIsCalling === "/topicsToTeach"){
            this.canFillOneStar = false;
            this.detail.expertise = 0;
        }
        for(let value of data.localTopics){
            this.topics.push(value.name);
        }
        var topic = new FormControl(this.detail.topic, Validators.required);
        this.addDetailForm = new FormGroup({
            'topic': topic,
            'expertise': new FormControl("0",
                                            [Validators.required])
        });
        this.addDetailAndTopicForm = new FormGroup({
            'topic':new FormControl({value:this.detail.topic, disabled: true}, Validators.required),
            'expertise': new FormControl("0",
                                           [Validators.required]),
            'description': new FormControl(this.detail.description, Validators.required)
        });
        this.filteredTopics = this.addDetailForm.controls.topic.valueChanges
            .pipe(
            startWith(''),
            map(topic => topic ? this.filterTopics(topic) : this.topics.slice())
        );
       
  }
        
  
  setTopic(event){
    this.detail.topic = event.source.value;
    this.selectedTopicDescription = this.localTopics[this.topics.indexOf(this.detail.topic)].description;
    console.log("index: " + this.topics.indexOf(this.detail.topic) + " Element: " + this.localTopics[this.topics.indexOf(this.detail.topic)]);
  }

  selectStars(expertise:number){
    if(expertise === 0 && !this.canFillOneStar){
        return;
    }
    this.unselectedStars = false;
    this.detail.expertise = expertise;
  }

  searchTopic(name:string){
    var cnt = 0;
    for(let value of this.localTopics){
        if(value.name.toLowerCase() == name.toLowerCase()){
            return cnt;
        }
        cnt++;
    }
    return -1;
  }

  checkExistence(){
    if(this.whoIsCalling === "/topicsToTeach"){
        for(let value of this.collaboratorDemo.topicsToTeach){
            if(value.topic.name.toLowerCase() == this.detail.topic.toLowerCase()){
                this.detailExists = true;
                this.detail = new DetailFormTemplate();
                if(!this.canFillOneStar){
                    this.detail.expertise = 0;
                }
                this.unselectedStars = true;
                return true;
            }
        }
    }else{
        for(let value of this.collaboratorDemo.topicsToLearn){
            if(value.topic.name.toLowerCase() == this.detail.topic.toLowerCase()){
                this.detailExists = true;
                this.detail = new DetailFormTemplate();
                if(!this.canFillOneStar){
                    this.detail.expertise = 0;
                }
                this.unselectedStars = true;
                return true;
            }
        }
    }
      
    return false;
  }

  

  addDetail(){
    let detailA = new Detail();
    detailA.topic = new Topic();
    let cnt = this.searchTopic(this.detail.topic);
    
    if(this.checkExistence()){
        return;
    }

    if(cnt > -1){
       this.windows.createDetail = false;
       let aux = this.localTopics[cnt];
       detailA.topic.name = aux.name;
       detailA.topic.description = aux.description;
       detailA.topic.id = aux.id;
       detailA.expertise = this.detail.expertise;
       this.detail = new DetailFormTemplate();
       this.unselectedStars = true;
       this.selectedTopicDescription = "";
       this.service.addDetail(this.collaboratorDemo.id, detailA, this.whoIsCalling).subscribe(data => this.dialogRef.close(data));
              
       
    }else{
        this.addDescription = true;
        this.detailExists = false;
        this.windows.showDefaultCreateDetail = false;
        this.windows.createTopicAndDetail = true;
        return;
    }
  }

 
  addDetailAndTopic(){
    this.unselectedStars = true;
    let detailA = new Detail();
    detailA.topic = new Topic();
    detailA.topic.name = this.detail.topic;
    detailA.topic.description = this.detail.description;
    detailA.expertise = this.detail.expertise;
    this.windows.createTopicAndDetail = false;
    this.detail = new DetailFormTemplate();
    this.service.addDetail(this.collaboratorDemo.id, detailA, this.whoIsCalling).subscribe(data =>  this.dialogRef.close(data));
  }

  cancelTopicCreation(){
    this.windows.createTopicAndDetail = false;
    this.unselectedStars = true;
    this.windows.showDefaultCreateDetail = true;
    this.detail = new DetailFormTemplate();
    this.dialogRef.close("canceled");
  }

  resetForms(){
    this.windows.createTopic = false;
    this.cancelTopicCreation();

  }

  filterTopics(name: string) {
    return this.topics.filter(topic =>
      topic.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
