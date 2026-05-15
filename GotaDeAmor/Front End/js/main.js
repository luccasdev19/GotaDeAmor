document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initDonationForm();
  initVolunteerForm();
  initCopyPix();
  initAnimations();
});

/*Mostrar toast notification */
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Desabilitar/habilitar botão com loading state
 */
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = `<span> Enviando...</span>`;
    button.style.opacity = '0.6';
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText;
    button.style.opacity = '1';
  }
}

/* MENU MOBILE */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  if (!menuToggle || !navMobile) return;
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMobile.classList.toggle('active');
    
    // Acessibilidade
    const isExpanded = navMobile.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });
  
  // Fechar menu ao clicar em um link
  const mobileLinks = navMobile.querySelectorAll('.nav-mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMobile.classList.remove('active');
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMobile.classList.remove('active');
    }
  });
}

/* SMOOTH SCROLL */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* FORMULÁRIO DE CONTATO */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.dataset.originalText = submitBtn.innerHTML;
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    // Resetar mensagens
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Coletar dados do formulário
    const formData = {
      nome: form.querySelector('#nome')?.value,
      email: form.querySelector('#email')?.value,
      telefone: form.querySelector('#telefone')?.value || '',
      assunto: form.querySelector('#assunto')?.value,
      mensagem: form.querySelector('#mensagem')?.value
    };
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        errorMessage.style.display = 'block';
      }
      return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, insira um email válido.';
        errorMessage.style.display = 'block';
      }
      return;
    }
    
    setButtonLoading(submitBtn, true);
    
    try {
      const result = await enviarContato(formData.nome, formData.email, formData.telefone, formData.assunto, formData.mensagem);
      
      if (result.success) {
        if (successMessage) {
          successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve. ✅';
          successMessage.style.display = 'block';
        }
        
        form.reset();
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
          if (successMessage) successMessage.style.display = 'none';
        }, 5000);
      } else {
        if (errorMessage) {
          errorMessage.textContent = result.message || 'Erro ao enviar mensagem.';
          errorMessage.style.display = 'block';
        }
      }
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = 'Erro na requisição: ' + error.message;
        errorMessage.style.display = 'block';
      }
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });
  
  // Máscara de telefone
  const telefoneInput = form.querySelector('#telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        if (value.length > 2) {
          value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 10) {
          value = value.substring(0, 10) + '-' + value.substring(10);
        }
      }
      
      e.target.value = value;
    });
  }
}

/* FORMULÁRIO DE DOAÇÃO */

function initDonationForm() {
  const form = document.getElementById('donation-form');
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.dataset.originalText = submitBtn.innerHTML;
    const successMessage = document.getElementById('donation-success');
    const errorMessage = document.getElementById('donation-error');
    
    // Resetar mensagens
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Coletar dados
    const valor = form.querySelector('#valor')?.value;
    const nomeDoador = form.querySelector('#nome-doador')?.value || null;
    const emailDoador = form.querySelector('#email-doador')?.value || null;
    const telefoneDoador = form.querySelector('#telefone-doador')?.value || null;
    
    // Validações
    if (!valor || valor < 1) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, insira um valor válido (mínimo R$1,00).';
        errorMessage.style.display = 'block';
      }
      return;
    }
    
    setButtonLoading(submitBtn, true);
    
    try {
      const result = await enviarDoacao(parseFloat(valor), nomeDoador, emailDoador, telefoneDoador);
      
      if (result.success) {
        if (successMessage) {
          successMessage.innerHTML = `
            <div style="margin-bottom: 10px;">✅ Doação registrada com sucesso!</div>
            <div style="font-size: 0.9em;">Comprovante: <strong>${result.donation.comprovante}</strong></div>
            ${emailDoador ? '<div style="font-size: 0.9em; margin-top: 5px;">📧 Comprovante enviado para seu email</div>' : ''}
          `;
          successMessage.style.display = 'block';
        }
        form.reset();
        
        // Esconder após 5 segundos
        setTimeout(() => {
          if (successMessage) successMessage.style.display = 'none';
        }, 5000);
      } else {
        if (errorMessage) {
          errorMessage.textContent = result.message || 'Erro ao processar doação.';
          errorMessage.style.display = 'block';
        }
      }
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = 'Erro na requisição: ' + error.message;
        errorMessage.style.display = 'block';
      }
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });
  
  // Máscara de moeda
  const valorInput = form.querySelector('#valor');
  if (valorInput) {
    valorInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = (value / 100).toFixed(2);
      e.target.value = value;
    });
  }
}

