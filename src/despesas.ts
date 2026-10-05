import type { Despesa } from './tipos.js';

export function adicionarDespesa(despesas: Despesa[], nova: Despesa): Despesa[] {
  if (!(nova.valor > 0)) {
    throw new Error('O valor da despesa deve ser maior que zero.');
  }

  if (!Number.isInteger(nova.mes) || nova.mes < 1 || nova.mes > 12) {
    throw new Error('O mês da despesa deve estar entre 1 e 12.');
  }

  // O spread cria uma nova lista e preserva o array recebido sem efeitos colaterais.
  return [...despesas, nova];
}

export function removerDespesa(despesas: Despesa[], id: Despesa['id']): Despesa[] {
  return despesas.filter((despesa) => despesa.id !== id);
}

export function despesasDaCategoria(
  despesas: Despesa[],
  categoria: Despesa['categoria']
): Despesa[] {
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export function totalGasto(despesas: Despesa[]): number {
  return despesas.reduce((total, despesa) => total + despesa.valor, 0);
}

export function maiorDespesa(despesas: Despesa[]): Despesa | undefined {
  return despesas.reduce<Despesa | undefined>(
    (maior, despesa) => (!maior || despesa.valor > maior.valor ? despesa : maior),
    undefined
  );
}
