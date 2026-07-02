import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonProgressBar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircle,
  closeCircle,
  refreshOutline,
  trophyOutline,
  playOutline,
  flameOutline,
  personOutline,
  bulbOutline,
  timeOutline,
  arrowForwardOutline,
  lockClosedOutline,
  starOutline,
  homeOutline,
  heart,
  heartOutline,
  sparklesOutline,
  sadOutline,
} from 'ionicons/icons';
import { Pergunta, ResultadoQuiz, Jogadora } from '../models/saude.model';
import { obterPerguntasDaRonda } from '../services/dados-saude';
import { baralhar, baralharOpcoesDaPergunta } from '../services/quiz-utils';
import { ArmazenamentoService } from '../services/armazenamento';
import { TEMAS } from '../services/dados-saude';

type EstadoQuiz = 'identificacao' | 'escolha-ronda' | 'a-decorrer' | 'curiosidade' | 'jogo-perdido' | 'fim';

const SEGUNDOS_POR_PERGUNTA = 20;
const VIDAS_INICIAIS = 3;
const PONTOS_POR_ACERTO = 10;
const PONTOS_PENALIZACAO_ERRO = 5;
const PERCENTAGEM_MINIMA_PARA_AVANCAR = 60;
const TOTAL_RONDAS = 3;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonProgressBar,
    IonIcon,
    IonCard,
    IonCardContent,
    IonInput,
  ],
})
export class Tab2Page implements OnDestroy {
  estado: EstadoQuiz = 'identificacao';

  // --- Identificação da jogadora ---
  nomeJogadora = '';
  idadeJogadora: number | null = null;
  erroIdentificacao = '';

  // --- Progressão de rondas (calculada automaticamente, sem escolha manual) ---
  rondaAtual: 1 | 2 | 3 = 1;
  jogoCompleto = false; // true quando passa a Ronda 3 com sucesso

  // --- Sessão de quiz a decorrer ---
  perguntas: Pergunta[] = [];
  indiceAtual = 0;
  opcaoSelecionada: number | null = null;
  respondeu = false;
  acertos = 0;
  acertosPorPergunta: boolean[] = [];
  streakAtual = 0;
  melhorStreak = 0;

  // --- Sistema de vidas e pontuação ---
  vidas = VIDAS_INICIAIS;
  pontos = 0;
  pontosAnimando = false; // ativa uma pequena animação quando os pontos mudam
  coracaoPerdidoIndice: number | null = null; // qual coração animar ao perder vida

  // --- Cronómetro ---
  segundosRestantes = SEGUNDOS_POR_PERGUNTA;
  private temporizadorId: ReturnType<typeof setInterval> | null = null;
  tempoEsgotado = false;

  constructor(private armazenamento: ArmazenamentoService) {
    addIcons({
      'checkmark-circle': checkmarkCircle,
      'close-circle': closeCircle,
      'refresh-outline': refreshOutline,
      'trophy-outline': trophyOutline,
      'play-outline': playOutline,
      'flame-outline': flameOutline,
      'person-outline': personOutline,
      'bulb-outline': bulbOutline,
      'time-outline': timeOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'lock-closed-outline': lockClosedOutline,
      'star-outline': starOutline,
      'home-outline': homeOutline,
      heart: heart,
      'heart-outline': heartOutline,
      'sparkles-outline': sparklesOutline,
      'sad-outline': sadOutline,
    });

    this.carregarUltimaJogadora();
    this.determinarRondaAtual();
  }

  ngOnDestroy() {
    this.pararTemporizador();
  }

  private async carregarUltimaJogadora() {
    const ultima = await this.armazenamento.obterUltimaJogadora();
    if (ultima) {
      this.nomeJogadora = ultima.nome;
      this.idadeJogadora = ultima.idade;
    }
  }

  /**
   * Determina em que ronda a jogadora deve estar, com base no histórico:
   * avança para a ronda seguinte à última em que atingiu a percentagem mínima.
   * Nunca passa da Ronda 3 (jogo completo).
   */
  private async determinarRondaAtual() {
    const historico = await this.armazenamento.obterHistorico();

    let rondaCalculada: 1 | 2 | 3 = 1;
    for (let r = 1; r <= TOTAL_RONDAS; r++) {
      const passouNestaRonda = historico.some(
        (h) => h.ronda === r && h.percentagem >= PERCENTAGEM_MINIMA_PARA_AVANCAR
      );
      if (passouNestaRonda && r < TOTAL_RONDAS) {
        rondaCalculada = (r + 1) as 1 | 2 | 3;
      } else if (passouNestaRonda && r === TOTAL_RONDAS) {
        this.jogoCompleto = true;
        rondaCalculada = TOTAL_RONDAS;
      }
    }

    this.rondaAtual = rondaCalculada;
  }

