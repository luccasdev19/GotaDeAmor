const Volunteer = require('../models/Volunteer');
const { sendEmail } = require('../config/email');

// POST - Registrar voluntário
exports.createVolunteer = async (req, res) => {
  try {
    const { nome, email, telefone, areaInteresse, disponibilidade, experiencia } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email || !telefone || !areaInteresse || !disponibilidade) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email, telefone, área de interesse e disponibilidade são obrigatórios',
      });
    }

    // Criar voluntário
    const volunteer = await Volunteer.create({
      nome,
      email,
      telefone,
      areaInteresse: Array.isArray(areaInteresse) ? areaInteresse : [areaInteresse],
      disponibilidade,
      experiencia,
    });

    // Enviar email de confirmação
    await sendEmail(
      email,
      'Obrigado por se oferecer como Voluntário - Gota de Amor',
      `
Olá ${nome},

Muito obrigado por se oferecer como voluntário! Sua disposição em ajudar é fundamental para a nossa missão.

Seus dados foram registrados com sucesso:
- Áreas de interesse: ${volunteer.areaInteresse.join(', ')}
- Disponibilidade: ${disponibilidade}

Em breve, um membro da nossa equipe entrará em contato com você para discutir as oportunidades de voluntariado.

Abraços,
Gota de Amor ONG
      `
    );

    // Enviar email para ONG
    const emailONG = process.env.SMTP_USER || 'admin@gotadeamor.com';
    await sendEmail(
      emailONG,
      'Novo Voluntário Registrado',
      `
Um novo voluntário se registrou!

Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Áreas de Interesse: ${volunteer.areaInteresse.join(', ')}
Disponibilidade: ${disponibilidade}
Experiência: ${experiencia || 'Não informada'}

Gerenciador: http://localhost:5000/admin/volunteers
      `
    );

    res.status(201).json({
      success: true,
      message: 'Voluntário registrado com sucesso!',
      volunteer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar voluntário',
      error: error.message,
    });
  }
};

// GET - Listar todos os voluntários (ADMIN)
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ dataInscricao: -1 });

    res.status(200).json({
      success: true,
      count: volunteers.length,
      volunteers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar voluntários',
      error: error.message,
    });
  }
};

// GET - Obter um voluntário específico (ADMIN)
exports.getVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Voluntário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar voluntário',
      error: error.message,
    });
  }
};

// PUT - Atualizar voluntário (ADMIN)
exports.updateVolunteer = async (req, res) => {
  try {
    const { status, ultimoContato } = req.body;

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status, ultimoContato },
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Voluntário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Voluntário atualizado com sucesso',
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar voluntário',
      error: error.message,
    });
  }
};

// DELETE - Deletar voluntário (ADMIN)
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Voluntário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Voluntário deletado com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar voluntário',
      error: error.message,
    });
  }
};
