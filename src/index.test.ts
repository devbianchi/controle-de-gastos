import { describe, it, expect } from 'vitest';
import {
  adicionarDespesa,
  despesasDaCategoria,
  maiorDespesa,
  removerDespesa,
  totalGasto
} from './despesas.js';
import type { Despesa } from './tipos.js';

describe('adicionarDespesa', () => {
  const despesaBase: Despesa = {
    id: 1,
    descricao: 'Almoço',
    valor: 35.5,
    categoria: 'alimentação',
    mes: 3
  };

  // CASO NORMAL
  it('deve adicionar uma despesa válida e retornar um novo array', () => {
    const listaOriginal: Despesa[] = [];
    const resultado = adicionarDespesa(listaOriginal, despesaBase);

    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toEqual(despesaBase);
    expect(resultado).not.toBe(listaOriginal);
  });

  // CASO DE BORDA (Imutabilidade)
  it('não deve modificar o array original recebido por parâmetro', () => {
    const listaOriginal: Despesa[] = [];
    adicionarDespesa(listaOriginal, despesaBase);

    expect(listaOriginal).toHaveLength(0);
  });

  // CASOS DE BORDA (Validação de Valor)
  it('deve lançar erro se o valor da despesa for zero ou menor', () => {
    const despesaInvalidaZero: Despesa = { ...despesaBase, valor: 0 };
    const despesaInvalidaNegativa: Despesa = { ...despesaBase, valor: -10 };

    expect(() => adicionarDespesa([], despesaInvalidaZero)).toThrow();
    expect(() => adicionarDespesa([], despesaInvalidaNegativa)).toThrow();
  });

  // CASOS DE BORDA (Validação de Mês)
  it('deve lançar erro se o mês não estiver entre 1 e 12', () => {
    const despesaMesZero = { ...despesaBase, mes: 0 } as unknown as Despesa;
    const despesaMesTreze = { ...despesaBase, mes: 13 } as unknown as Despesa;

    expect(() => adicionarDespesa([], despesaMesZero)).toThrow();
    expect(() => adicionarDespesa([], despesaMesTreze)).toThrow();
  });
});

describe('removerDespesa', () => {
  const despesas: Despesa[] = [
    { id: 1, descricao: 'Almoço', valor: 35.5, categoria: 'alimentação', mes: 3 },
    { id: 2, descricao: 'Ônibus', valor: 8, categoria: 'transporte', mes: 3 }
  ];

  it('remove a despesa informada sem alterar o array original', () => {
    const resultado = removerDespesa(despesas, 1);

    expect(resultado).toEqual([despesas[1]]);
    expect(resultado).not.toBe(despesas);
    expect(despesas).toHaveLength(2);
  });

  it('retorna uma cópia igual quando o id não existe', () => {
    const resultado = removerDespesa(despesas, 3);

    expect(resultado).toEqual(despesas);
    expect(resultado).not.toBe(despesas);
  });
});

describe('despesasDaCategoria', () => {
  const despesas: Despesa[] = [
    { id: 1, descricao: 'Almoço', valor: 35.5, categoria: 'alimentação', mes: 3 },
    { id: 2, descricao: 'Ônibus', valor: 8, categoria: 'transporte', mes: 3 },
    { id: 3, descricao: 'Jantar', valor: 42, categoria: 'alimentação', mes: 3 }
  ];

  it('retorna somente despesas da categoria solicitada sem alterar a lista', () => {
    expect(despesasDaCategoria(despesas, 'alimentação')).toEqual([despesas[0], despesas[2]]);
    expect(despesas).toHaveLength(3);
  });
});

describe('totalGasto', () => {
  it('soma os valores das despesas', () => {
    const despesas: Despesa[] = [
      { id: 1, descricao: 'Almoço', valor: 35.5, categoria: 'alimentação', mes: 3 },
      { id: 2, descricao: 'Ônibus', valor: 8, categoria: 'transporte', mes: 3 }
    ];

    expect(totalGasto(despesas)).toBe(43.5);
  });

  it('retorna zero para uma lista vazia', () => {
    expect(totalGasto([])).toBe(0);
  });
});

describe('maiorDespesa', () => {
  it('retorna a despesa de maior valor sem alterar a lista', () => {
    const despesas: Despesa[] = [
      { id: 1, descricao: 'Almoço', valor: 35.5, categoria: 'alimentação', mes: 3 },
      { id: 2, descricao: 'Aluguel', valor: 1200, categoria: 'moradia', mes: 3 },
      { id: 3, descricao: 'Ônibus', valor: 8, categoria: 'transporte', mes: 3 }
    ];

    expect(maiorDespesa(despesas)).toBe(despesas[1]);
    expect(despesas).toHaveLength(3);
  });

  it('retorna undefined para uma lista vazia', () => {
    expect(maiorDespesa([])).toBeUndefined();
  });
});
