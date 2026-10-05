# controle-de-gastos

Aplicação TypeScript para registrar despesas e gerar um relatório anual por categoria.

## Instalação, testes e execução

Instale as dependências:

```sh
npm install
```

Execute os testes automatizados:

```sh
npm test
```

Rode o programa em modo de observação, que reinicia ao detectar alterações:

```sh
npm run dev
```

Para executar uma única vez, sem modo de observação:

```sh
npx tsx src/index.ts
```

## Arquivos de configuração

- `package.json`: define metadados e dependências do projeto, além dos comandos `dev` e `test`.
- `tsconfig.json`: configura a compilação e a checagem estrita de tipos do TypeScript.
- `.gitignore`: exclui `node_modules/` e `dist/` do controle de versão.
- Vitest: não há arquivo de configuração dedicado; `npm test` executa `vitest run` com os padrões da ferramenta.

## Registro de uso de IA

A IA foi usada como apoio à implementação dos testes; cada função abaixo tem cobertura na suíte Vitest.

| Função | Arquivo | Implementação |
| --- | --- | --- |
| `adicionarDespesa` | `src/despesas.ts` | Valida valor e mês e retorna uma nova lista com a despesa. |
| `removerDespesa` | `src/despesas.ts` | Retorna uma nova lista sem o identificador informado. |
| `despesasDaCategoria` | `src/despesas.ts` | Filtra despesas por categoria. |
| `totalGasto` | `src/despesas.ts` | Soma os valores das despesas. |
| `maiorDespesa` | `src/despesas.ts` | Retorna a despesa de maior valor ou `undefined` se a lista estiver vazia. |
| `descricaoCategoria` | `src/relatorio.ts` | Converte cada categoria em seu nome de exibição usando `switch`. |
| `matrizCategoriaMes` | `src/relatorio.ts` | Agrupa os valores em linhas de categorias e colunas de meses usando laços. |
| `formatarRelatorio` | `src/relatorio.ts` | Gera a tabela de totais anuais, o total geral e a maior despesa. |

## Reflexão

- O ponto de partida do repositório mantinha a função de adicionar dentro do arquivo de teste; movi o código de produção para `despesas.ts` e mantive os testes importando o módulo.
- A conversão do mês de 1 a 12 que a IA colocou para o índice de coluna poderia deslocar os valores; acrescentei um teste que confere os meses 1, 3 e 12 nas colunas 0, 2 e 11.
- Também acrescentei um teste de lista vazia para garantir que as quatro categorias produzam doze células zeradas.
- Na formatação do relatório, as primeiras expectativas de espaços falharam porque a largura das colunas é calculada dinamicamente.
- Ajustei os testes para conferir rótulos, valores e alinhamento decimal em vez de exigir uma quantidade fixa de espaços como estava antes pela IA.
- A execução final foi conferida com a suíte Vitest e com a checagem de tipos do TypeScript.
