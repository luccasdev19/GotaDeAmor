'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Users, BookOpen, Calendar, Briefcase, Zap } from 'lucide-react';

export default function Acolhimento() {
  const areas = [
    {
      icon: Calendar,
      title: 'Eventos e Campanhas',
      description: 'Ajude na organização e execução de eventos beneficentes, bazares e campanhas de arrecadação.',
    },
    {
      icon: Users,
      title: 'Atendimento Social',
      description: 'Apoie no acolhimento e cadastramento de famílias, escuta ativa e encaminhamentos.',
    },
    {
      icon: BookOpen,
      title: 'Educação',
      description: 'Contribua com aulas de reforço escolar, oficinas educativas e atividades culturais.',
    },
    {
      icon: Briefcase,
      title: 'Administrativo',
      description: 'Apoie nas atividades administrativas, comunicação, redes sociais e captação de recursos.',
    },
    {
      icon: Heart,
      title: 'Logística',
      description: 'Ajude na triagem, organização e distribuição de doações para as famílias assistidas.',
    },
    {
      icon: Zap,
      title: 'Projetos Especiais',
      description: 'Participe de projetos sazonais como Natal Solidário, Páscoa e Dia das Crianças.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Acolhimento</h1>
            <p className="text-gray-600 text-lg mb-4">
              Venha fazer parte da nossa equipe de voluntários e estagiários.
            </p>
            <div className="flex gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600">Início</a>
              <span>/</span>
              <span>Acolhimento</span>
            </div>
          </div>
        </section>

        {/* Voluntariado */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Seja um <span className="text-blue-600">Voluntário</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  O voluntariado é o coração da Gota de Amor. Nossos voluntários dedicam seu tempo,
                  habilidades e amor para ajudar quem mais precisa. Não importa sua profissão ou
                  disponibilidade, há sempre uma forma de contribuir.
                </p>
                <p className="text-gray-700">
                  Como voluntário, você terá a oportunidade de participar de diversas atividades,
                  desde a distribuição de doações até o acompanhamento de famílias assistidas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-700 font-medium">Voluntários Ativos</div>
                </div>
                <div className="bg-pink-100 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">10+</div>
                  <div className="text-gray-700 font-medium">Áreas de Atuação</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Áreas de Voluntariado */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Áreas de Voluntariado</h2>
              <p className="text-gray-600 text-lg">Encontre a área que mais combina com você.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {areas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="inline-block bg-blue-100 text-blue-600 p-3 rounded-lg mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Pronto para Fazer a Diferença?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Preencha nosso formulário de candidatura e entraremos em contato para marcar uma conversa.
            </p>
            <Button asChild variant="secondary" size="lg">
              <a href="/contato">Envie sua Candidatura</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
