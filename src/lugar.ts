export class Lugar {
  id: number
  tokens: number

  constructor(id: number) {
    this.id = id
    this.tokens = 0
  }

  public insereToken(qtdTokens: number) {
    this.tokens += qtdTokens
  }

  public removeToken(qtdTokens: number) {
    if (this.tokens >= qtdTokens) {
      this.tokens -= qtdTokens
    } else {
      console.log(
        `removeToken: Quantidade de tokens é insuficiente , no lugar com ID ${this.getId()}`
      )
    }
  }

  public clear() {
    this.tokens = 0
  }

  public getTokens(): number {
    return this.tokens
  }

  public getId(): number {
    return this.id
  }
}
