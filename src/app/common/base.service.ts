import { Injector } from '@angular/core';

export abstract class BaseService {
    constructor(injector: Injector) {
    }

    protected createPagingQuery(start: number, limit: number): string {
        return `_start=${start}&_limit=${limit}`;
    }
}