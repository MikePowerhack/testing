/**
 * Projects Component
 * Renders project grid sections (Illustrations, Animations, Character Designs)
 */

export function renderProjects(data) {
  const { id, title, description, items } = data;
  
  const projectCards = items.map(item => `
    <article class="project-card">
      <img 
        src="${item.image}" 
        alt="${item.title}" 
        class="project-image"
        loading="lazy"
      />
      <div class="project-info">
        <h3 class="project-title">${item.title}</h3>
        <p class="project-description">${item.description}</p>
      </div>
    </article>
  `).join('');
  
  return `
    <section id="${id}" class="section projects">
      <div class="container">
        <h2 class="section-title">${title}</h2>
        ${description ? `<p style="text-align: center; margin-bottom: var(--space-8); color: var(--color-text-light);">${description}</p>` : ''}
        <div class="projects-grid">
          ${projectCards}
        </div>
      </div>
    </section>
  `;
}

export function initProjects(section) {
  // Add hover effects and lazy loading enhancements
  const cards = section.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
}
