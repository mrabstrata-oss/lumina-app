import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ResultadoQuiz, ProgressoTema, Jogadora } from '../models/saude.model';

const CHAVE_HISTORICO = 'historico_quiz';
const CHAVE_PROGRESSO = 'progresso_temas';
const CHAVE_ULTIMA_JOGADORA = 'ultima_jogadora';

/**
 * Serviço responsável por guardar e ler dados persistentes da app
 * (histórico de resultados do quiz e progresso por tema).
 * Usa o @ionic/storage-angular, que funciona tanto no browser
 * como em dispositivos móveis (via Capacitor).
 */
@Injectable({
  providedIn: 'root',
})
export class ArmazenamentoService {
  private storage: Storage | null = null;
  private pronto: Promise<void>;

  constructor(private ionicStorage: Storage) {
    this.pronto = this.iniciar();
  }

  private async iniciar(): Promise<void> {
    this.storage = await this.ionicStorage.create();
  }

  private async aguardar(): Promise<Storage> {
    await this.pronto;
    return this.storage as Storage;
  }

  // ---------- Histórico de resultados do quiz ----------

  async guardarResultado(resultado: ResultadoQuiz): Promise<void> {
    const storage = await this.aguardar();
    const historico = await this.obterHistorico();
    historico.unshift(resultado); // mais recente primeiro
    await storage.set(CHAVE_HISTORICO, historico.slice(0, 50)); // guarda até 50 resultados
  }

  async obterHistorico(): Promise<ResultadoQuiz[]> {
    const storage = await this.aguardar();
    const dados = await storage.get(CHAVE_HISTORICO);
    return dados ?? [];
  }

  async limparHistorico(): Promise<void> {
    const storage = await this.aguardar();
    await storage.remove(CHAVE_HISTORICO);
    await storage.remove(CHAVE_PROGRESSO);
  }

  // ---------- Progresso por tema ----------

  async obterProgresso(): Promise<ProgressoTema[]> {
    const storage = await this.aguardar();
    const dados = await storage.get(CHAVE_PROGRESSO);
    return dados ?? [];
  }

  async atualizarProgresso(temaId: string, percentagem: number): Promise<void> {
    const storage = await this.aguardar();
    const progresso = await this.obterProgresso();
    const existente = progresso.find((p) => p.temaId === temaId);

    if (existente) {
      existente.tentativas += 1;
      if (percentagem > existente.melhorPercentagem) {
        existente.melhorPercentagem = percentagem;
      }
    } else {
      progresso.push({ temaId, melhorPercentagem: percentagem, tentativas: 1 });
    }

    await storage.set(CHAVE_PROGRESSO, progresso);
  }

  // ---------- Última jogadora (conveniência para pré-preencher o formulário) ----------

  async guardarUltimaJogadora(jogadora: Jogadora): Promise<void> {
    const storage = await this.aguardar();
    await storage.set(CHAVE_ULTIMA_JOGADORA, jogadora);
  }

  async obterUltimaJogadora(): Promise<Jogadora | null> {
    const storage = await this.aguardar();
    const dados = await storage.get(CHAVE_ULTIMA_JOGADORA);
    return dados ?? null;
  }
}
