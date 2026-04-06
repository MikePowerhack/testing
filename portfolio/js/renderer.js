/**
 * Renderer - Component Registry & HTML Builder
 * Maps section types to their render functions and builds HTML
 */

import { renderHero, initHero } from './components/hero.js';
import { renderAbout, initAbout } from './components/about.js';
import { renderProjects, initProjects } from './components/projects.js';
import { renderContact, initContact } from './components/contact.js';

// Component registry: maps section type to render and init functions
const componentRegistry = {
  hero: { render: renderHero, init: initHero },
  about: { render: renderAbout, init: initAbout },
  projects: { render: renderProjects, init: initProjects },
  contact: { render: renderContact, init: initContact }
};

/**
 * Render a single section based on its type
 * @param {Object} sectionData - Section data from sections.json
 * @returns {string} HTML string for the section
 */
export function renderSection(sectionData) {
  const component = componentRegistry[sectionData.type];
  
  if (!component) {
    console.warn(`Unknown section type: ${sectionData.type}`);
    return '';
  }
  
  return component.render(sectionData);
}

/**
 * Render all sections and return complete HTML
 * @param {Array} sections - Array of section data from sections.json
 * @returns {string} Complete HTML for all sections
 */
export function renderAllSections(sections) {
  return sections.map(section => renderSection(section)).join('\n');
}

/**
 * Initialize all sections (attach event listeners, animations, etc.)
 * @param {Array} sections - Array of section data from sections.json
 */
export function initSections(sections) {
  sections.forEach(sectionData => {
    const component = componentRegistry[sectionData.type];
    
    if (component && component.init) {
      const element = document.getElementById(sectionData.id);
      if (element) {
        component.init(element);
      }
    }
  });
}

/**
 * Build navigation HTML from site config
 * @param {Object} siteConfig - Site configuration from site.json
 * @returns {string} Navigation HTML
 */
export function renderNavigation(siteConfig) {
  const navLinks = siteConfig.nav.map(link => 
    `<li><a href="${link.href}" class="nav-link" data-section="${link.href.substring(1)}">${link.label}</a></li>`
  ).join('');
  
  return `
    <nav class="nav">
      <div class="nav-container">
        <a href="#" class="nav-logo" aria-label="Home">${siteConfig.title}</a>
        <ul class="nav-links">
          ${navLinks}
        </ul>
        <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
      </div>
    </nav>
  `;
}

/**
 * Initialize navigation functionality (mobile toggle, active states, smooth scroll)
 */
export function initNavigation() {
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Active section highlighting on scroll
  const sections = document.querySelectorAll('.section, .hero');
  const navLinkElements = document.querySelectorAll('.nav-link');
  
  function updateActiveSection() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        const sectionId = section.getAttribute('id') || 'home';
        currentSection = sectionId;
      }
    });
    
    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Listen to scroll events for active section highlighting
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection(); // Initial call
}
