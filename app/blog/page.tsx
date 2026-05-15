'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import apiClient from '@/app/lib/api';
import { Loader } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await apiClient.getPosts();
      
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        // Fallback - mostrar posts de exemplo se API não responder
        setPosts([
          {
            _id: '1',
            titulo: 'Campanha de Páscoa Solidária 2024',
            categoria: 'Evento',
            resumo: 'Nossa campanha de Páscoa distribuiu mais de 500 ovos de chocolate para crianças.',
            data: '15 de Março de 2024',
            visualizacoes: 150,
          },
          {
            _id: '2',
            titulo: 'Novos Voluntários: Turma de Janeiro',
            categoria: 'Voluntariado',
            resumo: 'Recebemos 25 novos voluntários em nossa equipe!',
            data: '28 de Fevereiro de 2024',
            visualizacoes: 200,
          },
          {
            _id: '3',
            titulo: 'Entrega de Cestas Básicas',
            categoria: 'Assistência',
            resumo: 'Em janeiro, distribuímos 200 cestas básicas para famílias em situação de vulnerabilidade.',
            data: '10 de Fevereiro de 2024',
            visualizacoes: 180,
          },
        ]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      'Evento': 'bg-blue-100 text-blue-700',
      'Voluntariado': 'bg-pink-100 text-pink-700',
      'Assistência': 'bg-yellow-100 text-yellow-700',
      'Educação': 'bg-purple-100 text-purple-700',
      'Parceria': 'bg-cyan-100 text-cyan-700',
    };
    return colors[categoria] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Postagens e Blog</h1>
            <p className="text-gray-600 text-lg mb-4">
              Acompanhe nossas notícias, eventos e histórias de transformação.
            </p>
            <div className="flex gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600">Início</a>
              <span>/</span>
              <span>Blog</span>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader className="animate-spin w-8 h-8 text-blue-600" />
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600">{error}</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-gray-600">Nenhum post encontrado</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {posts.map((post, index) => (
                    <article key={post._id || index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                      <div
                        className="h-48 bg-gradient-to-br flex items-center justify-center"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${['#3b82f6', '#ec4899', '#f59e0b'][index % 3]}, ${['#06b6d4', '#f472b6', '#fbbf24'][index % 3]})`,
                        }}
                      />
                      <div className="p-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getCategoryColor(post.categoria)}`}>
                          {post.categoria}
                        </span>
                        <p className="text-gray-500 text-sm mb-3">{post.data}</p>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.titulo}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.resumo}</p>
                        <Button asChild variant="outline" size="sm">
                          <a href="#">Ler mais</a>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-4">
                  <Button variant="outline" disabled>
                    Anterior
                  </Button>
                  <Button className="bg-blue-600">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">Próximo</Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
