import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '.';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<AppState>) {}

  getStore(): Store<AppState> {
    return this.store;
  }
}
