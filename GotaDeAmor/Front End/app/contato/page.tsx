'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import apiClient from '@/app/lib/api';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const response = await apiClient.createContact(formData);
    
    setLoading(false);

    if (response.success) {
      setSuccess(true);
      setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError(response.error || 'Erro ao enviar mensagem');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Contato</h1>
            <p className="text-gray-600 text-lg mb-4">
              Estamos prontos para atender você. Entre em contato conosco!
            </p>
            <div className="flex gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600">Início</a>
              <span>/</span>
              <span>Contato</span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Envie sua <span className="text-blue-600">Mensagem</span>
                </h2>

                {success && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                    ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                    ✗ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome completo *</label>
                      <Input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">E-mail *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefone</label>
                      <Input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(11) 99591-8455"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Assunto *</label>
                      <Select
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="voluntariado">Quero ser voluntário</option>
                        <option value="estagio">Oportunidade de estágio</option>
                        <option value="doacoes">Informações sobre doações</option>
                        <option value="parceria">Proposta de parceria</option>
                        <option value="imprensa">Imprensa</option>
                        <option value="outro">Outro assunto</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mensagem *</label>
                    <Textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Escreva sua mensagem aqui..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} size="lg" className="bg-blue-600 hover:bg-blue-700 w-full">
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Informações de <span className="text-pink-600">Contato</span>
                </h2>

                <div className="space-y-6">
                  {/* Endereço */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Endereço</h4>
                        <p className="text-gray-600">
                          Rua Franklin Ribeiro de Almeida, 282<br />
                          Jardim Catanduva - Campo Limpo<br />
                          São Paulo - SP, CEP 05758-110
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-600 text-white rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Telefone</h4>
                        <a href="tel:+5511995918455" className="text-blue-600 hover:underline">
                          (11) 99591-8455
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 text-white rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">E-mail</h4>
                        <a href="mailto:sociedadebeneficentegotadeamor@gmail.com" className="text-blue-600 hover:underline text-sm">
                          sociedadebeneficentegotadeamor@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Horário */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Horário de Atendimento</h4>
                        <p className="text-gray-600 text-sm">
                          Segunda a Sexta<br />
                          08h às 18h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
