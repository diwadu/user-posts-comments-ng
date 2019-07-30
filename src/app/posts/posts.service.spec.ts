import { TestBed } from "@angular/core/testing";

import { PostsService } from "./posts.service";
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UserModel } from '../common/models/user.model';
//import 'jasmine'

let service: PostsService;
let httpTestingController: HttpTestingController;
describe("PostsService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(async () => {
    service = TestBed.get(PostsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("GetUsers should map server response to UserModel array", () => {
    spyOn(service, 'getUsers').and.callThrough();
    service.getUsers().subscribe((users: UserModel[]) => {
      const user = users[0];
      expect(user.name).toEqual("John Doe");
      expect(user).toEqual(jasmine.objectContaining({
        id: 1,
        name: "John Doe"
      }));
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users`);

    expect(req.request.method).toEqual('GET');

    req.flush([{
      "id": 1,
      "name": "John Doe",

    }]);


  });

  afterEach(() => {
    httpTestingController.verify();
  });

});

