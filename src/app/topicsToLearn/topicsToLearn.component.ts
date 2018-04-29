import { Component, OnInit, ViewChild, Inject} from '@angular/core';

import { TopicsToTeachService } from '../topicsToTeach.service';

import { TopicRequest } from '../shared/topicRequest';
import { Topic } from '../shared/topic';

import { Window } from '../shared/windows';

import { Collaborator } from '../shared/collaborator';
import { DetailTable } from '../shared/detailTable';
import { Detail } from '../shared/detail';
import { DetailFormTemplate } from '../shared/detailFormTemplate';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { MatDialog } from '@angular/material';

import { AddDialogComponent } from '../Dialog/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../Dialog/delete-dialog/delete-dialog.component';
import { ConfirmDialogComponent } from '../Dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topicsToLearn.component.html',
  styleUrls: ['./topicsToLearn.component.css']
})
export class TopicsToLearnComponent implements OnInit {
  serviceName = "/topicsToLearn";
  tRequest: TopicRequest[];
  localTopics = [];
  topic:Topic;
  detail: DetailFormTemplate;
  windows : Window;
  collaborators: Collaborator[];

  //Material-Table
  displayedColumns = ['name', 'description', 'delete', 'Edit'];
  dataSource: MatTableDataSource<Topic>;

  expertiseOptions = ["1", "2", "3"];

  displayedColumsCollaborator = ['name', 'description', 'expertise', 'Date of Creation', "link",  'delete'];
  dataSourceCollaborator: MatTableDataSource<DetailTable>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //Material-Table

  paginatorLength: number;
  paginatorIndex = 1;
  collaboratorDemo: Collaborator; //Demo only!!!!


  constructor(private service : TopicsToTeachService,
              private modalDialog: MatDialog) {
    this.topic = new Topic();
    this.detail = new DetailFormTemplate();
    }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.localTopics);
    this.dataSourceCollaborator = new MatTableDataSource<DetailTable>();
    this.getAllTopics(); 
    this.getAllCollaborators();
    this.windows = new Window();
  }


  loadPaginatorData(event){
    this.paginatorLength = this.dataSourceCollaborator.data.length;
    this.dataSourceCollaborator.paginator = this.paginator;
    this.paginatorIndex = 1;
  }

  

  //--------------------------mock Collaborator-------------------------------//
 
  
  addDetailDialog(){
    const modalRef = this.modalDialog.open(AddDialogComponent, {
        width: '235px',
        data: { whoIsCalling: this.serviceName, localTopics: this.localTopics, detail:new DetailFormTemplate(), collaboratorDemo: this.collaboratorDemo, windows: this.windows }
    });
    modalRef.afterClosed().subscribe(result => {
      if(result === "canceled" || result === undefined){
        return;
      }
      this.windows.showDefaultCreateDetail = true;
      this.getAllTopics();
      this.initializeDetails(result);
    });
  }
  
  
  
 deleteDetail(name:string){
    const modalRef = this.modalDialog.open(DeleteDialogComponent, {
        width: 'auto',
    });
    modalRef.afterClosed().subscribe(result => {
      if(!result || result === undefined){
        return;
      }else{
        for(let value of this.collaboratorDemo.topicsToLearn){
            if(name == value.topic.name){
                this.service.deleteDetail(this.collaboratorDemo.id, value.topic.id, this.serviceName)
                    .subscribe(data => this.getAllDetails(this.collaboratorDemo.id));
                break;
            }
        }     
      }
    });
    

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

  showCollaboratorDemo(){
    this.resetForms();
  }

  updateEditWindow(name:string){
    this.detail.topic = name;
  }

resetForms(){
    this.windows.createTopic = false;

  }


  updateDetail(id:number, expertise:number){
    let topic = new Topic();
    topic.name = this.dataSourceCollaborator.data[id].topic;
    topic.description = this.dataSourceCollaborator.data[id].description;
    topic.id =  this.dataSourceCollaborator.data[id].db_id;
    let detail = new Detail();
    detail.topic = topic;
    detail.expertise = expertise;
    const modalRef = this.modalDialog.open(ConfirmDialogComponent, {
      width: 'auto',
    });
    return modalRef.afterClosed().subscribe(result => {
          if(!result || result === undefined){
            return;
          }else{
            this.dataSourceCollaborator.data[id].expertise = expertise;
            this.service.addDetail(this.collaboratorDemo.id, detail, this.serviceName).subscribe(data => console.log("correct"));
          }
        });
      
  } 
  //---------------------------Topic Related Mock----------------------------------//  

  showTopicDemo(){
    this.getAllTopics();
    this.windows.collaboratorDemo = false;
    this.windows.topicDemo = true;
    this.resetForms();
  }
  
  searchDetail(name:string, description){
    for (let value of this.collaboratorDemo.topicsToLearn){
        if(value.topic.name == name){
            let exp = value;
            exp.topic.description = description;
            this.service.addDetail(this.collaboratorDemo.id, exp, this.serviceName)
                .subscribe(data => this.getAllDetails(this.collaboratorDemo.id));
        }
    }
  }

  

  ngAfterViewInit() {
    this.dataSourceCollaborator.paginator = this.paginator;
    this.dataSourceCollaborator.sort = this.sort;
  }

  applyFilterC(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceCollaborator.filter = filterValue;
  }

  addTopicWindow(){
    this.windows.createTopic = !this.windows.createTopic;
  }

  updateTopicWindow(name:string){
    this.topic.name = name;
    this.windows.updateTopic = !this.windows.updateTopic;
  }
  //-----------------------------------Topic Related---------------------------------------------//

  
  
/* BackEnd*/ 
  //---------------------------Topic Related----------------------------------// 

  getAllTopics(){
    return this.service.getAllTopics().subscribe(data => this.listTopics(data));
  }

  listTopics(data){
    this.tRequest = { ...data };
    this.localTopics = [];
    for (let value of Object.values(this.tRequest)){
        this.localTopics.push({name:value.name, description:value.description, id:value.id});
    }
    this.dataSource.data = this.localTopics;
  }

  searchTopicByName(name: string){
    for(let value of Object.values(this.tRequest)){
        if(value.name == name){
            return value.id;
        }
    }
  }


  //---------------------------Collaborator-----------------------------------//

  fillCollaborators(data: Collaborator[]){
    this.collaborators = { ...data };
    this.collaboratorDemo = this.collaborators[0];
    this.initializeDetails(this.collaboratorDemo.topicsToLearn);
  }

  getAllCollaborators(){
    return this.service.getAllCollaborators().subscribe(data => this.fillCollaborators(data));
  }
  getAllDetails(collaboratorId:string){
    this.service.getAllDetails(collaboratorId, this.serviceName)
        .subscribe(data => this.initializeDetails(data));
  }

  initializeDetails(data:Detail[]){
    this.collaboratorDemo.topicsToLearn=data;
    let cnt = 0;
    let array = [];
    for(let i = 0; i < data.length; i++){
        let addedAt = "";
        if(data[i].addedAt){
            addedAt = data[i].addedAt.split(" ", 1);
        }else{
            addedAt = data[i].topic.createdAt[1];
        }
        
        array.push(new DetailTable(i, data[i], addedAt, data[i].expertise));

    }
    this.dataSourceCollaborator = new MatTableDataSource(array);
    this.dataSourceCollaborator.paginator = this.paginator;
    this.windows.isColDemoInit = true;
  }

  //---------------------------Collaborator-----------------------------------//

}
