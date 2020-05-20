export interface IDevice {
  id?: number;
  name?: string;
}

export class Device implements IDevice {
  constructor(public id?: number, public name?: string) {}
}
