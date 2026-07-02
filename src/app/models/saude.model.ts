// Modelo de dados da aplicação "Lumina"

export interface Tema {
  id: string;
  nome: string;
  icone: string; // nome do ícone Ionicons
  cor: string; // cor de destaque do tema (hex)
  corClara: string; // tom claro derivado, usado em fundos
  resumo: string; // frase curta mostrada no card
  conteudo: SeccaoConteudo[]; // conteúdo educativo detalhado
}

export interface SeccaoConteudo {
  titulo: string;
  texto: string;
}

export interface Pergunta {
  id: number;
  temaId: string; // a que tema pertence a pergunta
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number; // índice da opção correta em "opcoes"
  explicacao: string; // mostrado depois de responder
  curiosidade: string; // facto extra, mostrado como bónus educativo
}

export interface Jogadora {
  nome: string;
  idade: number;
}

export interface ResultadoQuiz {
  data: string; // ISO string da data em que o quiz foi feito
  nomeJogadora: string;
  idadeJogadora: number;
  ronda: number; // 1, 2 ou 3
  pontuacao: number; // nº de respostas certas
  totalPerguntas: number;
  percentagem: number;
  melhorStreak: number;
}

export interface ProgressoTema {
  temaId: string;
  melhorPercentagem: number;
  tentativas: number;
}
