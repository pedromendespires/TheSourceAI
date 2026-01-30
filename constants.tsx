
import React from 'react';
import { Brain, Heart } from 'lucide-react';

export const MEDITATIONS = [
  {
    id: "tuning-heart",
    title: "Tuning In With Your Heart",
    artist: "Genesis Frequency"
  },
  {
    id: "outpicturing",
    title: "Outpicturing-Meditation",
    artist: "Quantum Field"
  }
];

export const TRANSLATIONS = {
  pt: {
    title: "A Génese da Criação",
    badge: "Modelo de Manifestação Quântica",
    quote: '"Quando combina uma intenção clara com uma emoção elevada, envia uma nova assinatura eletromagnética para o Campo."',
    author: "— Dr. Joe Dispenza",
    intentionTitle: "Intenção Clara",
    intentionSubtitle: "(Pensamentos / Cérebro)",
    emotionTitle: "Emotion Elevada",
    emotionSubtitle: "(Sentimentos / Coração)",
    activateButton: "Activar Campo",
    analyseButton: "Análise Quântica",
    coherenceTitle: "Sintonia Quântica",
    brainModule: "Coerência Cerebral",
    brainQuote: '"Padrões de pensamento coerentes e focados."',
    heartModule: "Coerência Cardíaca",
    heartQuote: '"Ressonância emocional e gratidão elevada."',
    footerText: "O seu estado de ser é o resultado da união entre o que pensa e o que sente. Quando o cérebro e o coração trabalham em sintonia, o tempo colapsa e o futuro torna-se presente.",
    footerMeta: ["Espaço", "Tempo", "Matéria"],
    placeholder: "Adicionar...",
    initialIntentions: [
      { id: '1', text: 'Trabalhar a partir de qualquer sítio no mundo' },
      { id: '2', text: 'Ganhar o mesmo dinheiro ou mais' },
      { id: '3', text: 'Contratos por seis meses a um ano' },
      { id: '4', text: 'Amar o que faço' },
      { id: '5', text: 'Ser patrão de mim próprio e liderar a minha equipa' },
    ],
    initialEmotions: [
      { id: 'e1', text: 'Fortalecido' },
      { id: 'e2', text: 'Apaixonado pela vida' },
      { id: 'e3', text: 'Livre' },
      { id: 'e4', text: 'Grato' },
    ],
    inspire: "INSPIRE",
    hold: "SUSTENHA",
    expire: "EXPIRE"
  },
  en: {
    title: "The Genesis of Creation",
    badge: "Quantum Manifestation Model",
    quote: '"When you marry a clear intention with an elevated emotion, you broadcast a new electromagnetic signature into the Field."',
    author: "— Dr. Joe Dispenza",
    intentionTitle: "Clear Intention",
    intentionSubtitle: "(Thoughts / Brain)",
    emotionTitle: "Elevated Emotion",
    emotionSubtitle: "(Feelings / Heart)",
    activateButton: "Activate Field",
    analyseButton: "Quantum Analysis",
    coherenceTitle: "Quantum Tuning",
    brainModule: "Brain Coherence",
    brainQuote: '"Coherent and focused thought patterns."',
    heartModule: "Heart Coherence",
    heartQuote: '"Emotional resonance and elevated gratitude."',
    footerText: "Your state of being is the result of the union between what you think and what you feel. When the brain and heart work in sync, time collapses and the future becomes present.",
    footerMeta: ["Space", "Time", "Matter"],
    placeholder: "Add...",
    initialIntentions: [
      { id: '1', text: 'Work from anywhere in the world' },
      { id: '2', text: 'Earn the same money or more' },
      { id: '3', text: 'Six-month to one-year contracts' },
      { id: '4', text: 'Love what I do' },
      { id: '5', text: 'Be my own boss and lead my team' },
    ],
    initialEmotions: [
      { id: 'e1', text: 'Empowered' },
      { id: 'e2', text: 'In love with life' },
      { id: 'e3', text: 'Free' },
      { id: 'e4', text: 'Grateful' },
      { id: 'e5', text: 'Grateful' },
    ],
    inspire: "INHALE",
    hold: "HOLD",
    expire: "EXHALE"
  }
};

export const BRAIN_ICON = <Brain size={24} strokeWidth={1.5} />;
export const HEART_ICON = <Heart size={24} strokeWidth={1.5} />;
