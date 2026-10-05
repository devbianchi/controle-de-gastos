import { describe, expect, it } from 'vitest';
import { CATEGORIAS } from './tipos.js';
import type { CategoriaDespesa, Despesa } from './tipos.js';
import { descricaoCategoria, formatarRelatorio, matrizCategoriaMes } from './relatorio.js';

describe('descricaoCategoria', () => {
  it('retorna o nome de exibição de cada categoria', () => {
    expect(descricaoCategoria('alimentação')).toBe('Alimentação');
    expect(descricaoCategoria('transporte')).toBe('Transporte');
    expect(descricaoCategoria('lazer')).toBe('Lazer');
    expect(descricaoCategoria('moradia')).toBe('Moradia');
  });

  it('retorna um rótulo genérico para uma categoria desconhecida em runtime', () => {
    expect(descricaoCategoria('desconhecida' as CategoriaDespesa)).toBe('Categoria desconhecida');
  });
});

describe('matrizCategoriaMes', () => {
  it('agrupa os valores por categoria e mês na ordem definida', () => {
    const despesas: Despesa[] = [
      { id: 1, descricao: 'Almoço', valor: 35.5, categoria: 'alimentação', mes: 3 },
      { id: 2, descricao: 'Lanche', valor: 4.5, categoria: 'alimentação', mes: 3 },
      { id: 3, descricao: 'Ônibus', valor: 8, categoria: 'transporte', mes: 1 },
      { id: 4, descricao: 'Cinema', valor: 20, categoria: 'lazer', mes: 12 }
    ];
    const resultado = matrizCategoriaMes(despesas);

    expect(resultado).toHaveLength(CATEGORIAS.length);
    expect(resultado[0]).toHaveLength(12);
    expect(resultado[0]?.[0]).toBe(0);
    expect(resultado[0]?.[2]).toBe(40);
    expect(resultado[1]?.[0]).toBe(8);
    expect(resultado[2]?.[11]).toBe(20);
    expect(resultado[3]).toEqual(Array(12).fill(0));
  });

  it('retorna zeros para uma lista vazia', () => {
    const resultado = matrizCategoriaMes([]);

    expect(resultado).toHaveLength(CATEGORIAS.length);
    for (const linha of resultado) {
      expect(linha).toEqual(Array(12).fill(0));
    }
  });
});

describe('formatarRelatorio', () => {
  it('formata totais anuais alinhados, total geral e maior despesa', () => {
    const despesas: Despesa[] = [
      { id: 1, descricao: 'Almoço', valor: 35.5, categoria: 'alimentação', mes: 3 },
      { id: 2, descricao: 'Lanche', valor: 4.5, categoria: 'alimentação', mes: 3 },
      { id: 3, descricao: 'Ônibus', valor: 8, categoria: 'transporte', mes: 1 },
      { id: 4, descricao: 'Cinema', valor: 20, categoria: 'lazer', mes: 12 }
    ];
    const linhas = formatarRelatorio(despesas).split('\n');

    expect(linhas[0]).toBe('RELATÓRIO DE DESPESAS');
    expect(linhas[3]).toMatch(/^Alimentação\s+40\.00$/);
    expect(linhas[4]).toMatch(/^Transporte\s+8\.00$/);
    expect(linhas[7]).toMatch(/^TOTAL GERAL\s+68\.00$/);
    expect(linhas[8]).toBe('MAIOR DESPESA: Almoço - 35.50');
    expect(linhas[3]?.lastIndexOf('.')).toBe(linhas[4]?.lastIndexOf('.'));
  });

  it('informa totais zerados e ausência de maior despesa na lista vazia', () => {
    const linhas = formatarRelatorio([]).split('\n');

    expect(linhas[7]).toMatch(/^TOTAL GERAL\s+0\.00$/);
    expect(linhas[8]).toBe('MAIOR DESPESA: Nenhuma');
  });
});
