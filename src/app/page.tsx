'use client';

import { useState } from 'react';
import { ArrowRight, Dumbbell, Apple, MessageCircle, Camera, TrendingUp, Users, Award, Zap, Target, Clock, Shield, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/39896da5-b6cd-4d42-9a6c-b31464452049.png" 
                alt="SHAPEZONE" 
                width={120} 
                height={120}
                className="drop-shadow-2xl"
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Zap className="w-4 h-4" />
              DESAFIO 15 DIAS
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Transforme Seu Corpo em 15 Dias
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Personal trainer + nutricionista + suporte 24/7. Tudo que você precisa para emagrecer, definir ou ganhar massa.
            </p>

            <Link 
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-sm text-gray-400 mt-4">
              ✓ Sem cartão de crédito • ✓ Resultados em 15 dias • ✓ 100% personalizado
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: <Users className="w-6 h-6" />, label: '+50k', sublabel: 'Transformações' },
              { icon: <Award className="w-6 h-6" />, label: '4.9★', sublabel: 'Avaliação' },
              { icon: <Target className="w-6 h-6" />, label: '15 dias', sublabel: 'Resultados' },
              { icon: <Clock className="w-6 h-6" />, label: '20-60min', sublabel: 'Por dia' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 text-center hover:border-orange-500 transition-all">
                <div className="text-orange-500 flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principais Dores Resolvidas */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4">
            Cansado de <span className="text-orange-500">não ver resultados</span>?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Sabemos exatamente o que você está passando. O SHAPEZONE foi criado para resolver suas maiores dores:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: '😤', title: 'Treina mas não vê resultado', solution: 'Treinos cientificamente comprovados' },
              { icon: '⏰', title: 'Não tem tempo', solution: 'Treinos de 20-60min adaptados à sua rotina' },
              { icon: '💰', title: 'Personal é caro', solution: 'Acompanhamento profissional por fração do preço' },
              { icon: '❓', title: 'Não sabe executar', solution: 'Correção de postura por foto/vídeo' },
              { icon: '😔', title: 'Falta motivação', solution: 'Coach motivacional 24/7' },
              { icon: '🍔', title: 'Dieta é difícil', solution: 'Plano alimentar personalizado e flexível' },
              { icon: '😞', title: 'Baixa autoestima', solution: 'Resultados visíveis em 15 dias' },
              { icon: '🤔', title: 'Muita informação confusa', solution: 'Plano claro e direto ao ponto' },
              { icon: '😢', title: 'Se sente sozinho', solution: 'Comunidade ativa e parceiros de treino' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2 text-red-400">{item.title}</h3>
                <p className="text-sm text-gray-400">✓ {item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">
            Tudo que você precisa em <span className="text-orange-500">um só lugar</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Dumbbell className="w-8 h-8" />,
                title: 'Treinos Personalizados',
                description: 'Planos adaptados ao seu objetivo, tempo e local. Musculação, HIIT, Yoga, Pilates e mais.',
                features: ['Vídeos demonstrativos', 'Técnica correta', 'Respiração guiada', 'Mobilidade pré-treino']
              },
              {
                icon: <Apple className="w-8 h-8" />,
                title: 'Dieta Inteligente',
                description: 'Cardápio personalizado com substituições, receitas e contador de calorias por foto.',
                features: ['Macros calculados', 'Receitas práticas', 'Substituições fáceis', 'Análise por foto']
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: 'Correção de Postura',
                description: 'Envie foto/vídeo do exercício e receba feedback profissional instantâneo.',
                features: ['Análise de postura', 'Correção de ângulos', 'Sugestões de ajuste', 'Alertas de risco']
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: 'Coach Profissional 24/7',
                description: 'Personal trainer e nutricionista sempre disponíveis para tirar dúvidas.',
                features: ['Linguagem humana', 'Motivação real', 'Sem robozinho', 'Suporte psicológico']
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Acompanhamento Completo',
                description: 'Dashboard com progresso, peso, medidas, treinos e evolução em tempo real.',
                features: ['Gráficos visuais', 'Fotos antes/depois', 'Medidas corporais', 'Streak de dias']
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Comunidade Ativa',
                description: 'Conecte-se, compartilhe progresso e encontre parceiros de treino na sua região.',
                features: ['Feed social', 'Parceiros locais', 'Desafios em grupo', 'Motivação coletiva']
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:scale-105 group"
              >
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, j) => (
                    <li key={j} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">
            Como <span className="text-orange-500">funciona</span>?
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '1',
                title: 'Quiz Personalizado',
                description: 'Responda perguntas sobre objetivo, tempo, local de treino, restrições alimentares e histórico de saúde'
              },
              {
                step: '2',
                title: 'Plano Criado para Você',
                description: 'Receba treino + dieta + rotina personalizados em segundos, adaptados 100% ao seu perfil'
              },
              {
                step: '3',
                title: 'Execute e Evolua',
                description: 'Siga o plano diário, tire dúvidas com o coach, corrija exercícios por foto e acompanhe progresso'
              },
              {
                step: '4',
                title: 'Resultados Reais em 15 Dias',
                description: 'Veja mudanças no corpo, energia, autoconfiança e condicionamento físico'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl font-black">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              Começar Minha Transformação
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">
            Resultados <span className="text-orange-500">Comprovados</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Maria Silva',
                age: 32,
                result: '-5kg em 15 dias',
                text: 'Finalmente encontrei algo que funciona! O coach é incrível, parece que tem alguém realmente cuidando de mim. Nunca me senti tão motivada!',
                rating: 5
              },
              {
                name: 'João Santos',
                age: 28,
                result: '+3kg de massa muscular',
                text: 'Treino em casa e achei que não ia dar resultado. Em 15 dias já vejo diferença no espelho! A correção de exercícios por foto mudou tudo.',
                rating: 5
              },
              {
                name: 'Ana Costa',
                age: 35,
                result: 'Definição visível',
                text: 'Estava tomando Ozempic mas queria algo natural. O suplemento que me indicaram junto com os treinos acelerou muito meus resultados!',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-orange-500 font-bold mb-2 text-lg">{testimonial.result}</p>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.age} anos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-orange-500/20 to-pink-600/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6">
            Pronto para sua transformação?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 50 mil pessoas que já transformaram seus corpos com o SHAPEZONE.
          </p>
          <Link 
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-12 py-5 rounded-xl font-bold text-xl shadow-2xl shadow-orange-500/50 transition-all duration-300 hover:scale-105"
          >
            Começar Agora
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            ✓ Sem compromisso • ✓ Cancele quando quiser • ✓ Resultados garantidos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 SHAPEZONE. Todos os direitos reservados.</p>
          <p className="mt-2">Transforme seu corpo. Transforme sua vida.</p>
        </div>
      </footer>
    </div>
  );
}
