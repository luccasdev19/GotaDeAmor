'use client';

import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Users, Home as HomeIcon, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Hero Text */}
              <div>
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 text-sm font-semibold">
                  <Heart className="inline-block mr-2 w-4 h-4" />
                  Desde 2001 transformando vidas
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Sociedade Beneficente <span className="text-blue-600">Gota de Amor</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Somos uma organização sem fins lucrativos dedicada a acolher, apoiar e transformar
                  vidas na comunidade de Campo Limpo, São Paulo. Cada gota de amor faz a diferença.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                    <Link href="/doacoes">
                      <Heart className="mr-2 w-5 h-5" />
                      Fazer uma Doação
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/acolhimento">Seja Voluntário</Link>
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mascote%20Gota%20de%20Amor%20com%20cora%C3%A7%C3%A3o-WP3qYCMi2Gq5amPQqoU3UmrDCytspN.png"
                  alt="Mascote Gota de Amor"
                  className="w-full max-w-xs md:max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Quem Somos: Nossa <span className="text-blue-600">Missão</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  A Sociedade Beneficente Gota de Amor nasceu do desejo de fazer a diferença na vida
                  das pessoas mais vulneráveis da nossa comunidade. Desde 2001, trabalhamos incansavelmente
                  para oferecer acolhimento, suporte e esperança.
                </p>
                <p className="text-gray-700 mb-8">
                  Nossa missão é promover o bem-estar social através de ações de voluntariado,
                  arrecadação de doações e programas de apoio comunitário, sempre guiados pelo
                  amor e pela solidariedade.
                </p>
                <Button asChild variant="default">
                  <Link href="/sobre">
                    Conheça Nossa História
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">23+</div>
                  <div className="text-gray-700 font-medium">Anos de Atuação</div>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">5.000+</div>
                  <div className="text-gray-700 font-medium">Famílias Atendidas</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">200+</div>
                  <div className="text-gray-700 font-medium">Voluntários Ativos</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">50+</div>
                  <div className="text-gray-700 font-medium">Parceiros</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Nossas Áreas de Atuação</h2>
              <p className="text-gray-600 text-lg">
                Conheça os principais projetos e iniciativas da Gota de Amor para a comunidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="inline-block bg-blue-100 text-blue-600 p-3 rounded-lg mb-4">
                  <HomeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Assistência Social</h3>
                <p className="text-gray-600">
                  A ONG distribui alimentos para famílias vulneráveis do bairro, combatendo a insegurança
                  alimentar e melhorando as condições de vida da comunidade.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="inline-block bg-pink-100 text-pink-600 p-3 rounded-lg mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Acolhimento</h3>
                <p className="text-gray-600">
                  A organização acolhe famílias que vêm a São Paulo para tratamento médico sem condições
                  financeiras, oferecendo suporte essencial.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="inline-block bg-yellow-100 text-yellow-600 p-3 rounded-lg mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Voluntariado</h3>
                <p className="text-gray-600">
                  Voluntários dedicam seu tempo para ajudar quem mais precisa, participando de diversas
                  atividades de apoio comunitário.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Faça Parte da Nossa História</h2>
            <p className="text-xl mb-8 text-blue-100">
              Sua participação é fundamental para continuarmos transformando vidas.
              Seja como voluntário ou doador, você faz a diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/acolhimento">Ser Voluntário</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/doacoes">Fazer Doação</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
