/**
 * Union type para representar rigorosamente as categorias de despesas.
 * Usar o tipo 'string' seria muito amplo, permitindo valores inválidos como 'viagem' ou 'investimento'.
 */
type CategoriaDespesa = 'alimentação' | 'transporte' | 'lazer' | 'moradia';


/**
 * Union type para representar rigorosamente os meses do ano (1 a 12).
 * Usar o tipo 'number' seria muito amplo, permitindo valores inválidos como 0 ou 99.
 */
export type MesDoAno = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Despesa {
  /**
   * 'readonly' porque o identificador nunca deve mudar após a criação da despesa.
   */
  readonly id: string | number;

  /**
   * Obrigatório: Toda despesa precisa de um texto descritivo.
   */
  descricao: string;

  /**
   * Obrigatório: O valor financeiro da despesa.
   */
  valor: number;

  /**
   * Union type restrito às opções válidas do relatório.
   */
  categoria: CategoriaDespesa;

  /**
   * Union type restrito para garantir apenas meses válidos do calendário.
   */
  mes: MesDoAno;

  /**
   * Opcional (usando '?') pois o campo de observações não é obrigatório.
   */
  observacao?: string;
}
