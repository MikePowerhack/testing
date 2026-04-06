/**
 * Hero Component
 * Renders the hero section with walking character and parallax background
 */

export function renderHero(data) {
  const { title, subtitle, walkingCharacter, parallaxBackgrounds } = data;
  
  // Create parallax layers HTML
  const parallaxLayers = parallaxBackgrounds.map((bg, index) => {
    const layerClass = index === 0 ? 'back' : index === 1 ? 'mid' : 'front';
    return `<div class="parallax-layer parallax-layer--${layerClass}" style="background-image: url('${bg}');"></div>`;
  }).join('');
  
  return `
    <section id="hero" class="hero">
      <div class="parallax-container">
        ${parallaxLayers}
      </div>
      
      <div class="character-container">
        <img 
          src="${walkingCharacter.gif}" 
          alt="${walkingCharacter.alt}" 
          class="character-walking"
        />
        
        <div class="hero-content">
          <h1 class="hero-title">${title}</h1>
          <p class="hero-subtitle">${subtitle}</p>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <span></span>
      </div>
    </section>
  `;
}

export function initHero(section) {
  // Initialize parallax effect with JavaScript for enhanced control
  const parallaxContainer = section.querySelector('.parallax-container');
  const layers = section.querySelectorAll('.parallax-layer');
  
  if (!parallaxContainer || layers.length === 0) return;
  
  let scrollPosition = 0;
  let targetScrollPosition = 0;
  
  // Listen to scroll events
  window.addEventListener('scroll', () => {
    targetScrollPosition = window.pageYOffset;
  });
  
  // Smooth animation loop
  function animate() {
    // Smooth interpolation
    scrollPosition += (targetScrollPosition - scrollPosition) * 0.05;
    
    // Apply parallax effect to each layer at different speeds
    layers.forEach((layer, index) => {
      const speed = 0.1 + (index * 0.15);
      const offset = scrollPosition * speed;
      layer.style.transform = `translateX(-${offset % 50}%)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
