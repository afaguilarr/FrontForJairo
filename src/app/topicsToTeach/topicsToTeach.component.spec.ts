import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalVariables } from '../shared/globalVariables';
import { TopicsToTeachComponent } from './topicsToTeach.component';
import { TopicsToTeachService } from '../topicsToTeach.service';
import { Collaborator } from '../shared/collaborator';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../routes.module';
import { FormsModule } from '@angular/forms';
import { TopicsModule } from '../topics.module';
import { Topic } from '../shared/topic';
import { Detail } from '../shared/detail';
import { HttpClientModule } from '@angular/common/http';


describe('TopicsToTeachComponent', () => {
  let component: TopicsToTeachComponent;
  let fixture: ComponentFixture<TopicsToTeachComponent>;
  let collaboratorURL = GlobalVariables.apiLocation + GlobalVariables.collaborators;

  //service testing
  let service: TopicsToTeachService; 
  let collaborator: Collaborator;
  let serviceName = "/topicsToTeach";

  beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ 
            RouterTestingModule,
            FormsModule,
            TopicsModule
          ],
          declarations: [ ],
          providers: [ 
            TopicsToTeachService 
          ]
        })
        .compileComponents();
        //testing getAllCollaborators
        service = TestBed.get(TopicsToTeachService);  
  }));

  it('should create the component', () => {
    fixture = TestBed.createComponent(TopicsToTeachComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
 
  it('the array "topicsToTeach" must not be undefined',()=>{ 
        service.getAllCollaborators().subscribe(values => 
                    values.forEach(function(value){
                        if(value.name === "Luis"){
                            collaborator = value;
                            expect(value).toBeDefined();
                        }
                    })
        );
  });
  
});

describe('TopicsToTeachService', () => {
  let component: TopicsToTeachComponent;
  let fixture: ComponentFixture<TopicsToTeachComponent>;
  let collaboratorURL = GlobalVariables.apiLocation + GlobalVariables.collaborators;
  let boolAddition = false;
  let boolDeletion = false;

  //service testing
  let service: TopicsToTeachService; 
  let collaborator: Collaborator;
  let serviceName = "/topicsToTeach";

  beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ 
            RouterTestingModule,
            FormsModule,
            TopicsModule
          ],
          declarations: [ ],
          providers: [ 
            TopicsToTeachService 
          ]
        })
        .compileComponents();
        //testing getAllCollaborators
        service = TestBed.get(TopicsToTeachService);
        service.getAllCollaborators().subscribe(values => 
                    values.forEach(function(value){
                        if(value.name === "Luis"){
                            collaborator = value;
                            
                            let topic = new Topic();
                            topic.name = "C++";
                            topic.description = "topic created from a unit test";
                            let detail = new Detail(topic);
                            detail.expertise = 2;
                            //testing addition
                            service.addDetail(collaborator.id, detail, serviceName).subscribe(function(values){
                                for(let value of values){
                                    if(value.topic.name === detail.topic.name && 
                                       value.expertise === 2   &&
                                       value.topic.description === detail.topic.description){
                                        boolAddition = true;

                                        //testing deletion of C++ after its the addition
                                        service.deleteDetail(collaborator.id, value.topic.id, serviceName)
                                            .subscribe(function(data){
                                                let control = true;
                                                for(let val of data){
                                                    if(val.topic.name === "C++"){
                                                        control = false;
                                                    }
                                                }
                                                if(control){
                                                    boolDeletion = control;                                
                                                }
                                                return;
                                            });
                                        return;
                                    }   
                                }
                            }); 
                            
                            return;
                        }
                    })
        );
        
  }));
 
  

  it('each detail should have its creation date', ()=> {
        collaborator.topicsToTeach.forEach(value =>
            expect(value.addedAt).toBeDefined());
  });

  it('adding a new detail should affect topicsToTeach', ()=> {
        expect(boolAddition).toBeTruthy();      
  }); 

  it('deleting a detail should affect topicsToTeach ', ()=> {
        expect(boolDeletion).toBeTruthy();
  });

  
});





