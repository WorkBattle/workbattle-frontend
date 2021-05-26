import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContestModalComponent } from './create-contest-modal.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../../../lib/service/user.service';

describe('CreateContestComponent', () => {
  let component: CreateContestModalComponent;
  let fixture: ComponentFixture<CreateContestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, FormBuilder],
      declarations: [CreateContestModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
