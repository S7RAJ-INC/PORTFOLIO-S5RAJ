// ScrollTrigger Animations
const ScrollAnimations = {
  init() {
    gsap.registerPlugin(ScrollTrigger);
    this.initStatsCounter();
    this.initSkillBars();
    this.initTimelineItems();
  },

  initStatsCounter() {
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
  },

  initSkillBars() {
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
  },

  initTimelineItems() {
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
  }
};
