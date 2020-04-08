import { Store, StoreConfig, Query } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { ColMetaData, ColTypes } from "@common/colmetadata.decorator";
import { ModelBase } from "@common/ModelBase";
import { Col } from "@common/col.decorator";

export class Series extends ModelBase {
  constructor(s?: Series) {
    super();

    if (s) {
      this.id = s.id;
      this.name = s.name;
      this.network = s.network;
      this.premiere = s.premiere;
      this.season = s.season;
      this.genres = s.genres;
    }
  }

  id: string;

  @Col()
  @ColMetaData({ extensionInfo: "genres" })
  name: string;

  @Col()
  season: number;

  @Col()
  network: string;

  @Col()
  @ColMetaData({ colType: ColTypes.DATE, title: "Premiere day" })
  premiere: string;

  genres: string[];
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
