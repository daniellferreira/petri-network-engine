export class Lugar {
  id: number
  tokens: number

  constructor(id: number) {
    this.id = id
    this.tokens = 0
  }

  public insereToken(qtdTokens: number) {
    this.tokens += qtdTokens
    console.log(`Adicionado ${qtdTokens} token(s) no L${this.getId()}`)
  }

  public removeToken(qtdTokens: number) {
    if (this.tokens >= qtdTokens) {
      this.tokens -= qtdTokens
      console.log(`Removido ${qtdTokens} token(s) do L${this.getId()}`)
    } else {
      console.log(
        `removeToken: Quantidade de tokens é insuficiente , no L${this.getId()}`
      )
    }
  }

  public clear() {
    this.tokens = 0
    console.log(`Resetado todos token(s) do L${this.getId()}`)
  }

  public getTokens(): number {
    return this.tokens
  }

  public getId(): number {
    return this.id
  }

  public toString(): string {
    return 'Lugar ' + this.getId() + ' possui ' + this.getTokens() + ' tokens'
  }
}
