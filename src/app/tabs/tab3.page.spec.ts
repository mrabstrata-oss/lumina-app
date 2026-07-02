import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab3Page } from './tab3.page';
import { ArmazenamentoService } from '../services/armazenamento';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  const historicoFalso = [
    { data: new Date().toISOString(), pontuacao: 6, totalPerguntas: 8, percentagem: 75 },
    { data: new Date().toISOString(), pontuacao: 8, totalPerguntas: 8, percentagem: 100 },
  ];

  const armazenamentoMock = {
    obterHistorico: jasmine.createSpy('obterHistorico').and.resolveTo(historicoFalso),
    obterProgresso: jasmine.createSpy('obterProgresso').and.resolveTo([]),
    limparHistorico: jasmine.createSpy('limparHistorico').and.resolveTo(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab3Page],
      providers: [{ provide: ArmazenamentoService, useValue: armazenamentoMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    await component.ngOnInit();
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve calcular a melhor percentagem corretamente', () => {
    expect(component.melhorPercentagem).toBe(100);
  });

  it('deve calcular a média corretamente', () => {
    expect(component.mediaPercentagem).toBe(88); // (75 + 100) / 2 = 87.5 → 88
  });
});
