'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Eye, Target, Heart } from 'lucide-react';

export default function Sobre() {
  const timeline = [
    {
      year: '2001',
      title: 'Fundação',
      description: 'Início das atividades com um pequeno grupo de voluntários no Campo Limpo.',
    },
    {
      year: '2005',
      title: 'Primeira Sede',
      description: 'Inauguração da primeira sede própria, ampliando nossa capacidade de atendimento.',
    },
    {
      year: '2010',
      title: 'Programa de Voluntariado',
      description: 'Estruturação do programa de voluntariado, alcançando 100 voluntários ativos.',
    },
    {
      year: '2015',
      title: 'Parcerias Institucionais',
      description: 'Formalização de parcerias com empresas e instituições para ampliar o impacto.',
    },
    {
      year: '2020',
      title: 'Ação Solidária COVID-19',
      description: 'Mobilização emergencial para apoiar famílias afetadas pela pandemia.',
    },
    {
      year: '2024',
      title: 'Nova Fase',
      description: 'Expansão dos projetos e modernização para alcançar ainda mais pessoas.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
            <p className="text-gray-600 text-lg mb-4">
              Conheça a história e os valores que guiam nossa missão.
            </p>
            <div className="flex gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600">Início</a>
              <span>/</span>
              <span>Sobre</span>
            </div>
          </div>
        </section>

        {/* História */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Nossa <span className="text-blue-600">História</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  A Sociedade Beneficente Gota de Amor foi fundada em 2001, nascida do sonho de um grupo
                  de moradores do Campo Limpo que desejavam fazer a diferença na comunidade. O nome
                  "Gota de Amor" simboliza que cada pequena ação de bondade, assim como uma gota,
                  pode formar um oceano de transformação.
                </p>
                <p className="text-gray-700">
                  Ao longo de mais de duas décadas, crescemos de um pequeno grupo de voluntários para
                  uma organização estruturada que atende diversas famílias. Nossa jornada
                  é marcada por desafios superados, parcerias construídas e principalmente, vidas transformadas.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mascote%20Gota%20de%20Amor%20com%20cora%C3%A7%C3%A3o-WP3qYCMi2Gq5amPQqoU3UmrDCytspN.png"
                  alt="Mascote Gota de Amor"
                  className="w-64"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão, Valores */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Missão, Visão e Valores</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="inline-block bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Target className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Missão</h3>
                <p className="text-gray-600">
                  Nossa missão é promover o bem-estar social através de ações de voluntariado,
                  arrecadação de doações e programas de apoio comunitário, sempre guiados pelo
                  amor e pela solidariedade.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="inline-block bg-pink-100 text-pink-600 p-3 rounded-lg">
                    <Eye className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser referência no acolhimento de famílias em tratamento de saúde em São Paulo,
                  oferecendo cuidado, dignidade e esperança. A Gota de Amor busca ampliar seu impacto,
                  tornando-se um símbolo de solidariedade.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="inline-block bg-yellow-100 text-yellow-600 p-3 rounded-lg">
                    <Heart className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Valores</h3>
                <p className="text-gray-600">
                  Promover esperança e transformação, atuando com solidariedade no apoio a famílias
                  em situação de vulnerabilidade, sempre com empatia, compromisso e respeito à dignidade humana.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Nossa Trajetória</h2>
              <p className="text-gray-600 text-lg">
                Marcos importantes da nossa história de amor e dedicação.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="mb-8 pb-8 border-l-4 border-blue-600 pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full"></div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Faça Parte da Nossa História</h2>
            <p className="text-xl mb-8 text-blue-100">
              Sua participação é fundamental para continuarmos transformando vidas.
              Seja como voluntário ou doador, você faz a diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <a href="/acolhimento">Ser Voluntário</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <a href="/doacoes">Fazer Doação</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
