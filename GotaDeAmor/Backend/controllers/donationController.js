const Donation = require('../models/Donation');
const { sendEmail } = require('../config/email');

// Gerar ID Pix simulado
const generatePixComprovante = () => {
  return `PIX${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// POST - Criar nova doação
exports.createDonation = async (req, res) => {
  try {
    const { nomeDoador, emailDoador, telefoneDoador, valor, metodo } = req.body;

    // Validar valor
    if (!valor || valor < 1 || valor > 1000000) {
      return res.status(400).json({
        success: false,
        message: 'Valor da doação inválido (mínimo R$1, máximo R$1.000.000)',
      });
    }

    // Gerar comprovante Pix simulado
    const comprovante = generatePixComprovante();

    // Criar doação
    const donation = await Donation.create({
      nomeDoador: nomeDoador || 'Doador Anônimo',
      emailDoador,
      telefoneDoador,
      valor,
      metodo: metodo || 'pix',
      comprovante,
      status: 'confirmado',
      reciboDados: {
        dataRecebimento: new Date(),
        cnpj: process.env.PIX_KEY_CPNJ,
        razaoSocial: process.env.PIX_HOLDER_NAME,
      },
    });

    // Enviar email de recibo
    if (emailDoador) {
      const textoEmail = `
Obrigado por sua generosa doação à Gota de Amor!

======== COMPROVANTE DE DOAÇÃO ========
Valor: R$ ${valor.toFixed(2)}
Data: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}
Comprovante: ${comprovante}
Método: PIX
CNPJ: ${process.env.PIX_KEY_CPNJ}
Beneficiário: ${process.env.PIX_HOLDER_NAME}

Sua doação faz toda a diferença na vida das famílias que atendemos!

Gratidão,
Gota de Amor ONG
      `;

      await sendEmail(
        emailDoador,
        'Comprovante de Doação - Gota de Amor',
        textoEmail
      );
    }

    res.status(201).json({
      success: true,
      message: 'Doação registrada com sucesso!',
      donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar doação',
      error: error.message,
    });
  }
};

// GET - Listar todas as doações (ADMIN)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    // Calcular total doado
    const totalDoado = donations.reduce((sum, d) => sum + d.valor, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalDoado,
      donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar doações',
      error: error.message,
    });
  }
};

// GET - Obter estatísticas de doações (PUBLIC)
exports.getDonationStats = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'confirmado' });

    const totalDoado = donations.reduce((sum, d) => sum + d.valor, 0);
    const totalDoadores = donations.length;
    const mediaPorDoacao = donations.length > 0 ? totalDoado / donations.length : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalDoado: totalDoado.toFixed(2),
        totalDoadores,
        mediaPorDoacao: mediaPorDoacao.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas',
      error: error.message,
    });
  }
};

// DELETE - Deletar doação (ADMIN)
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Doação não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doação deletada com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar doação',
      error: error.message,
    });
  }
};
