import {
	adicionarDespesa,
	despesasDaCategoria,
	maiorDespesa,
	removerDespesa,
	totalGasto
} from './despesas.js';
import {
	descricaoCategoria,
	formatarRelatorio,
	matrizCategoriaMes
} from './relatorio.js';
import type { Despesa } from './tipos.js';

const despesasExemplo: Despesa[] = [
	{ id: 1, descricao: 'Mercado', valor: 215.7, categoria: 'alimentação', mes: 1 },
	{ id: 2, descricao: 'Almoço', valor: 48.5, categoria: 'alimentação', mes: 2 },
	{ id: 3, descricao: 'Ônibus', valor: 35.2, categoria: 'transporte', mes: 1 },
	{ id: 4, descricao: 'Combustível', valor: 160, categoria: 'transporte', mes: 4 },
	{ id: 5, descricao: 'Cinema', valor: 42, categoria: 'lazer', mes: 2 },
	{ id: 6, descricao: 'Streaming', valor: 29.9, categoria: 'lazer', mes: 7 },
	{ id: 7, descricao: 'Aluguel', valor: 1200, categoria: 'moradia', mes: 1 },
	{ id: 8, descricao: 'Internet', valor: 99.9, categoria: 'moradia', mes: 4 }
];

const despesasComNova = adicionarDespesa(despesasExemplo, {
	id: 9,
	descricao: 'Feira',
	valor: 82.4,
	categoria: 'alimentação',
	mes: 7
});
const despesas = removerDespesa(despesasComNova, 8);
const despesasAlimentacao = despesasDaCategoria(despesas, 'alimentação');
const maior = maiorDespesa(despesas);

console.log(`Categoria consultada: ${descricaoCategoria('alimentação')}`);
console.log(`Despesas nessa categoria: ${despesasAlimentacao.length}`);
console.log(`Total gasto: R$ ${totalGasto(despesas).toFixed(2)}`);
console.log(`Maior despesa: ${maior?.descricao ?? 'Nenhuma'}`);
console.log('Matriz categoria x mês:', matrizCategoriaMes(despesas));
console.log(formatarRelatorio(despesas));
