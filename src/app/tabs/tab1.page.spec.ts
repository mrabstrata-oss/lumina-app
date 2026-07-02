import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab1Page],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de temas com 10 itens', () => {
    expect(component.temas.length).toBe(10);
  });

  it('cada tema deve ter um tamanho de mosaico atribuído', () => {
    const tamanhosValidos = ['grande', 'medio', 'pequeno'];
    component.temas.forEach((tema) => {
      expect(tamanhosValidos).toContain(tema.tamanho);
    });
  });

  it('cada tema deve ter um tempo de leitura estimado maior que 0', () => {
    component.temas.forEach((tema) => {
      expect(tema.tempoLeitura).toBeGreaterThan(0);
    });
  });

  it('deve abrir o painel lateral ao selecionar um tema', () => {
    const tema = component.temas[0];
    component.abrirTema(tema);
    expect(component.painelAberto).toBeTrue();
    expect(component.temaSelecionado).toEqual(tema);
  });

  it('deve fechar o painel lateral', () => {
    component.abrirTema(component.temas[0]);
    component.fecharPainel();
    expect(component.painelAberto).toBeFalse();
  });

  it('não deve sugerir o quiz antes de explorar 3 temas distintos', () => {
    component.abrirTema(component.temas[0]);
    component.abrirTema(component.temas[1]);
    expect(component.mostrarSugestaoQuiz).toBeFalse();
  });

  it('deve sugerir o quiz após explorar 3 temas distintos', () => {
    component.abrirTema(component.temas[0]);
    component.abrirTema(component.temas[1]);
    component.abrirTema(component.temas[2]);
    expect(component.mostrarSugestaoQuiz).toBeTrue();
  });

  it('reabrir o mesmo tema não deve contar duas vezes para a sugestão', () => {
    component.abrirTema(component.temas[0]);
    component.abrirTema(component.temas[0]);
    component.abrirTema(component.temas[0]);
    expect(component.mostrarSugestaoQuiz).toBeFalse();
  });
});