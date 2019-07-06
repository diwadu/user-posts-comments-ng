import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector) {
     super(injector); 
  }

  ngOnInit() {
  }

}
