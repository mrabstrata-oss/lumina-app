import { Tema, Pergunta } from '../models/saude.model';

// ===================================================================
// TEMAS EDUCATIVOS — Lumina
// Conteúdo informativo geral. Não substitui aconselhamento médico.
// ===================================================================

export const TEMAS: Tema[] = [
  {
    id: 'ciclo',
    nome: 'Ciclo Menstrual',
    icone: 'water-outline',
    cor: '#C2185B',
    corClara: '#FCE4EC',
    resumo: 'Como funciona o ciclo e porque é importante conhecê-lo.',
    conteudo: [
      {
        titulo: 'O que é o ciclo menstrual?',
        texto:
          'O ciclo menstrual é o processo natural e recorrente pelo qual o corpo da mulher se prepara mensalmente para uma possível gravidez. Em média dura entre 21 a 35 dias, contados do primeiro dia de uma menstruação até ao primeiro dia da seguinte, embora isto varie de pessoa para pessoa.',
      },
      {
        titulo: 'As fases do ciclo',
        texto:
          'O ciclo divide-se em quatro fases principais: a fase menstrual (eliminação do revestimento do útero), a fase folicular (preparação de um novo óvulo), a ovulação (libertação do óvulo, por volta do meio do ciclo) e a fase lútea (preparação do corpo para uma eventual gravidez).',
      },
      {
        titulo: 'Porque vale a pena monitorizar',
        texto:
          'Registar a duração e regularidade do ciclo ajuda a identificar padrões normais, antecipar a menstruação e detetar mais cedo alterações que mereçam atenção médica, como ciclos muito irregulares ou cólicas muito intensas.',
      },
    ],
  },
  {
    id: 'gravidez',
    nome: 'Gravidez',
    icone: 'heart-outline',
    cor: '#7B2D8E',
    corClara: '#F3E5F5',
    resumo: 'Sinais, cuidados e acompanhamento durante a gestação.',
    conteudo: [
      {
        titulo: 'Sinais iniciais comuns',
        texto:
          'Atraso menstrual, sensibilidade nos seios, náuseas (sobretudo matinais) e cansaço são sinais frequentemente associados ao início da gravidez. Um teste de gravidez e a confirmação médica são a forma fiável de a confirmar.',
      },
      {
        titulo: 'A importância das consultas pré-natais',
        texto:
          'O acompanhamento médico regular ao longo da gravidez permite monitorizar o desenvolvimento do bebé, detetar precocemente complicações e aconselhar sobre alimentação, suplementação (como o ácido fólico) e estilo de vida adequados a cada fase.',
      },
      {
        titulo: 'Cuidados gerais recomendados',
        texto:
          'Uma alimentação equilibrada, hidratação adequada, evitar álcool e tabaco, e manter atividade física moderada (sempre com orientação médica) são pilares importantes para uma gravidez saudável.',
      },
    ],
  },
  {
    id: 'nutricao',
    nome: 'Nutrição',
    icone: 'nutrition-outline',
    cor: '#00897B',
    corClara: '#E0F2F1',
    resumo: 'Nutrientes essenciais em diferentes fases da vida da mulher.',
    conteudo: [
      {
        titulo: 'Ferro e ácido fólico',
        texto:
          'Devido à perda de sangue durante a menstruação, as mulheres têm necessidades de ferro mais elevadas. O ácido fólico é especialmente importante antes e durante a gravidez, pois contribui para o desenvolvimento saudável do sistema nervoso do feto.',
      },
      {
        titulo: 'Cálcio e vitamina D',
        texto:
          'Estes nutrientes são essenciais para a saúde óssea, particularmente relevantes na perimenopausa e menopausa, período em que o risco de osteoporose aumenta devido à diminuição do estrogénio.',
      },
      {
        titulo: 'Hábitos alimentares equilibrados',
        texto:
          'Uma dieta variada, rica em vegetais, frutas, proteína de boa qualidade e gorduras saudáveis, associada à hidratação adequada, ajuda a manter energia estável e a regular o ciclo hormonal.',
      },
    ],
  },
  {
    id: 'mental',
    nome: 'Saúde Mental',
    icone: 'happy-outline',
    cor: '#F57C00',
    corClara: '#FFF3E0',
    resumo: 'Bem-estar emocional e o impacto das hormonas no humor.',
    conteudo: [
      {
        titulo: 'Hormonas e humor',
        texto:
          'As variações hormonais ao longo do ciclo menstrual podem influenciar o humor, a energia e a irritabilidade — é o que se conhece popularmente como síndrome pré-menstrual (TPM), que afeta a maioria das mulheres em algum grau.',
      },
      {
        titulo: 'Quando procurar ajuda',
        texto:
          'Sintomas como tristeza persistente, ansiedade intensa ou alterações de humor que interferem significativamente no dia a dia merecem atenção profissional. Períodos como o pós-parto também exigem vigilância especial, devido ao risco de depressão pós-parto.',
      },
      {
        titulo: 'Hábitos que ajudam',
        texto:
          'Sono regular, atividade física, gestão do stress e manter relações sociais de apoio são fatores que contribuem positivamente para o equilíbrio emocional ao longo da vida.',
      },
    ],
  },
  {
    id: 'prevencao',
    nome: 'Exames Preventivos',
    icone: 'shield-checkmark-outline',
    cor: '#1976D2',
    corClara: '#E3F2FD',
    resumo: 'Exames de rotina que ajudam a detetar problemas a tempo.',
    conteudo: [
      {
        titulo: 'Citologia (Papanicolau)',
        texto:
          'É um exame de rastreio que permite detetar alterações nas células do colo do útero antes de se tornarem um problema grave, incluindo sinais precoces associados ao HPV. A periodicidade recomendada deve ser discutida com um profissional de saúde.',
      },
      {
        titulo: 'Exame da mama e mamografia',
        texto:
          'A autopalpação regular ajuda a conhecer o próprio corpo, mas não substitui os exames clínicos e a mamografia, que são as ferramentas mais eficazes para a deteção precoce do cancro da mama, especialmente a partir de determinadas idades.',
      },
      {
        titulo: 'Consultas de ginecologia regulares',
        texto:
          'Consultas periódicas permitem acompanhar a saúde reprodutiva, esclarecer dúvidas sobre contraceção e identificar precocemente qualquer alteração que necessite de tratamento.',
      },
    ],
  },
  {
    id: 'fertilidade',
    nome: 'Fertilidade',
    icone: 'leaf-outline',
    cor: '#388E3C',
    corClara: '#E8F5E9',
    resumo: 'Como funciona a janela fértil e o que pode influenciá-la.',
    conteudo: [
      {
        titulo: 'A janela fértil',
        texto:
          'A janela fértil corresponde aos dias do ciclo em que a probabilidade de conceção é maior — geralmente os dias que antecedem a ovulação e o próprio dia da ovulação, já que o óvulo permanece viável apenas durante um curto período.',
      },
      {
        titulo: 'Fatores que influenciam a fertilidade',
        texto:
          'Idade, peso, stress, tabagismo e determinadas condições de saúde (como síndrome do ovário poliquístico ou endometriose) podem influenciar a fertilidade. Um estilo de vida equilibrado ajuda a apoiar a saúde reprodutiva.',
      },
      {
        titulo: 'Quando procurar avaliação especializada',
        texto:
          'Se houver dificuldade em conceber após um período prolongado de tentativa (normalmente discutido com um profissional), pode ser útil procurar uma avaliação de fertilidade para identificar possíveis causas e opções.',
      },
    ],
  },
  {
    id: 'menopausa',
    nome: 'Menopausa',
    icone: 'sunny-outline',
    cor: '#E65100',
    corClara: '#FBE9E7',
    resumo: 'Uma fase natural de transição, com sintomas e cuidados próprios.',
    conteudo: [
      {
        titulo: 'O que é a menopausa',
        texto:
          'A menopausa marca o fim natural dos ciclos menstruais, geralmente diagnosticada após 12 meses consecutivos sem menstruação. É precedida por uma fase de transição chamada perimenopausa, onde os níveis hormonais começam a variar.',
      },
      {
        titulo: 'Sintomas comuns',
        texto:
          'Ondas de calor, alterações do sono, mudanças de humor e secura vaginal são sintomas frequentemente relatados, resultantes da diminuição do estrogénio. A intensidade varia bastante de mulher para mulher.',
      },
      {
        titulo: 'Cuidados nesta fase',
        texto:
          'Manter uma alimentação rica em cálcio e vitamina D, praticar exercício físico regular e fazer o acompanhamento médico são formas importantes de cuidar da saúde óssea, cardiovascular e emocional durante e após a menopausa.',
      },
    ],
  },
  {
    id: 'contracepcao',
    nome: 'Contraceção',
    icone: 'shield-half-outline',
    cor: '#5E35B1',
    corClara: '#EDE7F6',
    resumo: 'Métodos disponíveis e como escolher o mais adequado.',
    conteudo: [
      {
        titulo: 'Tipos de métodos contracetivos',
        texto:
          'Existem vários métodos contracetivos: hormonais (pílula, implante, DIU hormonal), de barreira (preservativo), DIU de cobre, e métodos permanentes. Cada um tem diferente eficácia, forma de uso e efeitos associados.',
      },
      {
        titulo: 'Como escolher o método adequado',
        texto:
          'A escolha do método contracetivo deve considerar o histórico de saúde, estilo de vida, planos reprodutivos futuros e preferências pessoais. Uma consulta com um profissional de saúde ajuda a encontrar a opção mais adequada.',
      },
      {
        titulo: 'Contraceção de emergência',
        texto:
          'A contraceção de emergência pode ser usada após uma relação sexual desprotegida ou falha do método habitual, mas não deve substituir um método contracetivo regular, sendo mais eficaz quanto mais cedo for utilizada.',
      },
    ],
  },
  {
    id: 'exercicio',
    nome: 'Exercício Físico',
    icone: 'barbell-outline',
    cor: '#0277BD',
    corClara: '#E1F5FE',
    resumo: 'Benefícios da atividade física em cada fase da vida.',
    conteudo: [
      {
        titulo: 'Benefícios gerais',
        texto:
          'A atividade física regular ajuda a regular o ciclo hormonal, melhora a saúde cardiovascular, fortalece os ossos e músculos, e tem um impacto positivo comprovado no humor e na gestão do stress.',
      },
      {
        titulo: 'Exercício durante a gravidez',
        texto:
          'Em gravidezes sem complicações, a atividade física moderada (como caminhada, natação ou yoga pré-natal) é geralmente segura e benéfica, mas deve ser sempre orientada por um profissional de saúde.',
      },
      {
        titulo: 'Adaptação ao longo do ciclo',
        texto:
          'A energia e disposição para o exercício podem variar ao longo do ciclo menstrual devido às flutuações hormonais. Ouvir o próprio corpo e ajustar a intensidade do treino pode tornar a prática mais sustentável.',
      },
    ],
  },
  {
    id: 'sono',
    nome: 'Sono e Bem-Estar',
    icone: 'moon-outline',
    cor: '#3949AB',
    corClara: '#E8EAF6',
    resumo: 'A importância do descanso para o equilíbrio hormonal e mental.',
    conteudo: [
      {
        titulo: 'Sono e hormonas',
        texto:
          'O sono de qualidade é essencial para a regulação hormonal. Alterações hormonais durante o ciclo menstrual, gravidez ou menopausa podem afetar a qualidade do sono, criando um ciclo que merece atenção.',
      },
      {
        titulo: 'Hábitos de higiene do sono',
        texto:
          'Manter horários regulares, evitar ecrãs antes de dormir, criar um ambiente escuro e fresco, e evitar cafeína à tarde são hábitos que favorecem um sono mais reparador.',
      },
      {
        titulo: 'Sono e saúde mental',
        texto:
          'A privação de sono está associada a maior irritabilidade, dificuldade de concentração e impacto negativo no humor. Cuidar do sono é, por isso, também uma forma de cuidar da saúde mental.',
      },
    ],
  },
];


