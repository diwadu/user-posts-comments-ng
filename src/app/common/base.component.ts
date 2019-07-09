import { Component, OnInit, Injector } from '@angular/core';

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

  protected getTotalPostsCount() {
    if (localStorage.getItem("totalPostsCount") === null) {
      throw new Error("No total count in local storage!");
    }
    return parseInt(localStorage.getItem("totalPostsCount"));
  }

}
