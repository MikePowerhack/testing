/**
 * Contact Component
 * Renders the Resume & Contact section with skills, experience, and contact info
 */

export function renderContact(data) {
  const { id, title, content, skills, experience, email, socialLinks } = data;
  
  const skillsHtml = skills.map(skill => 
    `<span class="skill-tag">${skill}</span>`
  ).join('');
  
  const experienceHtml = experience.map(exp => `
    <div class="experience-item">
      <h4 class="experience-role">${exp.role}</h4>
      <p class="experience-company">${exp.company}</p>
      <p class="experience-period">${exp.period}</p>
      <p class="experience-description">${exp.description}</p>
    </div>
  `).join('');
  
  return `
    <section id="${id}" class="section contact">
      <div class="container">
        <h2 class="section-title">${title}</h2>
        
        <div class="contact-info">
          <p>${content}</p>
          
          ${email ? `<a href="mailto:${email}" class="contact-email">${email}</a>` : ''}
          
          ${socialLinks ? `
            <div class="social-links">
              <a href="https://twitter.com/" class="social-link" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com/" class="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://artstation.com/" class="social-link" aria-label="ArtStation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.373 0-9.75-4.377-9.75-9.75S6.627 2.25 12 2.25 21.75 6.627 21.75 12 17.373 21.75 12 21.75zm4.844-10.594c-.281-.281-.656-.437-1.063-.437H8.219c-.406 0-.781.156-1.063.437-.281.281-.437.657-.437 1.063v1.562c0 .406.156.781.437 1.063.281.281.657.437 1.063.437h7.562c.406 0 .781-.156 1.063-.437.281-.281.437-.657.437-1.063v-1.562c0-.406-.156-.781-.437-1.063zM12 6.75c-.406 0-.781.156-1.063.437-.281.281-.437.657-.437 1.063v7.5c0 .406.156.781.437 1.063.281.281.657.437 1.063.437s.781-.156 1.063-.437c.281-.281.437-.657.437-1.063v-7.5c0-.406-.156-.781-.437-1.063-.281-.281-.657-.437-1.063-.437z"/>
                </svg>
              </a>
            </div>
          ` : ''}
        </div>
        
        <div style="margin-top: var(--space-16);">
          <h3 style="text-align: center; margin-bottom: var(--space-8);">Skills</h3>
          <div class="skills-list">
            ${skillsHtml}
          </div>
        </div>
        
        <div style="margin-top: var(--space-16);">
          <h3 style="text-align: center; margin-bottom: var(--space-8);">Experience</h3>
          <div class="experience-list">
            ${experienceHtml}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initContact(section) {
  // Add smooth scroll to email link
  const emailLink = section.querySelector('.contact-email');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = emailLink.href;
    });
  }
}
