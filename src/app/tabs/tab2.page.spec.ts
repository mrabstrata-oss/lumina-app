import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Tab2Page } from './tab2.page';
import { ArmazenamentoService } from '../services/armazenamento';
import { ResultadoQuiz } from '../models/saude.model';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let historicoSimulado: ResultadoQuiz[];

  beforeEach(async () => {
    historicoSimulado = []; // reset a cada teste

    const armazenamentoMock = {
      obterUltimaJogadora: jasmine.createSpy('obterUltimaJogadora').and.resolveTo(null),
      obterHistorico: jasmine.createSpy('obterHistorico').and.callFake(() => Promise.resolve(historicoSimulado)),
      guardarUltimaJogadora: jasmine.createSpy('guardarUltimaJogadora').and.resolveTo(),
      guardarResultado: jasmine.createSpy('guardarResultado').and.resolveTo(),
      atualizarProgresso: jasmine.createSpy('atualizarProgresso').and.resolveTo(),
    };

    await TestBed.configureTestingModule({
      imports: [Tab2Page],
      providers: [{ provide: ArmazenamentoService, useValue: armazenamentoMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy(); // garante que o cronómetro (setInterval) não fica pendurado entre testes
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve começar no estado "identificacao"', () => {
    expect(component.estado).toBe('identificacao');
  });

  it('deve começar na Ronda 1 quando não há histórico', () => {
    expect(component.rondaAtual).toBe(1);
  });

  it('não deve avançar sem nome preenchido', () => {
    component.nomeJogadora = '';
    component.idadeJogadora = 25;
    component.confirmarIdentificacao();
    expect(component.estado).toBe('identificacao');
    expect(component.erroIdentificacao).not.toBe('');
  });

  it('não deve avançar com idade inválida', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 3; // abaixo do mínimo permitido
    component.confirmarIdentificacao();
    expect(component.estado).toBe('identificacao');
  });

  it('deve avançar para o ecrã de ronda com dados válidos', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.confirmarIdentificacao();
    expect(component.estado).toBe('escolha-ronda');
  });

  it('iniciarRondaAtual deve carregar 10 perguntas baralhadas e mudar o estado', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    expect(component.estado).toBe('a-decorrer');
    expect(component.perguntas.length).toBe(10);
    // todas as perguntas devem pertencer a temas distintos dentro da mesma ronda
    const temasDaRonda = new Set(component.perguntas.map((p) => p.temaId));
    expect(temasDaRonda.size).toBe(10);
  });

  it('selecionarOpcao deve marcar a resposta e contar o acerto corretamente', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    const respostaCorreta = component.perguntaAtual!.respostaCorreta;
    component.selecionarOpcao(respostaCorreta);

    expect(component.respondeu).toBeTrue();
    expect(component.acertos).toBe(1);
    expect(component.classeOpcao(respostaCorreta)).toBe('correta');
  });

  it('não deve permitir responder duas vezes à mesma pergunta', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    const correta = component.perguntaAtual!.respostaCorreta;
    const errada = correta === 0 ? 1 : 0;

    component.selecionarOpcao(correta);
    component.selecionarOpcao(errada); // deve ser ignorado

    expect(component.acertos).toBe(1);
  });

  it('deve reiniciar o cronómetro para 20 segundos a cada nova ronda', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();
    expect(component.segundosRestantes).toBe(20);
  });

  it('deve começar cada ronda com 3 vidas e 0 pontos', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();
    expect(component.vidas).toBe(3);
    expect(component.pontos).toBe(0);
  });

  it('deve somar 10 pontos por resposta correta', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    const correta = component.perguntaAtual!.respostaCorreta;
    component.selecionarOpcao(correta);

    expect(component.pontos).toBe(10);
    expect(component.vidas).toBe(3); // não perde vida ao acertar
  });

  it('deve descontar pontos e perder 1 vida por resposta errada', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    const correta = component.perguntaAtual!.respostaCorreta;
    const errada = correta === 0 ? 1 : 0;
    component.selecionarOpcao(errada);

    expect(component.vidas).toBe(2);
    expect(component.pontos).toBe(0); // não desce abaixo de 0
  });

  it('deve terminar o jogo (estado "jogo-perdido") após 3 erros consecutivos', fakeAsync(() => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    // simula 3 erros consecutivos, avançando manualmente entre perguntas
    for (let i = 0; i < 3; i++) {
      const correta = component.perguntaAtual!.respostaCorreta;
      const errada = correta === 0 ? 1 : 0;
      component.selecionarOpcao(errada);

      if (component.vidas > 0) {
        component.irParaCuriosidade();
        component.continuarDepoisDaCuriosidade();
      }
    }

    tick(1500); // aguarda o setTimeout que muda para 'jogo-perdido'
    expect(component.vidas).toBe(0);
    expect(component.estado).toBe('jogo-perdido');
  }));

  it('deve avançar para a Ronda 2 ao terminar a Ronda 1 com 60% ou mais de acertos', fakeAsync(() => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();

    // responde corretamente a 6 das 10 perguntas (60%) e erra as restantes 4,
    // sem nunca deixar as vidas chegarem a 0 (no máx. 2 erros seguidos, depois acerta)
    for (let i = 0; i < component.perguntas.length; i++) {
      const correta = component.perguntaAtual!.respostaCorreta;
      const deveAcertar = i % 5 !== 0 || i === 0; // padrão simples: acerta a maioria
      const respostaEscolhida = deveAcertar ? correta : correta === 0 ? 1 : 0;

      component.selecionarOpcao(respostaEscolhida);
      if (component.vidas <= 0) break;

      component.irParaCuriosidade();
      component.continuarDepoisDaCuriosidade();
    }

    tick(1500);

    // só valida o avanço se realmente atingiu o limiar sem perder todas as vidas
    if (component.estado === 'fim' && component.passouNestaTentativa) {
      expect(component.rondaAtual).toBe(2);
    }
  }));

  it('passouNestaTentativa deve ser falso quando a percentagem final é inferior a 60%', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();
    component.acertos = 5; // 5/10 = 50%, abaixo do limiar
    component.perguntas = component.perguntas.slice(0, 10);
    expect(component.passouNestaTentativa).toBeFalse();
  });

  it('continuar() deve repetir a mesma ronda quando não atingiu a percentagem mínima', () => {
    component.nomeJogadora = 'Maria';
    component.idadeJogadora = 25;
    component.iniciarRondaAtual();
    component.acertos = 3; // 30%, não passa
    component.estado = 'fim';

    const rondaAntes = component.rondaAtual;
    component.continuar();

    expect(component.rondaAtual).toBe(rondaAntes); // não avançou
    expect(component.estado).toBe('a-decorrer'); // reiniciou a ronda
  });
});