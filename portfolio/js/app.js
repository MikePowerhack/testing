/**
 * App Bootstrapper
 * Fetches data, renders components, and initializes the portfolio site
 */

import { renderAllSections, initSections, renderNavigation, initNavigation } from './renderer.js';

// State
let siteConfig = null;
let sectionsData = null;

/**
 * Fetch JSON data from file
 * @param {string} path - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function fetchJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * Initialize navigation
 */
function setupNavigation() {
  if (!siteConfig) return;
  
  const navHTML = renderNavigation(siteConfig);
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  
  // Update document title
  document.title = siteConfig.site.title;
  
  // Add meta description if available
  if (siteConfig.site.description) {
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = siteConfig.site.description;
    document.head.appendChild(metaDesc);
  }
  
  // Initialize navigation functionality (mobile toggle, smooth scroll, active states)
  initNavigation();
}

/**
 * Render main content
 */
function renderContent() {
  if (!sectionsData) return;
  
  const contentHTML = renderAllSections(sectionsData.sections);
  document.getElementById('app').innerHTML = contentHTML;
}

/**
 * Initialize all interactive features
 */
function initialize() {
  if (!sectionsData) return;
  
  initSections(sectionsData.sections);
  
  // Remove no-js class for progressive enhancement
  document.documentElement.classList.remove('no-js');
  
  // Add loaded class for CSS transitions
  document.body.classList.add('loaded');
  
  console.log('Portfolio initialized successfully!');
}

/**
 * Main initialization function
 */
async function init() {
  try {
    // Fetch all required data
    const [site, sections] = await Promise.all([
      fetchJSON('data/site.json'),
      fetchJSON('data/sections.json')
    ]);
    
    siteConfig = site;
    sectionsData = sections;
    
    // Render the application
    setupNavigation();
    renderContent();
    initialize();
    
  } catch (error) {
    console.error('Failed to initialize portfolio:', error);
    
    // Show fallback content
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="padding: 4rem; text-align: center;">
          <h1>Welcome to My Portfolio</h1>
          <p>Loading content... Please refresh the page.</p>
        </div>
      `;
    }
  }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential external use
export { init, siteConfig, sectionsData };
