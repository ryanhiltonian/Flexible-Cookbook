export class Ingred {
  constructor(
    public name: string,
    public uom: string,
    public quantity: number
  ) { }
}

export class Instruction {
  constructor(
    public text: string
  ) { }
}

export class Todo {
  constructor(
    public title: string,
    public description: string
  ) { }
}