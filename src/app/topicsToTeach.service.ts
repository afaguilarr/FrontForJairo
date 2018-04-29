import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TopicRequest } from './shared/topicRequest';

import { GlobalVariables } from './shared/globalVariables';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { Topic } from './shared/topic';
import { HttpHeaders } from '@angular/common/http';

import { Collaborator } from './shared/collaborator';
import { Detail } from './shared/detail';

@Injectable()
export class TopicsToTeachService {
  static httpOptions = {
                         headers: new HttpHeaders({
                            'Content-Type':  'application/json'
                            })
                        };

  constructor(private http: HttpClient) { } 

  //------------------------------Collaborator-------------------------------------------//
  
  static collaboratorURL = GlobalVariables.apiLocation + GlobalVariables.collaborators;

  getAllCollaborators(){
    return this.http.get<Collaborator[]>(TopicsToTeachService.collaboratorURL);
  }

  getCollaborator(id:string){
    return this.http.get<Collaborator>(TopicsToTeachService.collaboratorURL + "/" + id);    
  }

  getAllDetails(collaboratorId:string, details:string){
    return this.http.get<Detail[]>(TopicsToTeachService.collaboratorURL + "/" + 
                                    collaboratorId + "/" + details);
  }

  addDetail(collaboratorId:string, detail:Detail, details:string){
    let url = TopicsToTeachService.collaboratorURL + "/" + collaboratorId + details;
    return this.http.post<Detail[]>(url, JSON.stringify(detail), TopicsToTeachService.httpOptions);

  }

  deleteDetail(collaboratorId:string, topic:string, details:string){
    let url = TopicsToTeachService.collaboratorURL + "/" + collaboratorId  + 
                details + "/" + topic;
    return this.http.delete<Detail[]>(url, TopicsToTeachService.httpOptions);

  }

  //------------------------------Collaborator-------------------------------------------//
  //-----------------------------------Topics---------------------------------------------//   
  getAllTopics(){
    return this.http.get<TopicRequest[]>(GlobalVariables.apiLocation + GlobalVariables.topics);  
  }

  getTopic(name:string){
    return this.http.get<TopicRequest[]>(GlobalVariables.apiLocation + GlobalVariables.topics + 
                                            GlobalVariables.findByName + name);

  }

  deleteTopic(name :string){
    name = GlobalVariables.apiLocation + GlobalVariables.topics + "/" + name;
    return this.http.delete(name, TopicsToTeachService.httpOptions);
  }

  createTopic(topic: Topic){
     return this.http.post<Topic>(GlobalVariables.apiLocation + GlobalVariables.topics, 
                                    JSON.stringify(topic), TopicsToTeachService.httpOptions);

  }

  update(topic: Topic){
     return this.http.put<Topic>(GlobalVariables.apiLocation + GlobalVariables.topics, 
                                    JSON.stringify(topic), TopicsToTeachService.httpOptions);

  }

  //---------------------------------------Topics-------------------------------------------------//

  
}
