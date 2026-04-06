/**
 * About Component
 * Renders the About section with text and image
 */

export function renderAbout(data) {
  const { id, title, content, image } = data;
  
  return `
    <section id="${id}" class="section about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>${title}</h2>
            <p>${content}</p>
          </div>
          <div class="about-image">
            <img 
              src="${image}" 
              alt="${title}" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initAbout(section) {
  // Add subtle animation on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  const content = section.querySelector('.about-content');
  if (content) {
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(content);
  }
}
