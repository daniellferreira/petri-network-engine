export class Transicao {
  id: number
  status: boolean = false

  constructor(id: number) {
    this.id = id
  }

  public getId(): number {
    return this.id
  }

  public getStatus(): boolean {
    return this.status
  }

  public setStatus(status: boolean) {
    this.status = status
  }
  
  public toString(): string {
    return 'Transição ' + this.getId() + ' possui o status ' + this.getStatus()
  }
}
