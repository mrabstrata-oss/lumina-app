import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  waterOutline,
  heartOutline,
  nutritionOutline,
  happyOutline,
  shieldCheckmarkOutline,
  closeOutline,
  leafOutline,
  sunnyOutline,
  shieldHalfOutline,
  barbellOutline,
  moonOutline,
  sparklesOutline,
  timeOutline,
  arrowForwardOutline,
  helpCircleOutline,
  bookOutline,
} from 'ionicons/icons';
import { Tema } from '../models/saude.model';
import { TEMAS } from '../services/dados-saude';
import { LogoComponent } from '../shared/logo.component';

/** Tema com metadados visuais calculados para o grid em mosaico. */
interface TemaComMosaico extends Tema {
  tamanho: 'grande' | 'medio' | 'pequeno';
  tempoLeitura: number; // minutos estimados de leitura
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonContent, IonIcon, LogoComponent],
})
export class Tab1Page {
  temas: TemaComMosaico[];
  temaSelecionado: TemaComMosaico | null = null;
  painelAberto = false;

  // --- Mecanismo inteligente de sugestão do Quiz ---
  temasExplorados = new Set<string>();
  mostrarSugestaoQuiz = false;
  private readonly LIMIAR_PARA_SUGESTAO = 3; // após explorar 3 temas distintos

  constructor(private router: Router) {
    addIcons({
      'water-outline': waterOutline,
      'heart-outline': heartOutline,
      'nutrition-outline': nutritionOutline,
      'happy-outline': happyOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'close-outline': closeOutline,
      'leaf-outline': leafOutline,
      'sunny-outline': sunnyOutline,
      'shield-half-outline': shieldHalfOutline,
      'barbell-outline': barbellOutline,
      'moon-outline': moonOutline,
      'sparkles-outline': sparklesOutline,
      'time-outline': timeOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'help-circle-outline': helpCircleOutline,
      'book-outline': bookOutline,
    });

    this.temas = this.calcularMosaico(TEMAS);
  }

  /**
   * Atribui um tamanho visual a cada tema, criando um padrão tipo "bento grid":
   * o 1º tema e a cada 5 (índices 0 e 5) ficam grandes, criando ritmo visual
   * sem precisar de configuração manual nos dados.
   */
  private calcularMosaico(temas: Tema[]): TemaComMosaico[] {
    return temas.map((tema, indice) => {
      let tamanho: 'grande' | 'medio' | 'pequeno' = 'pequeno';
      if (indice === 0 || indice === 5) tamanho = 'grande';
      else if (indice % 3 === 1) tamanho = 'medio';

      // estimativa simples: ~40 palavras por secção, ~200 palavras/min de leitura
      const totalPalavras = tema.conteudo.reduce((acc, s) => acc + s.texto.split(' ').length, 0);
      const tempoLeitura = Math.max(1, Math.round(totalPalavras / 130));

      return { ...tema, tamanho, tempoLeitura };
    });
  }

  abrirTema(tema: TemaComMosaico) {
    this.temaSelecionado = tema;
    this.painelAberto = true;

    this.temasExplorados.add(tema.id);
    if (this.temasExplorados.size >= this.LIMIAR_PARA_SUGESTAO && !this.mostrarSugestaoQuiz) {
      this.mostrarSugestaoQuiz = true;
    }
  }

  fecharPainel() {
    this.painelAberto = false;
  }

  irParaQuiz() {
    this.router.navigateByUrl('/tabs/tab2');
  }
}