const Contact = require('../models/Contact');
const { sendEmail } = require('../config/email');

// POST - Criar novo contato
exports.createContact = async (req, res) => {
  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email || !telefone || !assunto || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios',
      });
    }

    // Criar novo contato
    const contact = await Contact.create({
      nome,
      email,
      telefone,
      assunto,
      mensagem,
    });

    // Enviar email para a ONG
    const emailONG = process.env.SMTP_USER || 'admin@gotadeamor.com';
    await sendEmail(
      emailONG,
      `Nova Mensagem de Contato - ${assunto}`,
      `
Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Assunto: ${assunto}

Mensagem:
${mensagem}

---
Gerenciador: http://localhost:5000/admin
      `,
      `
<h2>Nova Mensagem de Contato</h2>
<p><strong>Nome:</strong> ${nome}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Telefone:</strong> ${telefone}</p>
<p><strong>Assunto:</strong> ${assunto}</p>
<hr/>
<p><strong>Mensagem:</strong></p>
<p>${mensagem}</p>
      `
    );

    // Enviar email de confirmação para o usuário
    await sendEmail(
      email,
      'Recebemos sua mensagem - Gota de Amor',
      `
Olá ${nome},

Obrigado por entrar em contato conosco! Recebemos sua mensagem e em breve um membro da nossa equipe retornará.

Seus dados:
- Assunto: ${assunto}
- Data: ${new Date().toLocaleDateString('pt-BR')}

Atenciosamente,
Gota de Amor ONG
      `
    );

    res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem',
      error: error.message,
    });
  }
};

// GET - Listar todos os contatos (ADMIN)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar contatos',
      error: error.message,
    });
  }
};

// GET - Obter um contato específico (ADMIN)
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contato não encontrado',
      });
    }

    // Marcar como lido
    contact.lido = true;
    await contact.save();

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar contato',
      error: error.message,
    });
  }
};

// DELETE - Deletar contato (ADMIN)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contato não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contato deletado com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar contato',
      error: error.message,
    });
  }
};