// ===================================================================
// BANCO DE PERGUNTAS DO QUIZ
// Organizado por RONDA: cada ronda tem exatamente 1 pergunta de cada
// um dos 10 temas, garantindo variedade. 3 rondas x 10 perguntas = 30.
// ===================================================================

export const PERGUNTAS: Pergunta[] = [
  // ============================= RONDA 1 =============================
  {
    id: 1,
    temaId: 'ciclo',
    pergunta: 'Em média, quantos dias dura um ciclo menstrual?',
    opcoes: ['Entre 5 a 10 dias', 'Entre 21 a 35 dias', 'Exatamente 14 dias', 'Entre 40 a 60 dias'],
    respostaCorreta: 1,
    explicacao:
      'O ciclo menstrual costuma durar entre 21 e 35 dias, variando de pessoa para pessoa, sendo 28 dias apenas uma média de referência.',
    curiosidade: 'A palavra "menstruação" vem do latim "mensis", que significa mês — uma referência à sua regularidade aproximadamente mensal.',
  },
  {
    id: 2,
    temaId: 'gravidez',
    pergunta: 'Qual destes é um sinal inicial comum de gravidez?',
    opcoes: ['Aumento da menstruação', 'Atraso menstrual', 'Queda de cabelo súbita', 'Febre alta'],
    respostaCorreta: 1,
    explicacao: 'O atraso menstrual é um dos primeiros sinais frequentemente associados à gravidez.',
    curiosidade: 'A duração média de uma gravidez é de 40 semanas, contadas a partir do primeiro dia da última menstruação — e não do momento da conceção.',
  },
  {
    id: 3,
    temaId: 'nutricao',
    pergunta: 'Porque é que as mulheres têm, em geral, maior necessidade de ferro?',
    opcoes: [
      'Devido à perda de sangue durante a menstruação',
      'Porque comem menos carne',
      'Não há diferença em relação aos homens',
      'Porque praticam mais exercício',
    ],
    respostaCorreta: 0,
    explicacao: 'A perda de sangue menstrual aumenta a necessidade de ferro para evitar anemia.',
    curiosidade: 'Alimentos como feijão, espinafre e carnes vermelhas são boas fontes de ferro — combiná-los com vitamina C ajuda o corpo a absorvê-lo melhor.',
  },
  {
    id: 4,
    temaId: 'mental',
    pergunta: 'O que é a TPM (síndrome pré-menstrual)?',
    opcoes: [
      'Uma doença rara',
      'Alterações de humor e energia ligadas às variações hormonais do ciclo',
      'Um sinal sempre de gravidez',
      'Algo que só afeta adolescentes',
    ],
    respostaCorreta: 1,
    explicacao:
      'A TPM está relacionada com as variações hormonais do ciclo menstrual e afeta a maioria das mulheres em algum grau.',
    curiosidade: 'Estima-se que até 3 de cada 4 mulheres sintam algum sintoma de TPM em algum momento da vida reprodutiva.',
  },
  {
    id: 5,
    temaId: 'prevencao',
    pergunta: 'Para que serve a citologia (exame de Papanicolau)?',
    opcoes: [
      'Detetar alterações nas células do colo do útero',
      'Medir a tensão arterial',
      'Avaliar a visão',
      'Diagnosticar diabetes',
    ],
    respostaCorreta: 0,
    explicacao:
      'A citologia é um exame de rastreio que deteta precocemente alterações nas células do colo do útero, incluindo sinais associados ao HPV.',
    curiosidade: 'O exame recebe o nome do médico grego Georgios Papanikolaou, que o desenvolveu na década de 1920.',
  },
  {
    id: 6,
    temaId: 'fertilidade',
    pergunta: 'O que é a "janela fértil"?',
    opcoes: [
      'Qualquer dia do ciclo',
      'Os dias com maior probabilidade de conceção, à volta da ovulação',
      'Apenas o último dia do ciclo',
      'Um conceito sem relevância médica',
    ],
    respostaCorreta: 1,
    explicacao: 'A janela fértil corresponde aos dias com maior probabilidade de conceção, próximos da ovulação.',
    curiosidade: 'O óvulo permanece viável para fecundação durante apenas 12 a 24 horas após a ovulação, mas os espermatozoides podem sobreviver vários dias no corpo.',
  },
  {
    id: 7,
    temaId: 'menopausa',
    pergunta: 'Como se define geralmente a menopausa?',
    opcoes: [
      'Após 1 mês sem menstruar',
      'Após 12 meses consecutivos sem menstruação',
      'Apenas por sintomas físicos',
      'Não tem uma definição médica',
    ],
    respostaCorreta: 1,
    explicacao: 'A menopausa é geralmente diagnosticada após 12 meses consecutivos sem menstruação.',
    curiosidade: 'A idade média da menopausa natural situa-se entre os 45 e os 55 anos, mas pode variar bastante entre mulheres.',
  },
  {
    id: 8,
    temaId: 'contracepcao',
    pergunta: 'Qual destes é um exemplo de método contracetivo de barreira?',
    opcoes: ['Pílula', 'Preservativo', 'DIU hormonal', 'Implante'],
    respostaCorreta: 1,
    explicacao: 'O preservativo é o exemplo clássico de método contracetivo de barreira.',
    curiosidade: 'O preservativo é o único método contracetivo que também ajuda a prevenir a transmissão de infeções sexualmente transmissíveis.',
  },
  {
    id: 9,
    temaId: 'exercicio',
    pergunta: 'Qual destes é um benefício comprovado da atividade física regular?',
    opcoes: [
      'Não tem impacto na saúde hormonal',
      'Ajuda a regular o ciclo hormonal e melhora o humor',
      'Aumenta sempre o risco de lesões graves',
      'É prejudicial em qualquer fase da vida',
    ],
    respostaCorreta: 1,
    explicacao: 'A atividade física regular contribui para a regulação hormonal e para o bem-estar emocional.',
    curiosidade: 'O exercício físico estimula a libertação de endorfinas, conhecidas como as "hormonas da felicidade", que ajudam a reduzir o stress.',
  },
  {
    id: 10,
    temaId: 'sono',
    pergunta: 'Qual a relação entre sono e hormonas?',
    opcoes: [
      'Não existe qualquer relação',
      'O sono de qualidade é essencial para a regulação hormonal',
      'O sono só afeta o peso corporal',
      'As hormonas não influenciam o sono',
    ],
    respostaCorreta: 1,
    explicacao: 'O sono de qualidade é importante para a regulação hormonal, e esta também pode afetar o sono.',
    curiosidade: 'A maior parte da produção de melatonina, a hormona do sono, ocorre durante a noite e é sensível à exposição à luz artificial antes de dormir.',
  },

  // ============================= RONDA 2 =============================
  {
    id: 11,
    temaId: 'ciclo',
    pergunta: 'A ovulação ocorre, geralmente, em que fase do ciclo?',
    opcoes: ['No primeiro dia da menstruação', 'A meio do ciclo', 'Nunca tem um padrão', 'Apenas em ciclos irregulares'],
    respostaCorreta: 1,
    explicacao: 'A ovulação ocorre normalmente a meio do ciclo, quando o óvulo é libertado.',
    curiosidade: 'Algumas mulheres sentem uma ligeira dor de um dos lados da barriga durante a ovulação, conhecida informalmente como "dor do meio do ciclo" (mittelschmerz).',
  },
  {
    id: 12,
    temaId: 'gravidez',
    pergunta: 'Qual suplemento é especialmente recomendado antes e durante a gravidez?',
    opcoes: ['Vitamina C em altas doses', 'Ácido fólico', 'Cafeína', 'Proteína em pó'],
    respostaCorreta: 1,
    explicacao:
      'O ácido fólico é fundamental antes e durante a gravidez, contribuindo para o desenvolvimento saudável do sistema nervoso do feto.',
    curiosidade: 'Recomenda-se começar a tomar ácido fólico idealmente antes da conceção, já que o tubo neural do bebé se forma nas primeiras semanas de gravidez.',
  },
  {
    id: 13,
    temaId: 'nutricao',
    pergunta: 'Quais nutrientes são especialmente importantes na menopausa para a saúde óssea?',
    opcoes: ['Cálcio e vitamina D', 'Vitamina C apenas', 'Apenas proteína', 'Açúcares simples'],
    respostaCorreta: 0,
    explicacao:
      'O cálcio e a vitamina D ajudam a proteger a saúde óssea, especialmente relevante quando o estrogénio diminui na menopausa.',
    curiosidade: 'A pele produz vitamina D quando exposta à luz solar, mas muitas pessoas precisam também de a obter através da alimentação ou suplementação.',
  },
  {
    id: 14,
    temaId: 'mental',
    pergunta: 'Em que período é especialmente importante vigiar a saúde mental devido ao risco de depressão?',
    opcoes: ['Pós-parto', 'Apenas na adolescência', 'Apenas após os 60 anos', 'Não há período de maior risco'],
    respostaCorreta: 0,
    explicacao: 'O período pós-parto exige vigilância especial devido ao risco de depressão pós-parto.',
    curiosidade: 'A depressão pós-parto pode surgir em qualquer altura no primeiro ano após o parto, não apenas nas primeiras semanas.',
  },
  {
    id: 15,
    temaId: 'prevencao',
    pergunta: 'A autopalpação da mama substitui a mamografia?',
    opcoes: [
      'Sim, completamente',
      'Não, são complementares e a mamografia é mais eficaz na deteção precoce',
      'A mamografia já não é recomendada',
      'Nenhuma delas é necessária',
    ],
    respostaCorreta: 1,
    explicacao:
      'A autopalpação ajuda a conhecer o próprio corpo, mas não substitui os exames clínicos e a mamografia, mais eficazes na deteção precoce.',
    curiosidade: 'A mamografia consegue detetar alterações muito antes de serem palpáveis, por vezes anos antes de se tornarem percetíveis ao toque.',
  },
  {
    id: 16,
    temaId: 'fertilidade',
    pergunta: 'Qual destes fatores pode influenciar a fertilidade?',
    opcoes: ['Cor dos olhos', 'Idade e estilo de vida', 'Altura', 'Tipo de sangue'],
    respostaCorreta: 1,
    explicacao: 'A idade, o peso, o stress e hábitos como o tabagismo podem influenciar a fertilidade.',
    curiosidade: 'A reserva de óvulos de uma mulher é definida ainda antes do nascimento e diminui naturalmente ao longo da vida.',
  },
  {
    id: 17,
    temaId: 'menopausa',
    pergunta: 'Qual destes é um sintoma comum da menopausa?',
    opcoes: ['Ondas de calor', 'Crescimento acelerado de cabelo', 'Aumento da visão', 'Febre persistente'],
    respostaCorreta: 0,
    explicacao: 'As ondas de calor são um dos sintomas mais comuns associados à menopausa.',
    curiosidade: 'As ondas de calor podem durar entre alguns segundos e vários minutos, e a sua frequência varia muito de mulher para mulher.',
  },
  {
    id: 18,
    temaId: 'contracepcao',
    pergunta: 'O que deve ser considerado ao escolher um método contracetivo?',
    opcoes: [
      'Apenas o preço',
      'Histórico de saúde, estilo de vida e preferências pessoais',
      'A cor da embalagem',
      'Nenhum fator é relevante',
    ],
    respostaCorreta: 1,
    explicacao: 'A escolha do método deve considerar saúde, estilo de vida e preferências, idealmente com apoio médico.',
    curiosidade: 'Existem mais de 15 métodos contracetivos diferentes disponíveis atualmente, com eficácias e formas de uso muito distintas.',
  },
  {
    id: 19,
    temaId: 'exercicio',
    pergunta: 'O exercício moderado durante a gravidez é geralmente...',
    opcoes: [
      'Sempre proibido',
      'Seguro e benéfico em gravidezes sem complicações, com orientação médica',
      'Só permitido no último trimestre',
      'Irrelevante para a saúde da gestante',
    ],
    respostaCorreta: 1,
    explicacao: 'Em gravidezes sem complicações, o exercício moderado é geralmente seguro com acompanhamento adequado.',
    curiosidade: 'Atividades como caminhada, natação e yoga pré-natal são frequentemente recomendadas por serem de baixo impacto nas articulações.',
  },
  {
    id: 20,
    temaId: 'sono',
    pergunta: 'Qual destes hábitos favorece um sono mais reparador?',
    opcoes: [
      'Usar ecrãs até tarde na cama',
      'Manter horários regulares e evitar cafeína à tarde',
      'Dormir em ambiente muito iluminado',
      'Variar a hora de dormir todos os dias',
    ],
    respostaCorreta: 1,
    explicacao: 'Horários regulares e evitar cafeína à tarde são hábitos de higiene do sono recomendados.',
    curiosidade: 'A luz azul emitida por telemóveis e tablets pode atrasar a produção natural de melatonina, dificultando o adormecer.',
  },

  // ============================= RONDA 3 =============================
  {
    id: 21,
    temaId: 'ciclo',
    pergunta: 'Porque é útil monitorizar o ciclo menstrual?',
    opcoes: [
      'Não tem qualquer utilidade',
      'Só serve para quem quer engravidar',
      'Ajuda a identificar padrões normais e alterações a vigiar',
      'É apenas uma curiosidade sem valor médico',
    ],
    respostaCorreta: 2,
    explicacao:
      'Monitorizar o ciclo ajuda a conhecer o próprio corpo e a identificar precocemente irregularidades que possam merecer atenção médica.',
    curiosidade: 'Hoje existem aplicações e métodos simples (como calendários ou diários) que ajudam a registar padrões do ciclo ao longo dos meses.',
  },
  {
    id: 22,
    temaId: 'gravidez',
    pergunta: 'Qual a importância das consultas pré-natais?',
    opcoes: [
      'Servem apenas para marcar a data do parto',
      'Permitem monitorizar a saúde da mãe e do bebé ao longo da gestação',
      'São opcionais e raramente necessárias',
      'Só são importantes no último mês',
    ],
    respostaCorreta: 1,
    explicacao:
      'As consultas pré-natais regulares permitem acompanhar o desenvolvimento do bebé e detetar precocemente eventuais complicações.',
    curiosidade: 'As ecografias pré-natais permitem não só ver o desenvolvimento do bebé, mas também estimar a idade gestacional com boa precisão.',
  },
  {
    id: 23,
    temaId: 'nutricao',
    pergunta: 'O que caracteriza uma alimentação equilibrada para a saúde hormonal?',
    opcoes: [
      'Eliminar totalmente as gorduras',
      'Variedade de vegetais, frutas, proteína e gorduras saudáveis',
      'Comer apenas um tipo de alimento por dia',
      'Reduzir ao mínimo a ingestão de água',
    ],
    respostaCorreta: 1,
    explicacao: 'Uma dieta variada e equilibrada ajuda a manter energia estável e a regular o ciclo hormonal.',
    curiosidade: 'Algumas gorduras saudáveis, como as presentes no azeite e nos frutos secos, são importantes para a produção de hormonas no corpo.',
  },
  {
    id: 24,
    temaId: 'mental',
    pergunta: 'Qual destes hábitos ajuda a manter o equilíbrio emocional?',
    opcoes: ['Isolamento social', 'Sono irregular', 'Atividade física regular', 'Evitar qualquer rotina'],
    respostaCorreta: 2,
    explicacao: 'A atividade física regular, junto com sono adequado, contribui positivamente para o bem-estar emocional.',
    curiosidade: 'Manter ligações sociais positivas está associado a melhores níveis de bem-estar emocional ao longo da vida, em qualquer idade.',
  },
  {
    id: 25,
    temaId: 'prevencao',
    pergunta: 'Qual a vantagem de consultas de ginecologia regulares?',
    opcoes: [
      'Não trazem qualquer vantagem',
      'Permitem acompanhar a saúde reprodutiva e detetar problemas precocemente',
      'Servem apenas para quem está grávida',
      'São apenas para emergências',
    ],
    respostaCorreta: 1,
    explicacao:
      'Consultas regulares permitem acompanhar a saúde reprodutiva e identificar precocemente alterações que necessitem de tratamento.',
    curiosidade: 'Especialistas recomendam que a primeira consulta de ginecologia ocorra geralmente entre os 13 e os 15 anos, ou antes se houver alguma preocupação.',
  },
  {
    id: 26,
    temaId: 'fertilidade',
    pergunta: 'Quando pode ser útil procurar uma avaliação de fertilidade?',
    opcoes: [
      'Nunca é necessário',
      'Após dificuldade prolongada em conceber',
      'Apenas antes dos 20 anos',
      'Apenas se já tiver tido filhos',
    ],
    respostaCorreta: 1,
    explicacao: 'Dificuldade prolongada em conceber pode justificar uma avaliação especializada de fertilidade.',
    curiosidade: 'A avaliação de fertilidade pode envolver tanto a mulher como o parceiro, já que fatores de ambos podem influenciar a conceção.',
  },
  {
    id: 27,
    temaId: 'menopausa',
    pergunta: 'Que cuidados são especialmente importantes na menopausa?',
    opcoes: [
      'Reduzir ao mínimo a atividade física',
      'Cuidar da saúde óssea, cardiovascular e emocional',
      'Evitar todo o tipo de consultas médicas',
      'Não há cuidados especiais nesta fase',
    ],
    respostaCorreta: 1,
    explicacao: 'A saúde óssea, cardiovascular e emocional merecem atenção especial durante e após a menopausa.',
    curiosidade: 'Após a menopausa, o risco cardiovascular tende a aumentar, tornando ainda mais relevante manter hábitos de vida saudáveis.',
  },
  {
    id: 28,
    temaId: 'contracepcao',
    pergunta: 'A contraceção de emergência deve ser usada como...',
    opcoes: [
      'Método contracetivo regular',
      'Recurso pontual após falha do método habitual',
      'Substituto do preservativo a longo prazo',
      'Nenhuma das opções',
    ],
    respostaCorreta: 1,
    explicacao: 'A contraceção de emergência é um recurso pontual e não deve substituir um método regular.',
    curiosidade: 'A eficácia da contraceção de emergência diminui com o tempo, sendo mais eficaz quanto mais cedo for tomada após a relação desprotegida.',
  },
  {
    id: 29,
    temaId: 'exercicio',
    pergunta: 'Porque pode a disposição para o exercício variar ao longo do ciclo?',
    opcoes: [
      'Por acaso, sem motivo',
      'Devido às flutuações hormonais do ciclo menstrual',
      'Porque o exercício não tem relação com hormonas',
      'Apenas por falta de motivação',
    ],
    respostaCorreta: 1,
    explicacao: 'As flutuações hormonais ao longo do ciclo podem influenciar os níveis de energia e disposição.',
    curiosidade: 'Algumas atletas ajustam a intensidade dos treinos conforme a fase do ciclo em que se encontram, adaptando-se aos níveis de energia.',
  },
  {
    id: 30,
    temaId: 'sono',
    pergunta: 'A privação de sono está associada a...',
    opcoes: [
      'Melhor concentração',
      'Maior irritabilidade e dificuldade de concentração',
      'Nenhum efeito percetível',
      'Melhoria do humor',
    ],
    respostaCorreta: 1,
    explicacao: 'A privação de sono está associada a maior irritabilidade e dificuldade de concentração.',
    curiosidade: 'Adultos geralmente precisam de 7 a 9 horas de sono por noite para um funcionamento físico e mental adequado.',
  },
];

/**
 * Devolve as 10 perguntas correspondentes a uma ronda (1, 2 ou 3).
 * As perguntas já vêm organizadas em blocos de 10 no array PERGUNTAS,
 * por isso basta calcular o intervalo correto.
 */
export function obterPerguntasDaRonda(ronda: 1 | 2 | 3): import('../models/saude.model').Pergunta[] {
  const inicio = (ronda - 1) * 10;
  return PERGUNTAS.slice(inicio, inicio + 10);
}
