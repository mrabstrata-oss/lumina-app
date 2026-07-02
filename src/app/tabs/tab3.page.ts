import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
  IonButton,
  IonAlert,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChartOutline,
  timeOutline,
  trashOutline,
  trendingUpOutline,
  trophyOutline,
  flameOutline,
  ribbonOutline,
  lockClosedOutline,
  checkmarkCircle,
  searchOutline,
  closeCircle,
} from 'ionicons/icons';
import { ResultadoQuiz, ProgressoTema } from '../models/saude.model';
import { TEMAS } from '../services/dados-saude';
import { ArmazenamentoService } from '../services/armazenamento';

const PERCENTAGEM_MINIMA_PARA_AVANCAR = 60;
const TOTAL_RONDAS = 3;

interface PontoGrafico {
  x: number;
  y: number;
  percentagem: number;
  data: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    IonCard,
    IonCardContent,
    IonButton,
    IonAlert,
    IonInput,
  ],
})
export class Tab3Page implements OnInit {
  historico: ResultadoQuiz[] = [];
  historicoFiltrado: ResultadoQuiz[] = [];
  progresso: ProgressoTema[] = [];
  mostrarAlertaLimpar = false;
  termoBusca = '';

  // --- Estado do jogo (rondas desbloqueadas) ---
  rondaAtual = 1;

  alertaBotoes = [
    { text: 'Cancelar', role: 'cancel' },
    {
      text: 'Limpar tudo',
      role: 'destructive',
      handler: () => this.confirmarLimpeza(),
    },
  ];

  constructor(private armazenamento: ArmazenamentoService) {
    addIcons({
      'stats-chart-outline': statsChartOutline,
      'time-outline': timeOutline,
      'trash-outline': trashOutline,
      'trending-up-outline': trendingUpOutline,
      'trophy-outline': trophyOutline,
      'flame-outline': flameOutline,
      'ribbon-outline': ribbonOutline,
      'lock-closed-outline': lockClosedOutline,
      'checkmark-circle': checkmarkCircle,
      'search-outline': searchOutline,
      'close-circle': closeCircle,
    });
  }

  async ngOnInit() {
    await this.carregarDados();
  }

  async ionViewWillEnter() {
    await this.carregarDados();
  }

  private async carregarDados() {
    this.historico = await this.armazenamento.obterHistorico();
    this.progresso = await this.armazenamento.obterProgresso();
    this.aplicarFiltro();
    this.calcularRondaAtual();
  }

  private calcularRondaAtual() {
    let ronda = 1;
    for (let r = 1; r <= TOTAL_RONDAS; r++) {
      const passou = this.historico.some(
        (h) => h.ronda === r && h.percentagem >= PERCENTAGEM_MINIMA_PARA_AVANCAR
      );
      if (passou && r < TOTAL_RONDAS) ronda = r + 1;
      else if (passou && r === TOTAL_RONDAS) ronda = TOTAL_RONDAS;
    }
    this.rondaAtual = ronda;
  }

  // ---------- Filtro por jogadora ----------

  aplicarFiltro() {
    const termo = this.termoBusca.trim().toLowerCase();
    if (!termo) {
      this.historicoFiltrado = this.historico;
    } else {
      this.historicoFiltrado = this.historico.filter((h) =>
        h.nomeJogadora.toLowerCase().includes(termo)
      );
    }
  }

  limparBusca() {
    this.termoBusca = '';
    this.aplicarFiltro();
  }

  // ---------- Getters de resumo ----------

  get melhorPercentagem(): number {
    if (this.historicoFiltrado.length === 0) return 0;
    return Math.max(...this.historicoFiltrado.map((h) => h.percentagem));
  }

  get mediaPercentagem(): number {
    if (this.historicoFiltrado.length === 0) return 0;
    const soma = this.historicoFiltrado.reduce((acc, h) => acc + h.percentagem, 0);
    return Math.round(soma / this.historicoFiltrado.length);
  }

  get melhorStreakHistorico(): number {
    if (this.historicoFiltrado.length === 0) return 0;
    return Math.max(...this.historicoFiltrado.map((h) => h.melhorStreak ?? 0));
  }

  rondaConcluida(ronda: number): boolean {
    return this.historico.some(
      (h) => h.ronda === ronda && h.percentagem >= PERCENTAGEM_MINIMA_PARA_AVANCAR
    );
  }

  melhorResultadoDaRonda(ronda: number): number | null {
    const resultados = this.historico.filter((h) => h.ronda === ronda);
    if (resultados.length === 0) return null;
    return Math.max(...resultados.map((h) => h.percentagem));
  }

  // ---------- Gráfico SVG de evolução ----------

  readonly GRAFICO_LARGURA = 320;
  readonly GRAFICO_ALTURA = 120;
  readonly MARGEM = 20;

  get pontosGrafico(): PontoGrafico[] {
    const dados = [...this.historicoFiltrado].reverse(); // mais antigo primeiro
    if (dados.length < 2) return [];

    const larguraUtil = this.GRAFICO_LARGURA - this.MARGEM * 2;
    const alturaUtil = this.GRAFICO_ALTURA - this.MARGEM * 2;

    return dados.map((h, i) => ({
      x: this.MARGEM + (i / (dados.length - 1)) * larguraUtil,
      y: this.MARGEM + alturaUtil - (h.percentagem / 100) * alturaUtil,
      percentagem: h.percentagem,
      data: this.formatarDataCurta(h.data),
    }));
  }

  get caminhoSVG(): string {
    const pontos = this.pontosGrafico;
    if (pontos.length < 2) return '';

    return pontos
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
  }

  get caminhoAreaSVG(): string {
    const pontos = this.pontosGrafico;
    if (pontos.length < 2) return '';

    const linha = pontos
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');

    const base = this.GRAFICO_ALTURA - this.MARGEM;
    const inicio = pontos[0].x.toFixed(1);
    const fim = pontos[pontos.length - 1].x.toFixed(1);

    return `${linha} L ${fim} ${base} L ${inicio} ${base} Z`;
  }

  // ---------- Utilidades ----------

  nomeTema(temaId: string): string {
    return TEMAS.find((t) => t.id === temaId)?.nome ?? temaId;
  }

  corTema(temaId: string): string {
    return TEMAS.find((t) => t.id === temaId)?.cor ?? '#C2185B';
  }

  formatarData(isoString: string): string {
    return new Date(isoString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatarDataCurta(isoString: string): string {
    return new Date(isoString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  pedirLimpeza() {
    this.mostrarAlertaLimpar = true;
  }

  private async confirmarLimpeza() {
    await this.armazenamento.limparHistorico();
    await this.carregarDados();
  }
}