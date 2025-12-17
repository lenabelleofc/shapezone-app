'use client';

import { useState, useEffect } from 'react';
import { 
  Home, Dumbbell, Apple, MessageCircle, Users, User, 
  TrendingUp, Flame, Droplet, Award, Calendar, Camera,
  Play, Check, ChevronRight, Target, Clock, Zap, Plus,
  Settings, HelpCircle, MapPin, Upload, X
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Tab = 'home' | 'workout' | 'nutrition' | 'chat' | 'community' | 'profile';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [currentDay, setCurrentDay] = useState(1);
  const [streak, setStreak] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [todayWorkoutDone, setTodayWorkoutDone] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showExerciseCorrection, setShowExerciseCorrection] = useState(false);
  const [showCalorieCounter, setShowCalorieCounter] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      sender: 'coach',
      text: `Fala, ${userProfile?.name || 'campeão'}! 💪 Bem-vindo ao SHAPEZONE! Estou aqui pra te ajudar a alcançar seus objetivos. Bora começar?`,
      time: 'Agora'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      setCurrentDay(parsedProfile.progress || 1);
      setStreak(parsedProfile.streak || 0);
    }
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Adicionar mensagem do usuário
    const userMsg = {
      sender: 'user',
      text: newMessage,
      time: 'Agora'
    };
    setChatMessages(prev => [...prev, userMsg]);

    // Simular resposta do coach (em produção, seria uma chamada à API)
    setTimeout(() => {
      const coachResponse = generateCoachResponse(newMessage);
      setChatMessages(prev => [...prev, {
        sender: 'coach',
        text: coachResponse,
        time: 'Agora'
      }]);
    }, 1000);

    setNewMessage('');
  };

  const generateCoachResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('dor') || lowerMsg.includes('doendo')) {
      return 'Dor não é normal, mano! 🚨 Se tá doendo, para o exercício agora. Pode ser execução errada ou sobrecarga. Manda uma foto/vídeo do exercício que eu analiso pra você. Sua saúde vem primeiro!';
    }
    
    if (lowerMsg.includes('cansado') || lowerMsg.includes('desanimar')) {
      return 'Ei, sem essa de desanimar! 💪 Você já chegou até aqui, isso já é MUITO! Lembra porque você começou? Aquele corpo que você quer tá logo ali. Bora dar mais um passo hoje!';
    }
    
    if (lowerMsg.includes('dieta') || lowerMsg.includes('comida')) {
      return 'Dieta é 70% do resultado, mano! 🍎 Tá seguindo o plano? Se tiver dificuldade com algum alimento, me fala que a gente substitui. E lembra: um deslize não estraga tudo, só volta pro plano na próxima refeição!';
    }
    
    if (lowerMsg.includes('peso') || lowerMsg.includes('balança')) {
      return 'Calma com a balança! ⚖️ Peso oscila por vários motivos (água, músculo, etc). Foca nas medidas, nas fotos e em como você tá se sentindo. O espelho não mente!';
    }

    if (lowerMsg.includes('fitjaro') || lowerMsg.includes('suplemento') || lowerMsg.includes('emagrecer mais rápido')) {
      return `Quer acelerar os resultados? 🔥 O Fitjaro Black é uma opção natural que pode te ajudar a queimar gordura mais rápido, sem efeitos colaterais. Muita gente aqui usa e aprova! Quer saber mais? https://app.coinzz.com.br/links/690015c8aa337/68d32a1cd2f57`;
    }
    
    return 'Entendi! 💪 Vou te ajudar com isso. Pode detalhar mais sua dúvida? Quanto mais específico você for, melhor eu consigo te orientar!';
  };

  const renderHome = () => (
    <div className="space-y-6">
      {/* Header com Streak */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 rounded-2xl text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-black mb-1">Dia {currentDay} de 15</h2>
            <p className="text-white/80">Você está arrasando, {userProfile?.name}! 💪</p>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <Flame className="w-6 h-6 mx-auto mb-1" />
            <div className="text-2xl font-black">{streak}</div>
            <div className="text-xs">dias seguidos</div>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progresso do Desafio</span>
            <span>{Math.round((currentDay / 15) * 100)}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${(currentDay / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
          <Dumbbell className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{Math.max(0, currentDay - 1)}</div>
          <div className="text-xs text-gray-400">Treinos</div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
          <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-gray-400">Calorias hoje</div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
          <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userProfile?.weight || 0}kg</div>
          <div className="text-xs text-gray-400">Peso atual</div>
        </div>
      </div>

      {/* Treino do Dia */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Treino de Hoje</h3>
          {todayWorkoutDone ? (
            <span className="flex items-center gap-2 text-green-500 text-sm font-bold">
              <Check className="w-5 h-5" />
              Concluído
            </span>
          ) : (
            <span className="flex items-center gap-2 text-orange-500 text-sm font-bold">
              <Clock className="w-5 h-5" />
              Pendente
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">
                {userProfile?.modalities?.[0] === 'musculacao' ? 'Treino de Peito e Tríceps' :
                 userProfile?.modalities?.[0] === 'hiit' ? 'HIIT Queima Gordura' :
                 userProfile?.modalities?.[0] === 'yoga' ? 'Yoga Flow Iniciante' :
                 'Treino Funcional Completo'}
              </h4>
              <p className="text-sm text-gray-400">{userProfile?.timeAvailable || '45'} minutos • {userProfile?.experience || 'Intermediário'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-900/50 p-3 rounded-lg">
              <div className="text-gray-400 mb-1">Exercícios</div>
              <div className="font-bold">8 exercícios</div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg">
              <div className="text-gray-400 mb-1">Séries</div>
              <div className="font-bold">24 séries</div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('workout')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 py-3 rounded-xl font-bold transition-all"
          >
            <Play className="w-5 h-5" />
            Iniciar Treino
          </button>
        </div>
      </div>

      {/* Dieta do Dia */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Dieta de Hoje</h3>
          <button 
            onClick={() => setActiveTab('nutrition')}
            className="text-orange-500 text-sm font-bold hover:text-orange-400"
          >
            Ver completo →
          </button>
        </div>

        <div className="space-y-3">
          {[
            { meal: 'Café da Manhã', time: '07:00', cals: '350 kcal', done: false },
            { meal: 'Almoço', time: '12:00', cals: '550 kcal', done: false },
            { meal: 'Lanche', time: '16:00', cals: '200 kcal', done: false },
            { meal: 'Jantar', time: '19:00', cals: '450 kcal', done: false }
          ].map((meal, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                meal.done ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'
              }`}>
                {meal.done ? <Check className="w-5 h-5" /> : <Apple className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{meal.meal}</div>
                <div className="text-xs text-gray-400">{meal.time} • {meal.cals}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidratação */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Hidratação</h3>
          <span className="text-sm text-gray-400">{waterIntake * 250}ml / 2000ml</span>
        </div>

        <div className="flex gap-2 mb-4">
          {[...Array(8)].map((_, i) => (
            <button
              key={i}
              onClick={() => setWaterIntake(i + 1)}
              className={`flex-1 h-12 rounded-lg transition-all ${
                i < waterIntake 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <Droplet className="w-5 h-5 mx-auto" />
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400 text-center">
          {waterIntake >= 8 ? '✅ Meta atingida!' : `Faltam ${8 - waterIntake} copos`}
        </p>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('chat')}
          className="bg-gradient-to-br from-orange-500 to-pink-600 p-6 rounded-2xl text-left hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-8 h-8 mb-3" />
          <div className="font-bold">Falar com Coach</div>
          <div className="text-sm text-white/80">Tire suas dúvidas</div>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 rounded-2xl text-left hover:scale-105 transition-transform"
        >
          <Users className="w-8 h-8 mb-3" />
          <div className="font-bold">Comunidade</div>
          <div className="text-sm text-white/80">Veja o progresso</div>
        </button>
      </div>
    </div>
  );

  const renderWorkout = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Treino de Hoje</h2>
        <button 
          onClick={() => setShowExerciseCorrection(true)}
          className="text-orange-500 hover:text-orange-400"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Treino Info */}
      <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-6 rounded-2xl text-white">
        <h3 className="text-2xl font-black mb-2">
          {userProfile?.modalities?.[0] === 'musculacao' ? 'Peito e Tríceps' :
           userProfile?.modalities?.[0] === 'hiit' ? 'HIIT Queima Gordura' :
           userProfile?.modalities?.[0] === 'yoga' ? 'Yoga Flow' :
           'Treino Funcional'}
        </h3>
        <p className="text-white/80 mb-4">Treino focado em {userProfile?.goal === 'emagrecer' ? 'queima de gordura' : userProfile?.goal === 'ganhar_massa' ? 'hipertrofia' : 'definição'}</p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
            <Clock className="w-5 h-5 mx-auto mb-1" />
            <div className="font-bold">{userProfile?.timeAvailable?.split('-')[0] || '45'} min</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
            <Dumbbell className="w-5 h-5 mx-auto mb-1" />
            <div className="font-bold">8 exerc.</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center">
            <Flame className="w-5 h-5 mx-auto mb-1" />
            <div className="font-bold">450 kcal</div>
          </div>
        </div>
      </div>

      {/* Mobilidade e Ativação */}
      <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-500" />
          Mobilidade e Ativação (5 min)
        </h4>
        <p className="text-sm text-gray-400 mb-3">
          Faça antes do treino para melhor resultado e prevenir lesões:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Rotação de ombros - 10 repetições</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Alongamento de peito na parede - 30s cada lado</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Flexão e extensão de punhos - 10 repetições</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Ativação de core - prancha 30s</span>
          </li>
        </ul>
      </div>

      {/* Exercícios */}
      <div className="space-y-4">
        {[
          { 
            name: 'Supino Reto', 
            sets: '4x12', 
            rest: '60s', 
            muscle: 'Peito',
            technique: 'Barra na linha do mamilo, escápulas retraídas',
            breathing: 'Inspire na descida, expire no empurrar'
          },
          { 
            name: 'Supino Inclinado', 
            sets: '4x10', 
            rest: '60s', 
            muscle: 'Peito Superior',
            technique: 'Banco 30-45°, cotovelos 45° do corpo',
            breathing: 'Inspire descendo, expire subindo'
          },
          { 
            name: 'Crucifixo', 
            sets: '3x12', 
            rest: '45s', 
            muscle: 'Peito',
            technique: 'Cotovelos levemente flexionados, movimento amplo',
            breathing: 'Inspire abrindo, expire fechando'
          },
          { 
            name: 'Tríceps Testa', 
            sets: '4x12', 
            rest: '45s', 
            muscle: 'Tríceps',
            technique: 'Cotovelos fixos, movimento apenas do antebraço',
            breathing: 'Inspire descendo, expire estendendo'
          },
          { 
            name: 'Tríceps Corda', 
            sets: '3x15', 
            rest: '45s', 
            muscle: 'Tríceps',
            technique: 'Cotovelos colados ao corpo, extensão completa',
            breathing: 'Inspire voltando, expire empurrando'
          },
          { 
            name: 'Mergulho', 
            sets: '3x12', 
            rest: '60s', 
            muscle: 'Tríceps',
            technique: 'Corpo reto, descer até 90° nos cotovelos',
            breathing: 'Inspire descendo, expire subindo'
          },
          { 
            name: 'Flexão Diamante', 
            sets: '3x15', 
            rest: '45s', 
            muscle: 'Tríceps',
            technique: 'Mãos juntas formando diamante, corpo alinhado',
            breathing: 'Inspire descendo, expire subindo'
          },
          { 
            name: 'Prancha', 
            sets: '3x45s', 
            rest: '30s', 
            muscle: 'Core',
            technique: 'Corpo alinhado, abdômen contraído',
            breathing: 'Respiração contínua e controlada'
          }
        ].map((exercise, i) => (
          <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold">{exercise.name}</h4>
                <p className="text-sm text-gray-400">{exercise.muscle}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-orange-500 transition-colors flex items-center justify-center">
                <Play className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="text-xs text-gray-400">
                <strong className="text-orange-500">Técnica:</strong> {exercise.technique}
              </div>
              <div className="text-xs text-gray-400">
                <strong className="text-blue-500">Respiração:</strong> {exercise.breathing}
              </div>
            </div>
            
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-orange-500" />
                <span>{exercise.sets}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{exercise.rest} descanso</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Finalizar */}
      <button
        onClick={() => {
          setTodayWorkoutDone(true);
          if (currentDay < 15) {
            setCurrentDay(currentDay + 1);
            setStreak(streak + 1);
          }
          setActiveTab('home');
          
          // Atualizar localStorage
          const updatedProfile = {
            ...userProfile,
            progress: currentDay + 1,
            streak: streak + 1,
            workoutsCompleted: (userProfile?.workoutsCompleted || 0) + 1
          };
          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
          setUserProfile(updatedProfile);
        }}
        className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 py-4 rounded-xl font-bold text-lg transition-all"
      >
        Finalizar Treino
      </button>

      {/* Modal Correção de Exercícios */}
      {showExerciseCorrection && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Correção de Exercício</h3>
              <button onClick={() => setShowExerciseCorrection(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Envie uma foto ou vídeo curto do exercício e receba feedback profissional sobre:
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Postura e alinhamento</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Execução e técnica</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Angulação correta</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Alertas de risco</span>
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Enviar Foto/Vídeo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Dieta de Hoje</h2>
        <button 
          onClick={() => setShowCalorieCounter(true)}
          className="text-orange-500 hover:text-orange-400"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Macros */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-4">Metas Diárias</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
            <div className="text-2xl font-black mb-1">0</div>
            <div className="text-sm text-white/80">Calorias</div>
            <div className="text-xs text-white/60 mt-1">de 1800</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
            <div className="text-2xl font-black mb-1">0g</div>
            <div className="text-sm text-white/80">Proteína</div>
            <div className="text-xs text-white/60 mt-1">de 150g</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
            <div className="text-2xl font-black mb-1">0g</div>
            <div className="text-sm text-white/80">Gordura</div>
            <div className="text-xs text-white/60 mt-1">de 60g</div>
          </div>
        </div>
      </div>

      {/* Sugestão Fitjaro Black para quem quer emagrecer */}
      {userProfile?.goal === 'emagrecer' && (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 p-6 rounded-xl">
          <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Acelere Seus Resultados
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            <strong>Fitjaro Black</strong> é uma opção 100% natural para acelerar a queima de gordura e potencializar seus resultados, sem efeitos colaterais.
          </p>
          <a 
            href="https://app.coinzz.com.br/links/690015c8aa337/68d32a1cd2f57" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Conhecer Fitjaro Black
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Refeições */}
      <div className="space-y-4">
        {[
          {
            meal: 'Café da Manhã',
            time: '07:00',
            items: ['2 ovos mexidos', 'Pão integral (2 fatias)', 'Café com leite desnatado'],
            cals: 350,
            protein: 25,
            carbs: 35,
            fat: 12,
            done: false
          },
          {
            meal: 'Lanche da Manhã',
            time: '10:00',
            items: ['Whey protein (30g)', 'Banana média'],
            cals: 200,
            protein: 30,
            carbs: 25,
            fat: 2,
            done: false
          },
          {
            meal: 'Almoço',
            time: '12:30',
            items: ['Frango grelhado (150g)', 'Arroz integral (4 colheres)', 'Brócolis', 'Salada verde'],
            cals: 550,
            protein: 45,
            carbs: 60,
            fat: 10,
            done: false
          },
          {
            meal: 'Lanche da Tarde',
            time: '16:00',
            items: ['Iogurte grego natural', 'Granola (2 colheres)', 'Frutas vermelhas'],
            cals: 250,
            protein: 20,
            carbs: 30,
            fat: 8,
            done: false
          },
          {
            meal: 'Jantar',
            time: '19:30',
            items: ['Salmão grelhado (150g)', 'Batata doce (1 média)', 'Aspargos grelhados'],
            cals: 450,
            protein: 40,
            carbs: 35,
            fat: 18,
            done: false
          }
        ].map((meal, i) => (
          <div key={i} className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold">{meal.meal}</h4>
                <p className="text-sm text-gray-400">{meal.time}</p>
              </div>
              <button className={`w-10 h-10 rounded-full flex items-center justify-center ${
                meal.done ? 'bg-green-500' : 'bg-slate-700 hover:bg-green-500'
              } transition-colors`}>
                <Check className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 mb-3">
              {meal.items.map((item, j) => (
                <div key={j} className="text-sm text-gray-300">• {item}</div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-900/50 p-2 rounded text-center">
                <div className="text-orange-500 font-bold">{meal.cals}</div>
                <div className="text-gray-400">kcal</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded text-center">
                <div className="text-blue-500 font-bold">{meal.protein}g</div>
                <div className="text-gray-400">prot</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded text-center">
                <div className="text-yellow-500 font-bold">{meal.carbs}g</div>
                <div className="text-gray-400">carb</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded text-center">
                <div className="text-green-500 font-bold">{meal.fat}g</div>
                <div className="text-gray-400">gord</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Adicionar Refeição Própria */}
      <button
        onClick={() => setShowAddMeal(true)}
        className="w-full bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-orange-500 p-6 rounded-xl transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-orange-500"
      >
        <Plus className="w-5 h-5" />
        <span className="font-bold">Adicionar Refeição Própria</span>
      </button>

      {/* Modal Contador de Calorias */}
      {showCalorieCounter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Contador de Calorias</h3>
              <button onClick={() => setShowCalorieCounter(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Tire uma foto do seu prato e a análise identificará automaticamente:
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Alimentos presentes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Quantidades estimadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Calorias totais</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Macros (proteína, carbo, gordura)</span>
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" />
                Tirar Foto do Prato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Refeição */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Adicionar Refeição</h3>
              <button onClick={() => setShowAddMeal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Nome da Refeição</label>
                <input
                  type="text"
                  placeholder="Ex: Lanche pós-treino"
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Alimentos</label>
                <textarea
                  placeholder="Ex: Banana, pasta de amendoim, aveia..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-2">Calorias</label>
                  <input
                    type="number"
                    placeholder="300"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Proteína (g)</label>
                  <input
                    type="number"
                    placeholder="25"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button 
                onClick={() => setShowAddMeal(false)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 py-3 rounded-xl font-bold"
              >
                Adicionar à Dieta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Coach Profissional</h2>

      {/* Chat Interface */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Coach Alex</h3>
              <p className="text-sm text-white/80">Online agora</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 h-96 overflow-y-auto">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'coach' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Dumbbell className="w-4 h-4" />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-[80%] ${
                msg.sender === 'coach' 
                  ? 'bg-slate-700 rounded-tl-none' 
                  : 'bg-gradient-to-br from-orange-500 to-pink-600 rounded-tr-none'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
              <Camera className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={sendMessage}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-full font-bold text-sm transition-all"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => {
            setChatMessages(prev => [...prev, {
              sender: 'user',
              text: 'Tenho dúvidas sobre a execução dos exercícios',
              time: 'Agora'
            }]);
            setTimeout(() => {
              setChatMessages(prev => [...prev, {
                sender: 'coach',
                text: 'Beleza! Qual exercício tá te dando dúvida? Manda uma foto ou vídeo que eu analiso pra você e te dou um feedback completo sobre postura, técnica e respiração! 💪',
                time: 'Agora'
              }]);
            }, 1000);
          }}
          className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left"
        >
          <h4 className="font-bold mb-1">Dúvidas sobre exercícios</h4>
          <p className="text-xs text-gray-400">Técnica, execução, variações</p>
        </button>
        <button 
          onClick={() => {
            setChatMessages(prev => [...prev, {
              sender: 'user',
              text: 'Preciso ajustar meu treino',
              time: 'Agora'
            }]);
            setTimeout(() => {
              setChatMessages(prev => [...prev, {
                sender: 'coach',
                text: 'Sem problema! O que você quer ajustar? Intensidade, tempo, exercícios específicos? Me conta o que tá pegando que a gente resolve! 🔥',
                time: 'Agora'
              }]);
            }, 1000);
          }}
          className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left"
        >
          <h4 className="font-bold mb-1">Ajustar treino</h4>
          <p className="text-xs text-gray-400">Intensidade, tempo, exercícios</p>
        </button>
        <button 
          onClick={() => {
            setChatMessages(prev => [...prev, {
              sender: 'user',
              text: 'Tenho dúvidas sobre a dieta',
              time: 'Agora'
            }]);
            setTimeout(() => {
              setChatMessages(prev => [...prev, {
                sender: 'coach',
                text: 'Fala! Qual sua dúvida sobre a dieta? Quer substituir algum alimento, ajustar macros, ou precisa de receitas? Tô aqui pra te ajudar! 🍎',
                time: 'Agora'
              }]);
            }, 1000);
          }}
          className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left"
        >
          <h4 className="font-bold mb-1">Dúvidas sobre dieta</h4>
          <p className="text-xs text-gray-400">Substituições, macros, receitas</p>
        </button>
        <button 
          onClick={() => {
            setChatMessages(prev => [...prev, {
              sender: 'user',
              text: 'Preciso de motivação',
              time: 'Agora'
            }]);
            setTimeout(() => {
              setChatMessages(prev => [...prev, {
                sender: 'coach',
                text: 'Bora lá, guerreiro(a)! 💪🔥 Você já deu o primeiro passo, que é o mais difícil! Cada treino é uma vitória, cada dia é progresso. Lembra do seu objetivo? Você TÁ CHEGANDO LÁ! Não desiste agora, você é mais forte do que pensa!',
                time: 'Agora'
              }]);
            }, 1000);
          }}
          className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left"
        >
          <h4 className="font-bold mb-1">Motivação</h4>
          <p className="text-xs text-gray-400">Preciso de um empurrão!</p>
        </button>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Comunidade</h2>

      {/* Encontrar Parceiros */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 rounded-2xl text-white">
        <div className="flex items-start gap-4 mb-4">
          <MapPin className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Encontre Parceiros de Treino</h3>
            <p className="text-white/80 text-sm mb-4">
              Conecte-se com pessoas na sua região que também estão no desafio
            </p>
          </div>
        </div>
        <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5" />
          Buscar Parceiros Próximos
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {[
          {
            name: 'Carla Santos',
            username: '@carla_fit',
            time: '2h atrás',
            text: 'Dia 10 do desafio! Já perdi 4kg e me sentindo incrível! 🔥 Quem mais tá arrasando?',
            likes: 124,
            comments: 18
          },
          {
            name: 'Pedro Lima',
            username: '@pedrolima',
            time: '5h atrás',
            text: 'Primeiro treino completo sem parar! Obrigado Coach Alex pelas dicas! 💪 #ShapeZone',
            likes: 89,
            comments: 12
          },
          {
            name: 'Ana Oliveira',
            username: '@ana_shape',
            time: '1 dia atrás',
            text: 'Antes e depois de 15 dias! Não acredito na diferença! 😱 Valeu cada gota de suor!',
            likes: 342,
            comments: 56
          },
          {
            name: 'Lucas Martins',
            username: '@lucasmfit',
            time: '1 dia atrás',
            text: 'Dia 7 concluído! A disciplina tá virando hábito. Quem tá comigo? 🔥',
            likes: 67,
            comments: 8
          }
        ].map((post, i) => (
          <div key={i} className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-bold">
                {post.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{post.name}</h4>
                <p className="text-xs text-gray-400">{post.username} • {post.time}</p>
              </div>
            </div>

            <div className="px-4 pb-4">
              <p className="text-sm">{post.text}</p>
            </div>

            <div className="px-4 pb-4 flex items-center gap-6 text-sm border-t border-slate-700 pt-3">
              <button className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Award className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Meu Perfil</h2>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-6 rounded-2xl text-white text-center">
        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-black mx-auto mb-4">
          {userProfile?.name?.charAt(0) || '?'}
        </div>
        <h3 className="text-2xl font-black mb-1">{userProfile?.name || 'Usuário'}</h3>
        <p className="text-white/80">Dia {currentDay} do Desafio 15 Dias</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-3xl font-black mb-1">{streak}</div>
          <div className="text-sm text-gray-400">Dias seguidos</div>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-3xl font-black mb-1">{Math.max(0, currentDay - 1)}</div>
          <div className="text-sm text-gray-400">Treinos completos</div>
        </div>
      </div>

      {/* Progresso Corporal */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold mb-4">Progresso Corporal</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Peso</span>
              <span className="text-gray-400 font-bold">Inicial</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black">{userProfile?.weight || 0}kg</span>
              <span className="text-sm text-gray-400">Meta: {userProfile?.goal === 'emagrecer' ? '-5kg' : userProfile?.goal === 'ganhar_massa' ? '+3kg' : 'Definir'}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>IMC</span>
              <span className={`font-bold ${
                parseFloat(userProfile?.imc || '0') < 25 ? 'text-green-400' : 
                parseFloat(userProfile?.imc || '0') < 30 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {userProfile?.imcCategory || 'Calculando...'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black">{userProfile?.imc || '0'}</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 py-3 rounded-xl font-bold transition-all">
          Atualizar Medidas
        </button>
      </div>

      {/* Objetivo */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold mb-4">Seu Plano</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Objetivo:</span>
            <span className="font-bold capitalize">{userProfile?.goal?.replace('_', ' ') || 'Não definido'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Tempo disponível:</span>
            <span className="font-bold">{userProfile?.timeAvailable || '45'} min/dia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Local:</span>
            <span className="font-bold capitalize">{userProfile?.location || 'Não definido'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Experiência:</span>
            <span className="font-bold capitalize">{userProfile?.experience || 'Não definido'}</span>
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div className="space-y-3">
        <button className="w-full bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left flex items-center justify-between">
          <span className="font-bold">Editar Perfil</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left flex items-center justify-between">
          <span className="font-bold">Notificações</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            <span className="font-bold">Ajuda e Suporte</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-orange-500 transition-all text-left flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="font-bold">Configurações</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white pb-24">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/39896da5-b6cd-4d42-9a6c-b31464452049.png" 
              alt="SHAPEZONE" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-black">SHAPEZONE</h1>
              <p className="text-xs text-gray-400">Desafio 15 Dias</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-bold"
          >
            {userProfile?.name?.charAt(0) || '?'}
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'workout' && renderWorkout()}
          {activeTab === 'nutrition' && renderNutrition()}
          {activeTab === 'chat' && renderChat()}
          {activeTab === 'community' && renderCommunity()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {[
              { id: 'home', icon: Home, label: 'Início' },
              { id: 'workout', icon: Dumbbell, label: 'Treino' },
              { id: 'nutrition', icon: Apple, label: 'Dieta' },
              { id: 'chat', icon: MessageCircle, label: 'Coach' },
              { id: 'community', icon: Users, label: 'Social' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === tab.id ? 'text-orange-500' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="text-xs font-bold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
