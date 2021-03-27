## Infomrações sobre as classes:

lugar     = circulo
conexao   = linha
transicao = retangulo
token     = marca

Pendente em metodos existentes

* Ao deletar transicao, deletar conexoes vinculadas a ele tambem
* Ao deletar Lugar, deletar conexoes vinculadas a ele tambem



## Criando/editando a geometria da rede
[ok-void]• boolean criaLugar(int id) // id e’ a identificação do lugar ou transição
[ok]• Lugar getLugar(int id)
[ok-void]• boolean removeLugar(int id)
[ok-void]• boolean criaTransicao(int id)
[ok]• Transicao getTransicao(int id)
[ok-void]• boolean removeTransicao(int id)
[ok-void]• boolean criaConexao(Lugar lugar, Transicao transicao, int peso, boolean ehEntrada, boolean ehArcoInibidor, boolean ehArcoReset)
[ok-void]• boolean removeConexao(Lugar lugar, Transicao transicao)
[ok]• Lugar getLugarDeConexao(Conexao conexao)
[ok]• Transicao getTransicaoDeConexao(Conexao conexao)
[ok]• Conexao[] getConexoesEntrada(int id) // retorna array de conexões de entrada de uma transição
[ok]• Conexao[] getConexoesSaida(int id) // retorna array de conexões de saida de uma transição

## Alterando/inspecionando a rede
[ok]• void insereTokenEmLugar(Token token, Lugar lugar)
[ok-void]• boolean removeTokenDeLugar(Token token, Lugar lugar)
[ok]• void clearLugar(Lugar lugar) // remove todos tokens do lugar
[ok-nao utilizada]• Token getToken(Lugar lugar) //retorna token
[ok]• Token[] getToken(Lugar lugar) //retorna um array de tokens
[ok]• int quantosTokens(int id) //retorna a quantidade de tokens de um lugar com este id
[ok-igual a isTransicaoAtiva]• boolean getStatusTransicao (int id) // retona True se Transição habilitada e False caso contrário;
[ok]• void setTransicaoInativa(int id) // seta transicao como inativa
[ok]• void setTransicaoAtiva(int id) // seta transicao como ativa (default)
[ok-igual a getStatusTransicao]• boolean isTransicaoAtiva(int id)

• boolean salvaRede (String nomeArquivo)
• Rede carregaRede (String nomeArquivo) métodos opcionais

## Simulando/executando/conversando com o ambiente externo
• void executaCiclo(), varre toda a rede, identificando todas transições habilitadas e executando cada uma
destas transições habilitadas; a movimentação de tokens e o disparo de transições podem acarretar a chamada
de métodos de callback para a camada de visualização/interação.
• boolean insereCallbackTokenEntrandoLugar(Lugar lugar, ponteiroPara Método/Função, Token token): método
da aplicação é invocado (enviando token como argumento) se um token é inserido em um lugar;
• boolean insereCallbackTokenSaindoLugar(Lugar lugar, ponteiroPara Método/Função, Token token): método da
aplicação é invocado (enviando token como argumento) se token é removido de um lugar;
• boolean insereCallbackTransicao(Transicao transicao, ponteiroPara Método/Função) método da aplicação é
invocado se transição é disparada.