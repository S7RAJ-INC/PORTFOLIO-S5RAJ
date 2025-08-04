// GSAP Animation Configurations
const GSAPAnimations = {
  // Hero animations
  initHeroAnimations() {
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
    }, '-=0.3');
  },

  // Service cards animation
  initServiceAnimations() {
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
  },

  // Project cards animation
  initProjectAnimations() {
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
  }
};
