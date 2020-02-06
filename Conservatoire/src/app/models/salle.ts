import {AIdentifiable} from '../abstract/aidentifiable';

export class Salle extends AIdentifiable {

  constructor(name: string, size: number) {
    super();
    this.name = name;
    this.size = size;
  }

  name: string;
  size: number;
}
