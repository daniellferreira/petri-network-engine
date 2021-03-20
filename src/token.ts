export class Token {
  id: number

  constructor(id: number) {
    this.id = id
  }

  public getId(): number {
    return this.id
  }
}
