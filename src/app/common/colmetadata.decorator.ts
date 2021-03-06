import { DatePipe } from "@angular/common";

export enum ColTypes {
  STRING = "string",
  DATE = "date",
  NUMBER = "number",
}

export enum FilterTypes {
  STRING = "string",
  DROPDOWN = "dropdown",
  YEAR = "year",
}

function setMetaData(
  target: any,
  propertyKey: string,
  colType?: ColTypes,
  title?: string,
  extensionInfo?: string,
  filterType?: FilterTypes
) {
  const fieldsMetaDataObj: ColsMetaData = {};
  fieldsMetaDataObj.title = title || propertyKey.toLocaleUpperCase();
  fieldsMetaDataObj.extensionInfo = extensionInfo;
  fieldsMetaDataObj.filterType = filterType;
  switch (colType) {
    case ColTypes.DATE:
      fieldsMetaDataObj.pipe = new DatePipe("en-us");
      break;
  }

  const fieldsMetaDataMap = fieldsMetaData.get(target.constructor);
  if (!fieldsMetaDataMap) {
    const propertyMap: Map<string, ColsMetaData> = new Map();
    propertyMap.set(propertyKey, fieldsMetaDataObj);
    fieldsMetaData.set(target.constructor, propertyMap);
  } else {
    fieldsMetaDataMap.set(propertyKey, fieldsMetaDataObj);
  }
  colsWithMetadata.push(propertyKey);
}

export const ColMetaData = (colsDescription: ColsDescription) => (
  target: any,
  propertyKey: string
) => {
  setMetaData(
    target,
    propertyKey,
    colsDescription.colType,
    colsDescription.title,
    colsDescription.extensionInfo,
    colsDescription.filterType
  );
};

export interface ColsMetaData {
  title?: string;
  pipe?: any;
  extensionInfo?: string;
  filterType?: FilterTypes;
}

interface ColsDescription {
  colType?: ColTypes;
  title?: string;
  extensionInfo?: string;
  filterType?: FilterTypes;
}

export const fieldsMetaData: Map<any, Map<string, ColsMetaData>> = new Map();
export const colsWithMetadata: string[] = [];
