export interface Todo {
  id: number;
  label: string;
  done: boolean;
}

export function isATodo(value: any): value is Todo {
  if(typeof value !== 'object') {
      return false;
  }
  // check the property exists by "in" operator
  if('id' in value === false) {
      return false;
  }
  if(typeof value.id !== 'number') {
      return false;
  }
  if('label' in value === false) {
      return false;
  }
  if(typeof value.label !== 'string') {
      return false;
  }
  if('done' in value === false) {
      return false;
  }
  if(typeof value.done !== 'boolean') {
      return false;
  }
  return true;
}