  // ===================== Identificação =====================

  confirmarIdentificacao() {
    const nome = this.nomeJogadora.trim();

    if (!nome) {
      this.erroIdentificacao = 'Por favor, escreve o teu nome.';
      return;
    }
    if (!this.idadeJogadora || this.idadeJogadora < 8 || this.idadeJogadora > 100) {
      this.erroIdentificacao = 'Indica uma idade válida.';
      return;
    }

    this.erroIdentificacao = '';
    const jogadora: Jogadora = { nome, idade: this.idadeJogadora };
    this.armazenamento.guardarUltimaJogadora(jogadora);
    this.estado = 'escolha-ronda';
  }

  // ===================== Início da ronda (automático) =====================

  iniciarRondaAtual() {
    const perguntasDaRonda = obterPerguntasDaRonda(this.rondaAtual);
    // Baralha a ordem das perguntas E as alíneas de cada pergunta individualmente
    this.perguntas = baralhar(perguntasDaRonda).map((p) => baralharOpcoesDaPergunta(p));

    this.indiceAtual = 0;
    this.acertos = 0;
    this.acertosPorPergunta = [];
    this.streakAtual = 0;
    this.melhorStreak = 0;
    this.opcaoSelecionada = null;
    this.respondeu = false;
    this.tempoEsgotado = false;
    this.vidas = VIDAS_INICIAIS;
    this.pontos = 0;
    this.coracaoPerdidoIndice = null;
    this.estado = 'a-decorrer';

    this.iniciarTemporizador();
  }

  // ===================== Cronómetro =====================

  private iniciarTemporizador() {
    this.pararTemporizador();
    this.segundosRestantes = SEGUNDOS_POR_PERGUNTA;

    this.temporizadorId = setInterval(() => {
      this.segundosRestantes--;

      if (this.segundosRestantes <= 0) {
        this.pararTemporizador();
        this.tempoEsgotarSemResposta();
      }
    }, 1000);
  }

  private pararTemporizador() {
    if (this.temporizadorId !== null) {
      clearInterval(this.temporizadorId);
      this.temporizadorId = null;
    }
  }

  private tempoEsgotarSemResposta() {
    if (this.respondeu) return;
    this.tempoEsgotado = true;
    this.respondeu = true;

    // O tempo esgotado reinicia a ronda inteira (sem perder vida — perder vida
    // só acontece ao responder errado). Damos um pequeno instante para a
    // jogadora ver o aviso "tempo esgotado" antes de recomeçar.
    setTimeout(() => {
      this.iniciarRondaAtual();
    }, 1600);
  }

  get corCronometro(): string {
    if (this.segundosRestantes <= 5) return 'critico';
    if (this.segundosRestantes <= 10) return 'alerta';
    return 'normal';
  }

  // ===================== Perguntas e respostas =====================

  get perguntaAtual(): Pergunta | null {
    return this.perguntas[this.indiceAtual] ?? null;
  }

  /**
   * Progresso visual da barra: avança com cada pergunta respondida, mas
   * recua proporcionalmente a cada vida perdida — assim a jogadora vê
   * de imediato o impacto de um erro, não só o avanço nas perguntas.
   *
   * Exemplo com 3 vidas: perder 1 vida recua a barra em 1/3 do progresso
   * já feito até esse momento (visualmente "pune" o erro).
   */
  get progresso(): number {
    if (this.perguntas.length === 0) return 0;

    const avancoPerguntas = (this.indiceAtual + (this.respondeu ? 1 : 0)) / this.perguntas.length;
    const vidasPerdidas = VIDAS_INICIAIS - this.vidas;
    const fatorRecuoPorVida = avancoPerguntas / VIDAS_INICIAIS;
    const recuoTotal = vidasPerdidas * fatorRecuoPorVida;

    return Math.max(0, avancoPerguntas - recuoTotal);
  }

  get percentagemFinal(): number {
    if (this.perguntas.length === 0) return 0;
    return Math.round((this.acertos / this.perguntas.length) * 100);
  }

  get mensagemFinal(): string {
    const p = this.percentagemFinal;
    if (this.jogoCompleto && this.passouNestaTentativa) {
      return 'Parabéns! Completaste as 3 rondas do Lumina Quiz com sucesso.';
    }
    if (this.passouNestaTentativa) {
      return `Muito bem! Atingiste ${p}% e desbloqueaste a Ronda ${this.rondaAtual}.`;
    }
    return `Ficaste com ${p}%, abaixo dos ${PERCENTAGEM_MINIMA_PARA_AVANCAR}% necessários. Vamos repetir esta ronda?`;
  }

