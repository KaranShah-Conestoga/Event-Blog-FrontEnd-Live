
import { Http } from './HttpService';


export class MyModelEntity {

  id: string | number;

  constructor(data?: Partial<any>) {
    if (data) {
      this.id = data._id || 0;
      // this.objectAssign(this, data);
    }
  }

  protected objectAssign<T extends Object>(obj: T, data: object) {
    const properties = Object.keys(data);
    properties.forEach((property) => {
      const desc =
        Object.getOwnPropertyDescriptor(obj, property)
        || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), property)
        || {};
      if (desc.writable && data[property] !== undefined) {
        obj[property] = data[property];
      }
    });
  }

}
