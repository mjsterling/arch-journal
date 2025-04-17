import { Material } from './Material';

export class Artefact {
  state = {
    notFound: 0,
    damaged: 0,
    restored: 0,
    completed: 0,
  };

  constructor(
    public name: string,
    public image: string,
    public level: number,
    public digsite: string // public restorationCost: { //   [P in Material['name']]: number;
  ) // },
  // public collectionIds: string[]
  {}
}
