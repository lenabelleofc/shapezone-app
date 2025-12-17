'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Target, Clock, MapPin, Dumbbell, Apple, Pill, TrendingUp, User, Scale, Ruler } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    
    // Objetivos e preferências
    goal: '',
    timeAvailable: '',
    location: '',
    modalities: [] as string[],
    experience: '',
    
    // Saúde e alimentação
    restrictions: [] as string[],
    medications: '',
    supplements: ''
  });

  const totalSteps = 10;

  const calculateIMC = () => {
    if (formData.weight && formData.height) {
      const weightNum = parseFloat(formData.weight);
      const heightNum = parseFloat(formData.height) / 100; // converter cm para m
      const imc = weightNum / (heightNum * heightNum);
      return imc.toFixed(1);
    }
    return null;
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-400' };
    if (imc < 25) return { label: 'Peso normal', color: 'text-green-400' };
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-400' };
    return { label: 'Obesidade', color: 'text-red-400' };
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calcular IMC e salvar dados
      const imc = calculateIMC();
      const profileData = {
        ...formData,
        imc,
        imcCategory: imc ? getIMCCategory(parseFloat(imc)).label : null,
        createdAt: new Date().toISOString(),
        progress: 0,
        streak: 0,
        workoutsCompleted: 0
      };
      
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArray = (key: string, value: string) => {
    setFormData(prev => {
      const array = prev[key as keyof typeof prev] as string[];
      const newArray = array.includes(value)
        ? array.filter(item => item !== value)
        : [...array, value];
      return { ...prev, [key]: newArray };
    });
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.age && formData.gender;
      case 3: return formData.weight && formData.height;
      case 4: return formData.goal;
      case 5: return formData.timeAvailable;
      case 6: return formData.location;
      case 7: return formData.modalities.length > 0;
      case 8: return formData.experience;
      case 9: return formData.restrictions.length > 0;
      case 10: return formData.medications;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/39896da5-b6cd-4d42-9a6c-b31464452049.png" 
            alt="SHAPEZONE" 
            className="h-20 w-auto"
          />
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
            
            {/* Step 1: Nome */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <User className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Qual é o seu nome?</h2>
                  <p className="text-gray-400">Vamos personalizar sua experiência</p>
                </div>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Idade e Gênero */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <User className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Idade e Gênero</h2>
                  <p className="text-gray-400">Para personalizar seus treinos</p>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Idade</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    placeholder="Ex: 28"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3">Gênero</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'masculino', label: 'Masculino', emoji: '👨' },
                      { value: 'feminino', label: 'Feminino', emoji: '👩' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData('gender', option.value)}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          formData.gender === option.value
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div className="font-bold">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Peso e Altura */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Scale className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Peso e Altura</h2>
                  <p className="text-gray-400">Vamos calcular seu IMC automaticamente</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      placeholder="Ex: 75"
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Altura (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                      placeholder="Ex: 175"
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {formData.weight && formData.height && (
                  <div className="bg-gradient-to-br from-orange-500/20 to-pink-600/20 border border-orange-500/30 p-6 rounded-xl">
                    <h3 className="font-bold mb-2">Seu IMC</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-black text-orange-500">{calculateIMC()}</div>
                      <div className={`text-lg font-bold ${getIMCCategory(parseFloat(calculateIMC() || '0')).color}`}>
                        {getIMCCategory(parseFloat(calculateIMC() || '0')).label}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Objetivo */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Qual é o seu objetivo?</h2>
                  <p className="text-gray-400">Vamos criar o plano perfeito para você</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { value: 'emagrecer', label: 'Emagrecer', emoji: '🔥', desc: 'Perder gordura e definir o corpo' },
                    { value: 'ganhar_massa', label: 'Ganhar Massa', emoji: '💪', desc: 'Aumentar músculos e força' },
                    { value: 'definir', label: 'Definir', emoji: '⚡', desc: 'Tonificar e definir músculos' },
                    { value: 'saude', label: 'Saúde Geral', emoji: '❤️', desc: 'Melhorar condicionamento físico' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('goal', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.goal === option.value
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.emoji}</span>
                        <div>
                          <div className="font-bold text-lg">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Tempo Disponível */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Quanto tempo você tem por dia?</h2>
                  <p className="text-gray-400">Vamos adaptar os treinos para sua rotina</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { value: '20-30', label: '20-30 minutos', desc: 'Treinos rápidos e intensos' },
                    { value: '30-45', label: '30-45 minutos', desc: 'Treinos moderados' },
                    { value: '45-60', label: '45-60 minutos', desc: 'Treinos completos' },
                    { value: '60+', label: 'Mais de 60 minutos', desc: 'Treinos avançados' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('timeAvailable', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.timeAvailable === option.value
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-bold text-lg">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Local de Treino */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Onde você vai treinar?</h2>
                  <p className="text-gray-400">Adaptaremos os exercícios para o local</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { value: 'academia', label: 'Academia', emoji: '🏋️', desc: 'Acesso a equipamentos completos' },
                    { value: 'casa', label: 'Em Casa', emoji: '🏠', desc: 'Treinos com peso corporal' },
                    { value: 'ar_livre', label: 'Ar Livre', emoji: '🌳', desc: 'Parques e ruas' },
                    { value: 'hibrido', label: 'Híbrido', emoji: '🔄', desc: 'Varia conforme o dia' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('location', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.location === option.value
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.emoji}</span>
                        <div>
                          <div className="font-bold text-lg">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Modalidades */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Dumbbell className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Que tipo de treino você prefere?</h2>
                  <p className="text-gray-400">Pode escolher mais de um</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'musculacao', label: 'Musculação', emoji: '💪' },
                    { value: 'hiit', label: 'HIIT', emoji: '🔥' },
                    { value: 'funcional', label: 'Funcional', emoji: '⚡' },
                    { value: 'yoga', label: 'Yoga', emoji: '🧘' },
                    { value: 'pilates', label: 'Pilates', emoji: '🤸' },
                    { value: 'aerobio', label: 'Aeróbio', emoji: '🏃' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => toggleArray('modalities', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.modalities.includes(option.value)
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">{option.emoji}</span>
                        <div className="font-bold text-sm">{option.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Experiência */}
            {step === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <TrendingUp className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Qual sua experiência com treino?</h2>
                  <p className="text-gray-400">Vamos ajustar a intensidade</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { value: 'iniciante', label: 'Iniciante', emoji: '🌱', desc: 'Nunca treinei ou parei há muito tempo' },
                    { value: 'intermediario', label: 'Intermediário', emoji: '💪', desc: 'Treino há alguns meses' },
                    { value: 'avancado', label: 'Avançado', emoji: '🔥', desc: 'Treino regularmente há mais de 1 ano' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('experience', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.experience === option.value
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.emoji}</span>
                        <div>
                          <div className="font-bold text-lg">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Restrições Alimentares */}
            {step === 9 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Apple className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Tem alguma restrição alimentar?</h2>
                  <p className="text-gray-400">Vamos adaptar sua dieta</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { value: 'nenhuma', label: 'Nenhuma', emoji: '✅' },
                    { value: 'vegetariano', label: 'Vegetariano', emoji: '🥗' },
                    { value: 'vegano', label: 'Vegano', emoji: '🌱' },
                    { value: 'lactose', label: 'Intolerância à Lactose', emoji: '🥛' },
                    { value: 'gluten', label: 'Intolerância ao Glúten', emoji: '🌾' },
                    { value: 'outras', label: 'Outras', emoji: '📝' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => toggleArray('restrictions', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.restrictions.includes(option.value)
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.emoji}</span>
                        <div className="font-bold text-lg">{option.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 10: Medicamentos e Suplementos */}
            {step === 10 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Pill className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black mb-2">Usa medicamentos ou suplementos?</h2>
                  <p className="text-gray-400">Isso ajuda a personalizar seu plano</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { value: 'nenhum', label: 'Não uso nada', desc: 'Método 100% natural' },
                    { value: 'ozempic', label: 'Ozempic/Mounjaro', desc: 'Ajustaremos a dieta' },
                    { value: 'suplementos', label: 'Suplementos (Whey, Creatina, etc)', desc: 'Otimizaremos o uso' },
                    { value: 'outros', label: 'Outros medicamentos', desc: 'Informe ao coach' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('medications', option.value)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.medications === option.value
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-bold text-lg">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Sugestão Fitjaro Black */}
                {formData.goal === 'emagrecer' && (formData.medications === 'nenhum' || formData.medications === 'ozempic') && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl">
                    <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                      <span>💡</span> Sugestão Natural para Acelerar Resultados
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      <strong>Fitjaro Black</strong> é uma alternativa 100% natural para acelerar a queima de gordura e perda de peso, sem efeitos colaterais.
                      {formData.medications === 'ozempic' && ' Perfeito para quem busca alternativas naturais ao Ozempic/Mounjaro.'}
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
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-700 hover:border-slate-600 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
              >
                {step === totalSteps ? 'Finalizar e Criar Meu Plano' : 'Próximo'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
