import { Component, OnInit, Injector } from '@angular/core';

@Component({
})
export class BaseComponent implements OnInit {

  /**
   * Sometimes we don't want do DI directly to avoid boilerplate 
   * in class hierachy and inheritance, therefore inejctor 
   * accessible in base class in order apply Service Locator pattern
   * @param injector 
   */
  constructor(injector: Injector) { }

  ngOnInit() {
  }
  //@ngtools/webpack/src/index.js

}
