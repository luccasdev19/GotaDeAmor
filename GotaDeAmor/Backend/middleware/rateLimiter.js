const rateLimit = require('express-rate-limit');

// Rate limiter para endpoints públicos (requisições gerais)
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 requisições por IP em 15 minutos
  message: {
    success: false,
    message: 'Muitas requisições deste IP, tente novamente mais tarde.',
  },
  standardHeaders: true, // Retorna informações do rate limit nos headers
  legacyHeaders: false, // Desabilita o header `X-RateLimit-*`
});

// Rate limiter mais restritivo para criar contatos/doações (previne spam)
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Máximo 10 requisições por IP em 1 hora
  message: {
    success: false,
    message: 'Limite de requisições atingido. Tente novamente mais tarde.',
  },
  skipSuccessfulRequests: false,
});

// Rate limiter para login (proteção contra brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 tentativas de login em 15 minutos
  message: {
    success: false,
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  },
  skipSuccessfulRequests: true, // Não conta tentativas bem-sucedidas
});

// Rate limiter para endpoints admin (mais restritivo)
const adminLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 50, // Máximo 50 requisições por IP em 10 minutos
  message: {
    success: false,
    message: 'Limite de requisições para admin atingido.',
  },
});

module.exports = {
  publicLimiter,
  createLimiter,
  loginLimiter,
  adminLimiter,
};
