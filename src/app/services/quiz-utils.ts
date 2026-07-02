import { Pergunta } from '../models/saude.model';

/**
 * Baralha um array com o algoritmo Fisher-Yates, sem alterar o original.
 */
export function baralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Devolve uma cópia da pergunta com as opções baralhadas e o índice
 * da resposta correta recalculado para a nova ordem.
 * Resolve o problema de a resposta certa estar sempre nas primeiras alíneas.
 */
export function baralharOpcoesDaPergunta(pergunta: Pergunta): Pergunta {
  const opcoesComIndice = pergunta.opcoes.map((texto, indiceOriginal) => ({ texto, indiceOriginal }));
  const baralhadas = baralhar(opcoesComIndice);

  const novoIndiceCorreto = baralhadas.findIndex((o) => o.indiceOriginal === pergunta.respostaCorreta);

  return {
    ...pergunta,
    opcoes: baralhadas.map((o) => o.texto),
    respostaCorreta: novoIndiceCorreto,
  };
}
