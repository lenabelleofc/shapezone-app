// Constantes do SHAPEZONE

import { Goal, BodyType, Modality } from './types';

export const APP_NAME = 'SHAPEZONE';
export const TAGLINE = 'Desafio 15 Dias no Shape';
export const PRICE = 34.90;
export const COMPANY_PRICE = 197;
export const COMMISSION_RATE = 0.65;

export const GOALS: Record<Goal, { label: string; description: string; emoji: string }> = {
  muscle_gain: {
    label: 'Ganhar Massa Muscular',
    description: 'Hipertrofia e ganho de força',
    emoji: '💪'
  },
  weight_loss: {
    label: 'Emagrecer',
    description: 'Perda de gordura e definição',
    emoji: '🔥'
  },
  obesity_treatment: {
    label: 'Tratar Obesidade',
    description: 'Transformação completa e saúde',
    emoji: '🎯'
  },
  cellulite_reduction: {
    label: 'Reduzir Celulite',
    description: 'Tonificação e firmeza',
    emoji: '✨'
  },
  toning: {
    label: 'Diminuir Flacidez',
    description: 'Fortalecimento e definição',
    emoji: '💎'
  },
  definition: {
    label: 'Definição Muscular',
    description: 'Corpo definido e atlético',
    emoji: '⚡'
  }
};

export const BODY_TYPES: Record<BodyType, { label: string; description: string }> = {
  athletic: {
    label: 'Atlético',
    description: 'Corpo forte e funcional'
  },
  lean: {
    label: 'Magro Definido',
    description: 'Baixo percentual de gordura'
  },
  muscular: {
    label: 'Musculoso',
    description: 'Massa muscular desenvolvida'
  },
  toned: {
    label: 'Tonificado',
    description: 'Definição e proporção'
  }
};

export const MODALITIES: Record<Modality, { label: string; icon: string }> = {
  weightlifting: { label: 'Musculação', icon: '🏋️' },
  pilates: { label: 'Pilates', icon: '🧘' },
  yoga: { label: 'Yoga', icon: '🕉️' },
  cardio: { label: 'Aeróbico', icon: '🏃' },
  hiit: { label: 'HIIT', icon: '⚡' },
  functional: { label: 'Funcional', icon: '🤸' }
};

export const MOTIVATIONAL_PHRASES = [
  'Sem desculpas. Só resultados.',
  'Você não vai falhar hoje.',
  'A dor de hoje é a força de amanhã.',
  'Seu corpo aguenta. É a sua mente que precisa convencer.',
  'Cada treino é uma vitória.',
  'Você está mais perto do que imagina.',
  'Desistir não é uma opção.',
  'Transformação não tem atalho.',
  'Seja mais forte que suas desculpas.',
  'O shape dos seus sonhos está a 15 dias de distância.'
];

export const BREATHING_TIPS = {
  push: 'Expire na força (empurrar/levantar)',
  pull: 'Inspire na descida, expire na subida',
  core: 'Mantenha o core contraído, respire pelo diafragma',
  cardio: 'Respiração ritmada: 2 tempos inspira, 2 tempos expira',
  yoga: 'Respiração profunda e consciente pelo nariz'
};

export const FITJARO_BLACK_URL = 'https://app.coinzz.com.br/links/690015c8aa337/68d32a1cd2f57';

export const FITJARO_BLACK_INFO = {
  name: 'FITJARO BLACK',
  description: 'Acelerador natural de emagrecimento e queima de gordura',
  benefits: [
    '100% natural',
    'Sem efeitos colaterais',
    'Acelera metabolismo',
    'Reduz gordura localizada',
    'Alternativa natural ao Ozempic/Mounjaro'
  ]
};

export const QUIZ_STEPS = [
  'Dados Básicos',
  'Objetivo',
  'Experiência',
  'Disponibilidade',
  'Preferências',
  'Saúde',
  'Corpo Ideal'
];

export const BMI_RANGES = {
  underweight: { max: 18.5, label: 'Abaixo do peso', color: 'text-blue-600' },
  normal: { min: 18.5, max: 24.9, label: 'Peso normal', color: 'text-green-600' },
  overweight: { min: 25, max: 29.9, label: 'Sobrepeso', color: 'text-yellow-600' },
  obese: { min: 30, label: 'Obesidade', color: 'text-red-600' }
};

export const TESTIMONIALS = [
  {
    name: 'Ana Silva',
    age: 28,
    result: 'Perdi 8kg em 15 dias',
    text: 'Eu pagava R$180 de academia e não via resultado. Com o SHAPEZONE por R$34,90, tive mais progresso em 15 dias do que em 6 meses de academia.',
    rating: 5
  },
  {
    name: 'Carlos Mendes',
    age: 35,
    result: 'Ganhei 4kg de massa',
    text: 'Personal particular custava R$300/sessão. Aqui tenho correção de exercícios, dieta personalizada e treino adaptado por menos de R$35.',
    rating: 5
  },
  {
    name: 'Juliana Costa',
    age: 32,
    result: 'Reduzi 12cm de cintura',
    text: 'O app entende meu objetivo, monta treino que cabe na minha rotina e ainda corrige minha postura nos exercícios. Incrível!',
    rating: 5
  }
];
