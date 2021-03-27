import { RedePetri } from './redeDePetri'

console.log('Bem vindo à Rede de Petris em TypeScript! :)')

const rede = new RedePetri()

const prompt = require('prompt-sync')({ sigint: true })

const qtdLugares: number = Number(prompt('Quantos Lugares: '))

// instancia todos os lugares
for (let i = 1; i <= qtdLugares; i++) {
  rede.criaLugar(i)
}

const qtdTransicoes: number = Number(prompt('Quantas transições: '))

// instancia todas as transicoes pra cada lugar
for (let i = 1; i <= qtdTransicoes; i++) {
  const lugarEntradaSaidaTransicao: string = prompt(
    `Quais são os lugares de entrada e saída de T${i}? `
  )
  const lugarEntrada: number = Number(lugarEntradaSaidaTransicao.split(',')[0])
  const lugarSaida: number = Number(lugarEntradaSaidaTransicao.split(',')[1])

  rede.criaTransicao(i)

  rede.criaConexao(
    rede.getLugar(lugarEntrada),
    rede.getTransicao(i),
    1,
    true,
    false,
    false
  ) //conecta lugar de entrada
  rede.criaConexao(
    rede.getLugar(lugarSaida),
    rede.getTransicao(i),
    1,
    false,
    false,
    false
  ) //conecta lugar de saida
}

// ver marcas pra cada lugar
for (let i = 1; i <= qtdLugares; i++) {
  const qtdTokens: number = Number(prompt(`Quantas marcas em L${i}? `))

  rede.insereTokenEmLugar(qtdTokens, rede.getLugar(i))
}
