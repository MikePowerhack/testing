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
    `<a href="${link.href}" class="nav-link">${link.label}</a>`
  ).join('');
  
  return `
    <nav class="nav">
      <div class="nav-container">
        <a href="#" class="nav-logo">${siteConfig.title}</a>
        <div class="nav-links">
          ${navLinks}
        </div>
      </div>
    </nav>
  `;
}
