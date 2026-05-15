'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import apiClient from '@/app/lib/api';
import { Heart, Home, Briefcase, Gift, Copy } from 'lucide-react';

export default function Doacoes() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    nomeDoador: '',
    valor: '',
    metodo: 'pix',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const pixKey = '00.000.000/0001-00';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const response = await apiClient.createDonation({
      nomeDoador: formData.nomeDoador,
      valor: parseFloat(formData.valor),
      metodo: formData.metodo as 'pix' | 'transferencia' | 'boleto',
    });

    setLoading(false);

    if (response.success) {
      setSuccess(true);
      setFormData({ nomeDoador: '', valor: '', metodo: 'pix' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError(response.error || 'Erro ao processar doação');
    }
  };

  const impactItems = [
    {
      icon: Home,
      value: 'R$ 50',
      description: 'Contribui para 1 cesta básica para uma família.',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Gift,
      value: 'R$ 100',
      description: 'Ajuda no material escolar de 2 crianças.',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      icon: Heart,
      value: 'R$ 200',
      description: 'Apoia as despesas de funcionamento por 1 dia.',
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      icon: Briefcase,
      value: 'Recorrente',
      description: 'Qualquer valor mensal garante continuidade dos projetos.',
      color: 'bg-cyan-100 text-cyan-700',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Faça uma Doação</h1>
            <p className="text-gray-600 text-lg mb-4">
              Sua contribuição transforma vidas. Cada gota de amor faz a diferença.
            </p>
            <div className="flex gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600">Início</a>
              <span>/</span>
              <span>Doações</span>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* PIX Section */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Doe via <span className="text-blue-600">Pix</span>
                </h2>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="120"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="mx-auto text-blue-700"
                    >
                      <rect width="5" height="5" x="3" y="3" rx="1" />
                      <rect width="5" height="5" x="16" y="3" rx="1" />
                      <rect width="5" height="5" x="3" y="16" rx="1" />
                      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                      <path d="M21 21v.01" />
                      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                      <path d="M3 12h.01" />
                      <path d="M12 3h.01" />
                      <path d="M12 16v.01" />
                      <path d="M16 12h1" />
                      <path d="M21 12v.01" />
                      <path d="M12 21v-1" />
                    </svg>
                  </div>
                  <p className="text-blue-900 font-semibold mb-2">QR Code Pix</p>
                  <p className="text-gray-600 text-sm mb-8">
                    Escaneie o código acima com o app do seu banco
                  </p>

                  <div>
                    <p className="font-semibold text-gray-700 mb-3">Ou copie a chave Pix:</p>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                      <code className="flex-1 text-sm font-mono">{pixKey}</code>
                      <button
                        onClick={handleCopyPix}
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Copiar"
                      >
                        <Copy className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    {copied && (
                      <p className="text-green-600 text-sm mt-2">✓ Chave copiada com sucesso!</p>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-8">
                  <h4 className="font-semibold text-yellow-700 mb-2">Outras formas de doar</h4>
                  <p className="text-sm text-yellow-600">
                    Você também pode fazer doações de alimentos, roupas, brinquedos e outros itens
                    diretamente em nossa sede. Entre em{' '}
                    <a href="/contato" className="underline font-semibold">
                      contato
                    </a>
                    para mais informações.
                  </p>
                </div>
              </div>

              {/* Impact Section */}
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Sua Doação <span className="text-pink-600">Transforma</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Cada contribuição, independente do valor, faz uma diferença real na vida de
                  famílias em situação de vulnerabilidade. Veja o impacto que sua doação pode ter:
                </p>

                <div className="space-y-4">
                  {impactItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className={`${item.color} p-6 rounded-lg flex gap-4`}>
                        <div className="flex-shrink-0">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold">{item.value}</h4>
                          <p className="text-sm opacity-90">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Registrar Doação</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  ✓ Doação registrada com sucesso! Obrigado por contribuir.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                  ✗ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Seu Nome *</label>
                  <Input
                    type="text"
                    name="nomeDoador"
                    value={formData.nomeDoador}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor (R$) *</label>
                    <Input
                      type="number"
                      name="valor"
                      value={formData.valor}
                      onChange={handleChange}
                      placeholder="100.00"
                      step="0.01"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Método *</label>
                    <select
                      name="metodo"
                      value={formData.metodo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="pix">Pix</option>
                      <option value="transferencia">Transferência Bancária</option>
                      <option value="boleto">Boleto</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" disabled={loading} size="lg" className="bg-pink-600 hover:bg-pink-700 w-full">
                  {loading ? 'Processando...' : 'Confirmar Doação'}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Suas informações de doação são processadas com segurança. Você receberá um recibo por e-mail.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Transparência e Prestação de Contas</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Acreditamos na transparência. Todos os recursos doados são aplicados diretamente nos
              projetos de assistência social, voluntariado e acolhimento. Você pode solicitar informações
              sobre a aplicação dos recursos a qualquer momento.
            </p>
            <Button asChild variant="outline" size="lg">
              <a href="/contato">Solicitar Relatório</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
