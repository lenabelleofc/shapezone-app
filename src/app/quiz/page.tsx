'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Zap } from 'lucide-react';
import { APP_NAME, GOALS, BODY_TYPES, MODALITIES, QUIZ_STEPS, BMI_RANGES, FITJARO_BLACK_INFO, FITJARO_BLACK_URL } from '@/lib/constants';
import type { UserProfile, Goal, BodyType, TrainingLocation, ExperienceLevel, Modality } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showFitjaroOffer, setShowFitjaroOffer] = useState(false);
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    gender: 'female',
    goal: 'weight_loss',
    targetBodyType: 'toned',
    experienceLevel: 'beginner',
    trainingLocation: 'home',
    availableTimePerDay: 30,
    preferredModalities: [],
    dietaryRestrictions: [],
    medications: [],
    usesWeightLossMeds: false,
    bmi: 0,
    idealWeight: 0
  });

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return BMI_RANGES.underweight;
    if (bmi < 25) return BMI_RANGES.normal;
    if (bmi < 30) return BMI_RANGES.overweight;
    return BMI_RANGES.obese;
  };

  const handleNext = () => {
    // Calcular IMC no step de dados básicos
    if (step === 0 && formData.weight && formData.height) {
      const bmi = calculateBMI(formData.weight, formData.height);
      setFormData({ ...formData, bmi });
    }

    // Mostrar oferta Fitjaro Black se objetivo for emagrecimento
    if (step === 6 && (formData.goal === 'weight_loss' || formData.goal === 'obesity_treatment')) {
      setShowFitjaroOffer(true);
      return;
    }

    if (step < QUIZ_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Salvar dados e redirecionar para dashboard
      localStorage.setItem('userProfile', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateFormData = (data: Partial<UserProfile>) => {
    setFormData({ ...formData, ...data });
  };

  const toggleModality = (modality: Modality) => {
    const current = formData.preferredModalities || [];
    if (current.includes(modality)) {
      updateFormData({ preferredModalities: current.filter(m => m !== modality) });
    } else {
      updateFormData({ preferredModalities: [...current, modality] });
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.name && formData.age && formData.weight && formData.height;
      case 1:
        return formData.goal;
      case 2:
        return formData.experienceLevel && formData.trainingLocation;
      case 3:
        return formData.availableTimePerDay;
      case 4:
        return formData.preferredModalities && formData.preferredModalities.length > 0;
      case 5:
        return true; // Saúde é opcional
      case 6:
        return formData.targetBodyType;
      default:
        return true;
    }
  };

  // Fitjaro Black Offer Modal
  if (showFitjaroOffer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-3xl border-2 border-green-500">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Zap className="w-4 h-4" />
              RECOMENDAÇÃO ESPECIAL
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Acelere seus resultados
            </h2>
            <p className="text-gray-300 text-lg">
              Baseado no seu objetivo de emagrecimento
            </p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-2xl mb-6">
            <h3 className="text-2xl font-bold text-green-400 mb-3">{FITJARO_BLACK_INFO.name}</h3>
            <p className="text-gray-300 mb-4">{FITJARO_BLACK_INFO.description}</p>
            
            <ul className="space-y-2 mb-6">
              {FITJARO_BLACK_INFO.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-yellow-200">
                <strong>💡 Perfeito para quem usa ou usou Ozempic/Mounjaro:</strong> Alternativa natural sem efeitos colaterais
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={FITJARO_BLACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105"
            >
              Quero Acelerar Resultados
            </a>
            <button
              onClick={() => {
                setShowFitjaroOffer(false);
                handleNext();
              }}
              className="flex-1 border-2 border-gray-700 hover:border-green-500 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300"
            >
              Continuar Sem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-6">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/39896da5-b6cd-4d42-9a6c-b31464452049.png" 
              alt="SHAPEZONE" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {APP_NAME}
            </h1>
            <p className="text-gray-400">Monte seu plano personalizado</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Passo {step + 1} de {QUIZ_STEPS.length}</span>
              <span className="text-sm text-orange-500 font-bold">{Math.round(((step + 1) / QUIZ_STEPS.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-300"
                style={{ width: `${((step + 1) / QUIZ_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Steps */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-3xl border border-gray-700 min-h-[500px] flex flex-col">
            
            {/* Step 0: Dados Básicos */}
            {step === 0 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Vamos começar com o básico</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData({ name: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Idade</label>
                      <input
                        type="number"
                        value={formData.age || ''}
                        onChange={(e) => updateFormData({ age: parseInt(e.target.value) })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Gênero</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => updateFormData({ gender: e.target.value as any })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="female">Feminino</option>
                        <option value="male">Masculino</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Peso (kg)</label>
                      <input
                        type="number"
                        value={formData.weight || ''}
                        onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Altura (cm)</label>
                      <input
                        type="number"
                        value={formData.height || ''}
                        onChange={(e) => updateFormData({ height: parseFloat(e.target.value) })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="165"
                      />
                    </div>
                  </div>

                  {formData.weight && formData.height && (
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                      <p className="text-sm text-gray-300 mb-1">Seu IMC:</p>
                      <p className="text-2xl font-bold text-orange-500">
                        {calculateBMI(formData.weight, formData.height).toFixed(1)}
                      </p>
                      <p className={`text-sm ${getBMICategory(calculateBMI(formData.weight, formData.height)).color}`}>
                        {getBMICategory(calculateBMI(formData.weight, formData.height)).label}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Objetivo */}
            {step === 1 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Qual é o seu objetivo?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(GOALS).map(([key, goal]) => (
                    <button
                      key={key}
                      onClick={() => updateFormData({ goal: key as Goal })}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        formData.goal === key
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-4xl mb-3">{goal.emoji}</div>
                      <h3 className="font-bold text-lg mb-1">{goal.label}</h3>
                      <p className="text-sm text-gray-400">{goal.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Experiência */}
            {step === 2 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Sua experiência com treinos</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Nível de experiência</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'beginner', label: 'Iniciante', desc: 'Pouca ou nenhuma experiência' },
                      { value: 'intermediate', label: 'Intermediário', desc: 'Treino há alguns meses' },
                      { value: 'advanced', label: 'Avançado', desc: 'Treino há anos' }
                    ].map((level) => (
                      <button
                        key={level.value}
                        onClick={() => updateFormData({ experienceLevel: level.value as ExperienceLevel })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.experienceLevel === level.value
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <p className="font-bold mb-1">{level.label}</p>
                        <p className="text-xs text-gray-400">{level.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Onde você vai treinar?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'gym', label: 'Academia', icon: '🏋️' },
                      { value: 'home', label: 'Em Casa', icon: '🏠' },
                      { value: 'outdoor', label: 'Ar Livre', icon: '🌳' },
                      { value: 'hybrid', label: 'Misto', icon: '🔄' }
                    ].map((location) => (
                      <button
                        key={location.value}
                        onClick={() => updateFormData({ trainingLocation: location.value as TrainingLocation })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.trainingLocation === location.value
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="text-3xl mb-2">{location.icon}</div>
                        <p className="font-bold">{location.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Disponibilidade */}
            {step === 3 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Quanto tempo você tem por dia?</h2>
                <p className="text-gray-400 mb-6">Vamos montar um treino que cabe na sua rotina</p>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium">Tempo disponível</label>
                      <span className="text-orange-500 font-bold">{formData.availableTimePerDay} minutos</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="15"
                      value={formData.availableTimePerDay}
                      onChange={(e) => updateFormData({ availableTimePerDay: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>15min</span>
                      <span>60min</span>
                      <span>120min</span>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <p className="text-sm text-orange-200">
                      💡 <strong>Dica:</strong> Treinos de 30-45 minutos são ideais para resultados consistentes sem comprometer sua rotina.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferências */}
            {step === 4 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Que tipo de treino você prefere?</h2>
                <p className="text-gray-400 mb-6">Selecione uma ou mais modalidades</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(MODALITIES).map(([key, modality]) => (
                    <button
                      key={key}
                      onClick={() => toggleModality(key as Modality)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        formData.preferredModalities?.includes(key as Modality)
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{modality.icon}</span>
                        {formData.preferredModalities?.includes(key as Modality) && (
                          <Check className="w-6 h-6 text-orange-500" />
                        )}
                      </div>
                      <p className="font-bold">{modality.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Saúde */}
            {step === 5 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Informações de saúde</h2>
                <p className="text-gray-400 mb-6">Isso nos ajuda a personalizar ainda mais seu plano</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Restrições alimentares (opcional)</label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions?.join(', ')}
                      onChange={(e) => updateFormData({ dietaryRestrictions: e.target.value.split(',').map(s => s.trim()) })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Ex: Lactose, glúten, vegetariano..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Usa ou já usou medicamentos para emagrecimento?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => updateFormData({ usesWeightLossMeds: true })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.usesWeightLossMeds
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => updateFormData({ usesWeightLossMeds: false })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          !formData.usesWeightLossMeds
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        Não
                      </button>
                    </div>
                    {formData.usesWeightLossMeds && (
                      <input
                        type="text"
                        value={formData.medications?.join(', ')}
                        onChange={(e) => updateFormData({ medications: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors mt-3"
                        placeholder="Ex: Ozempic, Mounjaro, Saxenda..."
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Corpo Ideal */}
            {step === 6 && (
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Que tipo de corpo você quer alcançar?</h2>
                <p className="text-gray-400 mb-6">Escolha a silhueta que mais se aproxima do seu objetivo</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(BODY_TYPES).map(([key, bodyType]) => (
                    <button
                      key={key}
                      onClick={() => updateFormData({ targetBodyType: key as BodyType })}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.targetBodyType === key
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {/* Silhueta visual simplificada */}
                      <div className="h-32 flex items-center justify-center mb-4">
                        <div className={`relative ${
                          key === 'athletic' ? 'w-20 h-28' :
                          key === 'lean' ? 'w-16 h-32' :
                          key === 'muscular' ? 'w-24 h-28' :
                          'w-18 h-30'
                        } bg-gradient-to-b from-orange-400 to-pink-500 rounded-full`}>
                          {/* Representação visual simplificada */}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{bodyType.label}</h3>
                      <p className="text-sm text-gray-400">{bodyType.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isStepValid()
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {step === QUIZ_STEPS.length - 1 ? 'Criar Meu Plano' : 'Continuar'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
