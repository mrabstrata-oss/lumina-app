# Lumina — App Educativa de Saúde da Mulher (Ionic + Angular)

Aplicação móvel educativa sobre saúde da mulher, com conteúdo informativo organizado em 10 temas e um quiz interativo com pontuação, sequências de acertos ("streak") e histórico de progresso persistente.

> Projeto desenvolvido na cadeira de Computação Móvel, com base num template inicial gerado pelo Ionic CLI (Ionic 8 + Angular 20, standalone components).

## Funcionalidades

- **Aprender** — 10 temas de saúde da mulher (ciclo menstrual, gravidez, nutrição, saúde mental, exames preventivos, fertilidade, menopausa, contraceção, exercício físico, sono e bem-estar). Cada tema tem conteúdo educativo detalhado apresentado num modal, com animação de entrada.
- **Quiz** — sistema de 3 rondas (10 perguntas cada, cobrindo as 30 perguntas do banco). Antes de jogar, a jogadora indica o nome e a idade, que ficam associados ao resultado. Cada pergunta tem um cronómetro de 20 segundos, alíneas embaralhadas a cada jogo (a resposta certa nunca fica sempre na mesma posição), feedback imediato com animação, explicação pedagógica e uma curiosidade extra entre perguntas. Conta também sequências de acertos consecutivos ("streak").
- **Resultados** — histórico de todas as tentativas de quiz, melhor pontuação, média geral, e progresso por tema (barra de percentagem animada), tudo guardado de forma persistente no dispositivo.

## Identidade visual

- Nome: **Lumina** (do latim "luz" — conhecimento que ilumina)
- Logótipo: flor minimalista em SVG (gradiente magenta → violeta), desenhada à mão no código, sem dependências externas de imagem
- Paleta: gradiente `#C2185B → #7B2D8E`, com uma cor de destaque própria por tema
- Animações: entrada em cascata dos cards, transições suaves entre perguntas, pulsação/tremor no feedback do quiz, troféu flutuante
- Totalmente responsivo: grid de 2 colunas em telemóvel, 3 em tablet, 4 em ecrãs largos

## Tecnologias

- Ionic 8 (standalone components)
- Angular 20
- TypeScript
- `@ionic/storage-angular` para persistência local de dados (funciona tanto no browser como em dispositivos móveis via Capacitor)
- Ionicons

## Estrutura do projeto

```
src/app/
├── app.component.ts/html/scss   → componente raiz
├── app.config.ts                 → configuração global (providers, incluindo Storage)
├── app.routes.ts                 → rota principal
├── models/
│   └── saude.model.ts            → interfaces TypeScript (Tema, Pergunta, ResultadoQuiz, ...)
├── services/
│   ├── dados-saude.ts            → conteúdo educativo (10 temas) e banco de perguntas (30, em 3 rondas)
│   ├── quiz-utils.ts             → funções puras para baralhar perguntas e alíneas
│   └── armazenamento.ts          → serviço de persistência (Ionic Storage)
├── shared/
│   └── logo.component.ts         → logótipo SVG reutilizável "Lumina"
└── tabs/
    ├── tabs.page.ts/html/scss    → barra de navegação inferior
    ├── tabs.routes.ts            → rotas das 3 abas
    ├── tab1.page.*                → aba "Aprender"
    ├── tab2.page.*                → aba "Quiz"
    └── tab3.page.*                → aba "Resultados"
```

## Como executar

```bash
# 1. Instalar dependências
#    (--legacy-peer-deps é necessário por um conflito normal entre
#     sub-versões do Angular 20, sem relação com o código do projeto)
npm install --legacy-peer-deps

# 2. Correr no browser (modo desenvolvimento)
ionic serve
```

A aplicação abre por defeito no browser em `http://localhost:8100`.

> **Nota sobre antivírus**: se o browser mostrar "conexão recusada" mesmo com o terminal a indicar que o servidor está a correr, é comum que antivírus como o Avast bloqueiem a ligação local. Desativa temporariamente o Web Shield/Proteção de Rede do antivírus enquanto desenvolves, ou adiciona `localhost` e `127.0.0.1` às exceções.

### Para testar num telemóvel (opcional)

```bash
ionic build
npx cap add android      # ou ios
npx cap copy
npx cap open android
```

## Correr os testes unitários

```bash
npm test
```

## Notas sobre o conteúdo

O conteúdo educativo apresentado é de carácter geral e informativo. Não substitui aconselhamento médico profissional — esta é uma app educativa para fins académicos.

## Possíveis melhorias futuras

- Sistema de "badges"/conquistas por progresso
- Modo claro/escuro
- Partilha de resultados
- Notificações para incentivar a revisão de conteúdo
- Mais perguntas por tema para aumentar a variedade do quiz
