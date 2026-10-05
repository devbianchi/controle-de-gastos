import { CATEGORIAS } from './tipos.js';
import type { CategoriaDespesa, Despesa } from './tipos.js';

export function descricaoCategoria(categoria: CategoriaDespesa): string {
  switch (categoria) {
    case 'alimentação':
      return 'Alimentação';
    case 'transporte':
      return 'Transporte';
    case 'lazer':
      return 'Lazer';
    case 'moradia':
      return 'Moradia';
    default:
      return 'Categoria desconhecida';
  }
}

export function matrizCategoriaMes(despesas: Despesa[]): number[][] {
  const matriz: number[][] = [];

  for (let indiceCategoria = 0; indiceCategoria < CATEGORIAS.length; indiceCategoria += 1) {
    const linha: number[] = [];
    for (let indiceMes = 0; indiceMes < 12; indiceMes += 1) {
      linha.push(0);
    }
    matriz.push(linha);
  }

  for (let indiceCategoria = 0; indiceCategoria < CATEGORIAS.length; indiceCategoria += 1) {
    const categoria = CATEGORIAS[indiceCategoria];
    const linha = matriz[indiceCategoria];
    if (!categoria || !linha) continue;

    for (let indiceDespesa = 0; indiceDespesa < despesas.length; indiceDespesa += 1) {
      const despesa = despesas[indiceDespesa];
      if (despesa?.categoria === categoria) {
        const indiceMes = despesa.mes - 1;
        linha[indiceMes] = (linha[indiceMes] ?? 0) + despesa.valor;
      }
    }
  }

  return matriz;
}

export function formatarRelatorio(despesas: Despesa[]): string {
  const matriz = matrizCategoriaMes(despesas);
  const totais: number[] = [];
  let totalGeral = 0;
  let larguraCategoria = 'CATEGORIA'.length;
  let larguraTotal = 'TOTAL ANUAL'.length;

  for (let indiceCategoria = 0; indiceCategoria < CATEGORIAS.length; indiceCategoria += 1) {
    const categoria = CATEGORIAS[indiceCategoria];
    const linha = matriz[indiceCategoria] ?? [];
    let totalCategoria = 0;

    for (let indiceMes = 0; indiceMes < 12; indiceMes += 1) {
      totalCategoria += linha[indiceMes] ?? 0;
    }

    totais.push(totalCategoria);
    totalGeral += totalCategoria;

    if (categoria) {
      const tamanhoCategoria = descricaoCategoria(categoria).length;
      if (tamanhoCategoria > larguraCategoria) larguraCategoria = tamanhoCategoria;
    }

    const tamanhoTotal = totalCategoria.toFixed(2).length;
    if (tamanhoTotal > larguraTotal) larguraTotal = tamanhoTotal;
  }

  const tamanhoTotalGeral = totalGeral.toFixed(2).length;
  if (tamanhoTotalGeral > larguraTotal) larguraTotal = tamanhoTotalGeral;

  const linhas: string[] = [
    'RELATÓRIO DE DESPESAS'.toUpperCase(),
    `${'CATEGORIA'.padEnd(larguraCategoria)}  ${'TOTAL ANUAL'.padStart(larguraTotal)}`,
    '-'.repeat(larguraCategoria + larguraTotal + 2)
  ];

  for (let indiceCategoria = 0; indiceCategoria < CATEGORIAS.length; indiceCategoria += 1) {
    const categoria = CATEGORIAS[indiceCategoria];
    const totalCategoria = totais[indiceCategoria] ?? 0;
    if (!categoria) continue;

    linhas.push(
      `${descricaoCategoria(categoria).padEnd(larguraCategoria)}  ${totalCategoria
        .toFixed(2)
        .padStart(larguraTotal)}`
    );
  }

  linhas.push(
    `${'TOTAL GERAL'.padEnd(larguraCategoria)}  ${totalGeral.toFixed(2).padStart(larguraTotal)}`
  );

  let maiorDespesa: Despesa | undefined;
  for (let indiceDespesa = 0; indiceDespesa < despesas.length; indiceDespesa += 1) {
    const despesa = despesas[indiceDespesa];
    if (despesa && (!maiorDespesa || despesa.valor > maiorDespesa.valor)) {
      maiorDespesa = despesa;
    }
  }

  if (maiorDespesa) {
    linhas.push(`MAIOR DESPESA: ${maiorDespesa.descricao} - ${maiorDespesa.valor.toFixed(2)}`);
  } else {
    linhas.push('MAIOR DESPESA: Nenhuma');
  }

  return linhas.join('\n');
}
