import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
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

type EstadoQuiz = 'identificacao' | 'escolha-ronda' | 'contagem' | 'a-decorrer' | 'curiosidade' | 'jogo-perdido' | 'fim';

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

  // --- Progressão de rondas ---
  rondaAtual: 1 | 2 | 3 = 1;
  jogoCompleto = false;

  // --- Sessão de quiz ---
  perguntas: Pergunta[] = [];
  indiceAtual = 0;
  opcaoSelecionada: number | null = null;
  respondeu = false;
  acertos = 0;
  acertosPorPergunta: boolean[] = [];
  streakAtual = 0;
  melhorStreak = 0;

  // --- Vidas e pontuação ---
  vidas = VIDAS_INICIAIS;
  pontos = 0;
  pontosAnimando = false;
  coracaoPerdidoIndice: number | null = null;

  // --- Cronómetro ---
  segundosRestantes = SEGUNDOS_POR_PERGUNTA;
  private temporizadorId: ReturnType<typeof setInterval> | null = null;
  tempoEsgotado = false;

  // --- Contagem regressiva ---
  contagemRegressiva: number = 5;
  private contadorId: ReturnType<typeof setInterval> | null = null;

  // ============================================================
  // NOVA PROPRIEDADE PARA AS CLASSES DAS OPÇÕES
  // ============================================================
  classesOpcoes: string[] = [];

  constructor(
    private armazenamento: ArmazenamentoService,
    private cdr: ChangeDetectorRef
  ) {
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
    this.pararContagem();
  }

  private async carregarUltimaJogadora() {
    const ultima = await this.armazenamento.obterUltimaJogadora();
    if (ultima) {
      this.nomeJogadora = ultima.nome;
      this.idadeJogadora = ultima.idade;
    }
  }

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

  iniciarRondaAtual() {
    const perguntasDaRonda = obterPerguntasDaRonda(this.rondaAtual);
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
    this.classesOpcoes = [];

    this.estado = 'contagem';
    this.contagemRegressiva = 5;
    this.iniciarContagem();
  }

  private iniciarContagem() {
    if (this.contadorId) {
      clearInterval(this.contadorId);
      this.contadorId = null;
    }
    this.contadorId = setInterval(() => {
      this.contagemRegressiva--;
      this.cdr.detectChanges();
      if (this.contagemRegressiva <= 0) {
        this.pararContagem();
        this.estado = 'a-decorrer';
        this.iniciarTemporizador();
      }
    }, 1000);
  }

  private pararContagem() {
    if (this.contadorId) {
      clearInterval(this.contadorId);
      this.contadorId = null;
    }
  }

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
    this.atualizarClassesOpcoes();
    setTimeout(() => {
      this.iniciarRondaAtual();
    }, 1600);
  }

  get corCronometro(): string {
    if (this.segundosRestantes <= 5) return 'critico';
    if (this.segundosRestantes <= 10) return 'alerta';
    return 'normal';
  }

  get perguntaAtual(): Pergunta | null {
    return this.perguntas[this.indiceAtual] ?? null;
  }

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

    this.atualizarClassesOpcoes();

    const acertou = indice === this.perguntaAtual?.respostaCorreta;
    this.acertosPorPergunta[this.indiceAtual] = acertou;

    if (acertou) {
      this.acertos++;
      this.streakAtual++;
      if (this.streakAtual > this.melhorStreak) {
        this.melhorStreak = this.streakAtual;
      }
      this.pontos += PONTOS_POR_ACERTO;
      this.pontosAnimando = true;
      setTimeout(() => (this.pontosAnimando = false), 400);
    } else {
      this.streakAtual = 0;
      this.pontos = Math.max(0, this.pontos - PONTOS_PENALIZACAO_ERRO);
      this.pontosAnimando = true;
      setTimeout(() => (this.pontosAnimando = false), 400);
      const indiceVidaPerdida = this.vidas - 1;
      this.coracaoPerdidoIndice = indiceVidaPerdida;
      this.vidas--;
      if (this.vidas <= 0) {
        this.pararTemporizador();
        setTimeout(() => {
          this.estado = 'jogo-perdido';
        }, 1400);
      }
    }
  }

  private atualizarClassesOpcoes() {
    if (!this.respondeu || !this.perguntaAtual) {
      this.classesOpcoes = this.perguntas[this.indiceAtual]?.opcoes.map(() => '') || [];
      return;
    }

    const correta = this.perguntaAtual.respostaCorreta;
    this.classesOpcoes = this.perguntaAtual.opcoes.map((_, i) => {
      if (this.tempoEsgotado) return 'desativada';
      if (i === correta) return 'correta';
      if (i === this.opcaoSelecionada) return 'errada';
      return 'desativada';
    });
  }

  classeOpcao(indice: number): string {
    if (!this.respondeu) return '';
    if (this.tempoEsgotado) return 'desativada';
    const correta = this.perguntaAtual?.respostaCorreta;
    if (indice === correta) return 'correta';
    if (indice === this.opcaoSelecionada) return 'errada';
    return 'desativada';
  }

  irParaCuriosidade() {
    if (this.vidas <= 0) return;
    this.estado = 'curiosidade';
  }

  continuarDepoisDaCuriosidade() {
    if (this.indiceAtual < this.perguntas.length - 1) {
      this.indiceAtual++;
      this.opcaoSelecionada = null;
      this.respondeu = false;
      this.tempoEsgotado = false;
      this.classesOpcoes = [];
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