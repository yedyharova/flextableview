import { Store, StoreConfig, Query } from "@datorama/akita";
import { Injectable } from "@angular/core";

export class Series {
  id: string;
  name: string;
  premiere: string;
  genres: string[];
  network: string;
}

export interface SeriesState {
  series?: Series[];
  genres?: string[];
  networks?: string[];
}

export function createInitialState(): SeriesState {
  return {
    series: [],
    genres: [],
    networks: [],
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "data" })
export class SeriesStore extends Store<SeriesState> {
  constructor() {
    super(createInitialState());
  }
}

@Injectable({ providedIn: "root" })
export class SeriesQuery extends Query<SeriesState> {
  constructor(protected store: SeriesStore) {
    super(store);
  }
}
