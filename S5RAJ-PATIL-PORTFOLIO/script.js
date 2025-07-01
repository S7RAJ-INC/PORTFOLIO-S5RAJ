// ============================================
// Global Variables
// ============================================
let particleCanvas, particleCtx, particles = [];
let isLoading = false;

// ============================================
// Particle System
// ============================================
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = Math.random() > 0.5 ? '#00ffe7' : '#ff4f4f';
    this.opacity = Math.random() * 0.5 + 0.2;
    this.life = Math.random() * 100 + 50;
    this.maxLife = this.life;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    
    if (this.life <= 0) {
      this.reset();
    }
    
    this.opacity = (this.life / this.maxLife) * 0.7;
  }

  reset() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.life = this.maxLife;
  }

  draw() {
    particleCtx.save();
    particleCtx.globalAlpha = this.opacity;
    particleCtx.fillStyle = this.color;
    particleCtx.shadowBlur = 10;
    particleCtx.shadowColor = this.color;
    particleCtx.beginPath();
    particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    particleCtx.fill();
    particleCtx.restore();
  }
}

function initParticles() {
  particleCanvas = document.getElementById('particle-canvas');
  if (!particleCanvas) return;
  
  particleCtx = particleCanvas.getContext('2d');
  
  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(
      Math.random() * particleCanvas.width,
      Math.random() * particleCanvas.height
    ));
  }
  
  animateParticles();
}

function animateParticles() {
  if (!particleCtx) return;
  
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animateParticles);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(12, 15, 23, 0.95)';
      } else {
        navbar.style.background = 'rgba(12, 15, 23, 0.9)';
      }
    }
  });
}

// ============================================
// GSAP Animations
// ============================================
function initGSAPAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero animations
  if (document.querySelector('.hero')) {
    const tl = gsap.timeline();
    
    tl.from('.developer-avatar', {
      duration: 1.5,
      scale: 0,
      rotation: 180,
      ease: 'back.out(1.7)'
    })
    .from('.title-line', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.title-name', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.title-tagline', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-description', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.2')
    .from('.hero-buttons .btn', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.2');
  }
  
  // Stats counter animation
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(stat, {
          duration: 2,
          textContent: target,
          roundProps: 'textContent',
          ease: 'power2.out'
        });
      }
    });
  });
  
  // Service cards animation
  gsap.utils.toArray('.service-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  });
  
  // Timeline items animation
  gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%'
      },
      duration: 0.8,
      x: -50,
      opacity: 0,
      ease: 'power3.out'
    });
  });
  
  // Skill bars animation
  gsap.utils.toArray('.skill-progress').forEach(bar => {
    const progress = parseInt(bar.getAttribute('data-progress'));
    
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(bar, {
          duration: 1.5,
          width: `${progress}%`,
          ease: 'power2.out'
        });
      }
    });
  });
  
  // Project cards animation
  gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  });
  
  // Contact form animation
  if (document.querySelector('.contact-form')) {
    gsap.from('.form-group', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%'
      },
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
}

// ============================================
// Project Filtering
// ============================================
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            display: 'block',
            ease: 'power2.out'
          });
        } else {
          gsap.to(card, {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    
    if (isLoading) return;
    
    isLoading = true;
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    form.reset();
    
    isLoading = false;
    submitBtn.classList.remove('loading');
  });
}

// ============================================
// Notifications
// ============================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 2px solid var(--accent-cyan);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: var(--glow-cyan);
    z-index: 10000;
    transform: translateX(400px);
    transition: var(--transition-medium);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
  
  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

// ============================================
// Resume Download
// ============================================
function initResumeDownload() {
  const downloadBtn = document.querySelector('.download-btn');
  if (!downloadBtn) return;
  
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple PDF-like content
    const resumeContent = `
      S5RAJ PATIL - Full Stack Developer
      
      Contact: s5raj.patil@email.com | +1 (555) 123-4567
      Location: San Francisco, CA
      
      EXPERIENCE
      
      Senior Full Stack Developer (2022 - Present)
      TechCorp Solutions
      - Leading development of scalable web applications
      - Managed team of 5 developers
      - Improved performance by 40%
      
      Full Stack Developer (2020 - 2022)
      Digital Innovations
      - Developed multiple client projects
      - Collaborated with design teams
      
      SKILLS
      - Frontend: React, JavaScript, TypeScript, CSS
      - Backend: Node.js, Python, MongoDB, PostgreSQL
      - Cloud: AWS, Docker, CI/CD
      
      EDUCATION
      B.Tech in Computer Science (2014 - 2018)
      University of Technology
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'S5RAJ_PATIL_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Resume downloaded successfully!', 'success');
  });
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElement = document.querySelector('.hero');
    
    if (heroElement) {
      const rate = scrolled * -0.5;
      heroElement.style.transform = `translateY(${rate}px)`;
    }
  });
}

// ============================================
// Page Transitions
// ============================================
function initPageTransitions() {
  // Add loading animation when navigating
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-primary);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        
        overlay.innerHTML = `
          <div style="
            width: 50px;
            height: 50px;
            border: 3px solid var(--accent-cyan);
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            box-shadow: var(--glow-cyan);
          "></div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
}

// ============================================
// Form Enhancements
// ============================================
function initFormEnhancements() {
  // Add floating label effect
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on load
    if (input.value !== '') {
      input.parentElement.classList.add('focused');
    }
  });
  
  // Form validation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      
      form.querySelectorAll('.form-input[required]').forEach(input => {
        if (input.value.trim() === '') {
          isValid = false;
          input.style.borderColor = 'var(--accent-red)';
          input.style.boxShadow = 'var(--glow-red)';
        } else {
          input.style.borderColor = 'var(--accent-cyan)';
          input.style.boxShadow = 'var(--glow-cyan)';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showNotification('Please fill in all required fields.', 'error');
      }
    });
  });
}

// ============================================
// Utility Functions
// ============================================
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

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ============================================
// Performance Optimizations
// ============================================
function initPerformanceOptimizations() {
  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Optimize scroll events
  const optimizedScroll = throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-y', scrolled + 'px');
  }, 16);
  
  window.addEventListener('scroll', optimizedScroll);
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initParticles();
  initNavigation();
  initGSAPAnimations();
  initProjectFilter();
  initContactForm();
  initResumeDownload();
  initScrollEffects();
  initPageTransitions();
  initFormEnhancements();
  initPerformanceOptimizations();
  
  // Add loaded class to body for CSS transitions
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// ============================================
// Handle page visibility changes
// ============================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    particles.forEach(particle => {
      particle.speedX *= 0.1;
      particle.speedY *= 0.1;
    });
  } else {
    // Resume animations when tab becomes visible
    particles.forEach(particle => {
      particle.speedX *= 10;
      particle.speedY *= 10;
    });
  }
});