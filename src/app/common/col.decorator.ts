function registerColumn(target: any, propertyKey: string) {
  let columns: string[] = cols.get(target.constructor);
  if (!columns) {
    cols.set(target.constructor, []);
    columns = cols.get(target.constructor);
  }

  cols.set(target.constructor, columns.concat([propertyKey]));
}

export const Col = () => (target: any, propertyKey: string) => {
  registerColumn(target, propertyKey);
};

export const cols: Map<any, string[]> = new Map();