/*FORMULÁRIO DE VOLUNTARIADO */

function initVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.dataset.originalText = submitBtn.innerHTML;
    const successMessage = document.getElementById('volunteer-success');
    const errorMessage = document.getElementById('volunteer-error');
    
    // Resetar mensagens
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Coletar dados
    const nome = form.querySelector('#nome')?.value;
    const email = form.querySelector('#email')?.value;
    const telefone = form.querySelector('#telefone')?.value;
    const areaInteresse = form.querySelector('#area-interesse')?.value;
    const disponibilidade = form.querySelector('#disponibilidade')?.value;
    const experiencia = form.querySelector('#experiencia')?.value || null;
    
    // Validações
    if (!nome || !email || !telefone || !areaInteresse || !disponibilidade) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        errorMessage.style.display = 'block';
      }
      return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, insira um email válido.';
        errorMessage.style.display = 'block';
      }
      return;
    }
    
    setButtonLoading(submitBtn, true);
    
    try {
      const result = await registrarVoluntario(nome, email, telefone, areaInteresse, disponibilidade, experiencia);
      
      if (result.success) {
        if (successMessage) {
          successMessage.innerHTML = `
            <div>✅ Inscrição realizada com sucesso!</div>
            <div style="font-size: 0.9em; margin-top: 5px;">📧 Você receberá um email de confirmação em breve.</div>
          `;
          successMessage.style.display = 'block';
        }
        form.reset();
        
        // Esconder após 5 segundos
        setTimeout(() => {
          if (successMessage) successMessage.style.display = 'none';
        }, 5000);
      } else {
        if (errorMessage) {
          errorMessage.textContent = result.message || 'Erro ao registrar voluntário.';
          errorMessage.style.display = 'block';
        }
      }
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = 'Erro na requisição: ' + error.message;
        errorMessage.style.display = 'block';
      }
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });
  
  // Máscara de telefone
  const telefoneInput = form.querySelector('#telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        if (value.length > 2) {
          value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 10) {
          value = value.substring(0, 10) + '-' + value.substring(10);
        }
      }
      
      e.target.value = value;
    });
  }
}

/* ========================================
   COPIAR CHAVE PIX
   ======================================== */

function initCopyPix() {
  const copyButtons = document.querySelectorAll('.copy-pix-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async function() {
      const pixKey = this.dataset.pix;
      const feedback = this.closest('.pix-key')?.querySelector('.copy-feedback') || 
                       document.getElementById('copy-feedback');
      
      try {
        await navigator.clipboard.writeText(pixKey);
        
        // Mudar ícone do botão
        const originalHTML = this.innerHTML;
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        this.style.color = '#28A745';
        
        // Mostrar feedback
        if (feedback) {
          feedback.classList.add('show');
        }
        
        // Restaurar após 2 segundos
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.style.color = '';
          if (feedback) {
            feedback.classList.remove('show');
          }
        }, 2000);
        
      } catch (err) {
        // Fallback para navegadores antigos
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
          document.execCommand('copy');
          if (feedback) {
            feedback.textContent = 'Chave copiada!';
            feedback.classList.add('show');
            setTimeout(() => feedback.classList.remove('show'), 2000);
          }
        } catch (e) {
          if (feedback) {
            feedback.textContent = 'Erro ao copiar';
            feedback.classList.add('show');
          }
        }
        
        document.body.removeChild(textArea);
      }
    });
  });
}

/* ========================================
   ANIMAÇÕES DE SCROLL
   ======================================== */

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos com classe .animate
  const animatedElements = document.querySelectorAll('.animate');
  animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   UTILITÁRIOS
   ======================================== */

// Formatar número para exibição
function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR').format(num);
}

// Debounce para eventos de scroll/resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Adicionar classe ao header no scroll
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 10));
}
