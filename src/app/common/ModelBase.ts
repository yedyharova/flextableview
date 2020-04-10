import {
  fieldsMetaData,
  ColsMetaData,
  colsWithMetadata,
} from "./colmetadata.decorator";
import { cols } from "./col.decorator";

export class ModelBase {
  metaDataMap: Map<string, ColsMetaData>;

  get ownProperties(): string[] {
    return cols.get(this.constructor);
  }

  get colsWithMetadata(): string[] {
    return colsWithMetadata;
  }

  constructor() {
    this.metaDataMap = fieldsMetaData.get(this.constructor);
  }

  getFormattedValue(propertyKey: string): any {
    const colPipe = this._getPipe(propertyKey);
    let formattedValue = this[propertyKey];
    try {
      if (colPipe) {
        formattedValue = colPipe.transform(this[propertyKey]);
      }
    } catch (exception) {
      console.error("wrong transformation for", this[propertyKey]);
    }
    return formattedValue;
  }

  getTitle(propertyKey: string): string {
    const metaData = this.metaDataMap?.get(propertyKey);
    return metaData?.title || propertyKey.toLocaleUpperCase();
  }

  getExtensionInfo(propertyKey: string): string {
    const metaData = this.metaDataMap?.get(propertyKey);
    const extensionInfo = metaData?.extensionInfo;
    return extensionInfo && this.getFormattedValue(extensionInfo);
  }

  getFilterType(propertyKey: string): string {
    const metaData = this.metaDataMap?.get(propertyKey);
    return metaData?.filterType;
  }

  private _getPipe(propertyKey: string): any {
    const metaData = this.metaDataMap.get(propertyKey);
    return metaData?.pipe;
  }
}