  selecionarOpcao(indice: number) {
    if (this.respondeu) return;

    this.pararTemporizador();
    this.opcaoSelecionada = indice;
    this.respondeu = true;

    const acertou = indice === this.perguntaAtual?.respostaCorreta;
    this.acertosPorPergunta[this.indiceAtual] = acertou;

    if (acertou) {
      this.acertos++;
      this.streakAtual++;
      if (this.streakAtual > this.melhorStreak) {
        this.melhorStreak = this.streakAtual;
      }
      this.somarPontos();
    } else {
      this.streakAtual = 0;
      this.registarErro();
    }
  }

  /**
   * Soma pontos por uma resposta correta, com uma pequena animação visual.
   */
  private somarPontos() {
    this.pontos += PONTOS_POR_ACERTO;
    this.pontosAnimando = true;
    setTimeout(() => (this.pontosAnimando = false), 400);
  }

  /**
   * Regista um erro de resposta: desconta pontos e remove uma vida.
   * Ao perder a 3ª vida, o jogo é interrompido e mostra-se o ecrã de
   * "jogo perdido" (sem guardar este resultado parcial no histórico).
   */
  private registarErro() {
    this.pontos = Math.max(0, this.pontos - PONTOS_PENALIZACAO_ERRO);
    this.pontosAnimando = true;
    setTimeout(() => (this.pontosAnimando = false), 400);

    const indiceVidaPerdida = this.vidas - 1; // 0-based, da direita para a esquerda
    this.coracaoPerdidoIndice = indiceVidaPerdida;
    this.vidas--;

    if (this.vidas <= 0) {
      this.pararTemporizador();
      // pequena pausa para a jogadora ver a explicação/feedback antes do ecrã de game over
      setTimeout(() => {
        this.estado = 'jogo-perdido';
      }, 1400);
    }
  }

  classeOpcao(indice: number): string {
    if (!this.respondeu) return '';
    if (this.tempoEsgotado) return 'desativada'; // tempo esgotou, ninguém respondeu — não revela a certa

    const correta = this.perguntaAtual?.respostaCorreta;

    if (indice === correta) return 'correta';
    if (indice === this.opcaoSelecionada) return 'errada';
    return 'desativada';
  }

  irParaCuriosidade() {
    if (this.vidas <= 0) return; // o jogo já está a terminar automaticamente (ver registarErro)
    this.estado = 'curiosidade';
  }

  continuarDepoisDaCuriosidade() {
    if (this.indiceAtual < this.perguntas.length - 1) {
      this.indiceAtual++;
      this.opcaoSelecionada = null;
      this.respondeu = false;
      this.tempoEsgotado = false;
      this.estado = 'a-decorrer';
      this.iniciarTemporizador();
    } else {
      this.terminarQuiz();
    }
  }

  get passouNestaTentativa(): boolean {
    return this.percentagemFinal >= PERCENTAGEM_MINIMA_PARA_AVANCAR;
  }

  private async terminarQuiz() {
    this.pararTemporizador();
    this.estado = 'fim';

    const resultado: ResultadoQuiz = {
      data: new Date().toISOString(),
      nomeJogadora: this.nomeJogadora,
      idadeJogadora: this.idadeJogadora ?? 0,
      ronda: this.rondaAtual,
      pontuacao: this.acertos,
      totalPerguntas: this.perguntas.length,
      percentagem: this.percentagemFinal,
      melhorStreak: this.melhorStreak,
    };

    await this.armazenamento.guardarResultado(resultado);

    const temasNesteQuiz = new Set(this.perguntas.map((p) => p.temaId));
    for (const temaId of temasNesteQuiz) {
      const indicesDoTema = this.perguntas
        .map((p, idx) => (p.temaId === temaId ? idx : -1))
        .filter((idx) => idx !== -1);

      const acertosDoTema = indicesDoTema.filter((idx) => this.acertosPorPergunta[idx]).length;
      const percentagemTema = Math.round((acertosDoTema / indicesDoTema.length) * 100);
      await this.armazenamento.atualizarProgresso(temaId, percentagemTema);
    }

    // Avança automaticamente para a ronda seguinte se atingiu a percentagem mínima
    if (this.passouNestaTentativa) {
      if (this.rondaAtual < TOTAL_RONDAS) {
        this.rondaAtual = (this.rondaAtual + 1) as 1 | 2 | 3;
      } else {
        this.jogoCompleto = true;
      }
    }
  }

  nomeTema(temaId: string): string {
    return TEMAS.find((t) => t.id === temaId)?.nome ?? '';
  }

  /**
   * Botão principal do ecrã de fim: se passou, avança para a próxima ronda
   * (ou mostra o ecrã de conclusão); se não passou, repete a mesma ronda.
   */
  continuar() {
    if (this.jogoCompleto && this.passouNestaTentativa) {
      this.voltarAoInicio();
      return;
    }
    this.iniciarRondaAtual();
  }

  voltarAoInicio() {
    this.estado = 'identificacao';
  }
}
