/* ========================================
   GOTA DE AMOR - JavaScript Principal
   Versão: HTML/CSS/JS Puro
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initCopyPix();
  initAnimations();
});

/* ========================================
   MENU MOBILE
   ======================================== */

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

/* ========================================
   SMOOTH SCROLL
   ======================================== */

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

/* ========================================
   FORMULÁRIO DE CONTATO
   ======================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    // Resetar mensagens
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
    
    // Coletar dados do formulário
    const formData = {
      nome: form.querySelector('#nome').value,
      email: form.querySelector('#email').value,
      telefone: form.querySelector('#telefone')?.value || '',
      assunto: form.querySelector('#assunto').value,
      mensagem: form.querySelector('#mensagem').value
    };
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        errorMessage.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      if (errorMessage) {
        errorMessage.textContent = 'Por favor, insira um email válido.';
        errorMessage.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }
    
    try {
      // Simular envio (substituir por chamada real à API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sucesso
      if (successMessage) {
        successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        successMessage.style.display = 'block';
      }
      
      form.reset();
      
      // Esconder mensagem após 5 segundos
      setTimeout(() => {
        if (successMessage) successMessage.style.display = 'none';
      }, 5000);
      
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
        errorMessage.style.display = 'block';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
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
