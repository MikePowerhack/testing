// Sample job data
const jobsData = [
    {
        id: 1,
        title: "Senior GDScript Developer",
        company: "Pixel Dreams Studio",
        type: "Full-time",
        remote: true,
        description: "We're looking for an experienced GDScript developer to join our team working on an exciting 2D platformer game.",
        tags: ["GDScript", "Godot 4", "2D"],
        location: "Remote",
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "2D Game Artist",
        company: "Indie Forge Games",
        type: "Contract",
        remote: true,
        description: "Seeking a talented 2D artist to create character sprites, animations, and environment assets for our upcoming RPG.",
        tags: ["2D Art", "Sprite Animation", "Character Design"],
        location: "Remote",
        posted: "1 day ago"
    },
    {
        id: 3,
        title: "Game Designer",
        company: "Creative Games Co",
        type: "Full-time",
        remote: false,
        description: "Join our design team to craft engaging gameplay mechanics and level designs for our Godot-based projects.",
        tags: ["Level Design", "Game Mechanics", "Documentation"],
        location: "Berlin, Germany",
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "Godot Engine Programmer",
        company: "Open Source Studios",
        type: "Full-time",
        remote: true,
        description: "Work on core engine features and contribute to the Godot Engine open-source project while building commercial games.",
        tags: ["C++", "GDScript", "Engine Development"],
        location: "Remote",
        posted: "5 days ago"
    },
    {
        id: 5,
        title: "Audio Designer",
        company: "Sound Wave Interactive",
        type: "Part-time",
        remote: true,
        description: "Create immersive sound effects and music for indie games built with Godot. Experience with FMOD or Wwise is a plus.",
        tags: ["Sound Design", "Music Composition", "Audio Implementation"],
        location: "Remote",
        posted: "1 week ago"
    },
    {
        id: 6,
        title: "3D Environment Artist",
        company: "Vertex Studios",
        type: "Contract",
        remote: false,
        description: "Design and create stunning 3D environments for our action-adventure game using Godot 4's rendering capabilities.",
        tags: ["3D Modeling", "Blender", "Texturing"],
        location: "London, UK",
        posted: "4 days ago"
    },
    {
        id: 7,
        title: "Mobile Game Developer",
        company: "Touch Games Ltd",
        type: "Full-time",
        remote: true,
        description: "Develop mobile games using Godot Engine. Experience with iOS and Android deployment required.",
        tags: ["Mobile", "GDScript", "Cross-platform"],
        location: "Remote",
        posted: "6 days ago"
    },
    {
        id: 8,
        title: "UI/UX Designer for Games",
        company: "Interface Masters",
        type: "Contract",
        remote: true,
        description: "Design intuitive and beautiful user interfaces for Godot games. Portfolio showcasing game UI work required.",
        tags: ["UI Design", "UX", "Godot Control Nodes"],
        location: "Remote",
        posted: "2 days ago"
    },
    {
        id: 9,
        title: "Multiplayer Network Engineer",
        company: "Net Play Studios",
        type: "Full-time",
        remote: true,
        description: "Implement robust multiplayer systems using Godot's networking features. Experience with dedicated servers preferred.",
        tags: ["Networking", "Multiplayer", "Server Architecture"],
        location: "Remote",
        posted: "1 week ago"
    }
];

// DOM Elements
const jobsContainer = document.getElementById('jobs-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const locationFilter = document.getElementById('location-filter');
const newsletterForm = document.getElementById('newsletter-form');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderJobs(jobsData);
    setupEventListeners();
    setupSmoothScroll();
});

// Render jobs to the DOM
function renderJobs(jobs) {
    jobsContainer.innerHTML = '';
    
    if (jobs.length === 0) {
        jobsContainer.innerHTML = `
            <div class="no-jobs">
                <h3>No jobs found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    jobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card fade-in-up';
        jobCard.style.animationDelay = `${index * 0.1}s`;
        
        const remoteClass = job.remote ? 'remote' : '';
        const remoteText = job.remote ? 'Remote' : 'On-site';
        
        jobCard.innerHTML = `
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <span class="job-type ${remoteClass}">${remoteText}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            <div class="job-footer">
                <div class="job-location">
                    <span>📍</span>
                    <span>${job.location}</span>
                </div>
                <span class="job-posted">${job.posted}</span>
            </div>
        `;
        
        jobCard.addEventListener('click', () => {
            alert(`Apply for ${job.title} at ${job.company}\n\nThis would open the application form in a real implementation.`);
        });
        
        jobsContainer.appendChild(jobCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            filterJobs(filter);
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterBySearch(searchTerm);
    });
    
    // Location filter
    locationFilter.addEventListener('change', (e) => {
        filterByLocation(e.target.value);
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        showNotification('Thanks for subscribing! We\'ll keep you updated.', 'success');
        e.target.reset();
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

// Filter jobs by category
function filterJobs(filter) {
    let filteredJobs = [...jobsData];
    
    switch(filter) {
        case 'programming':
            filteredJobs = jobsData.filter(job => 
                job.title.toLowerCase().includes('developer') || 
                job.title.toLowerCase().includes('programmer') ||
                job.title.toLowerCase().includes('engineer') ||
                job.tags.some(tag => tag.toLowerCase().includes('script') || tag.toLowerCase().includes('c++'))
            );
            break;
        case 'art':
            filteredJobs = jobsData.filter(job => 
                job.title.toLowerCase().includes('artist') ||
                job.tags.some(tag => tag.toLowerCase().includes('art') || tag.toLowerCase().includes('3d') || tag.toLowerCase().includes('modeling'))
            );
            break;
        case 'audio':
            filteredJobs = jobsData.filter(job => 
                job.title.toLowerCase().includes('audio') ||
                job.title.toLowerCase().includes('sound') ||
                job.title.toLowerCase().includes('music')
            );
            break;
        case 'design':
            filteredJobs = jobsData.filter(job => 
                job.title.toLowerCase().includes('designer') ||
                job.title.toLowerCase().includes('design')
            );
            break;
        case 'remote':
            filteredJobs = jobsData.filter(job => job.remote);
            break;
        default:
            filteredJobs = jobsData;
    }
    
    renderJobs(filteredJobs);
}

// Filter by search term
function filterBySearch(searchTerm) {
    const filteredJobs = jobsData.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    renderJobs(filteredJobs);
}

// Filter by location
function filterByLocation(location) {
    let filteredJobs = [...jobsData];
    
    if (location === 'remote') {
        filteredJobs = jobsData.filter(job => job.remote);
    } else if (location === 'north-america') {
        filteredJobs = jobsData.filter(job => 
            job.location.includes('US') || 
            job.location.includes('Canada') ||
            job.location.includes('America')
        );
    } else if (location === 'europe') {
        filteredJobs = jobsData.filter(job => 
            job.location.includes('UK') || 
            job.location.includes('Germany') ||
            job.location.includes('France') ||
            job.location.includes('Europe')
        );
    } else if (location === 'asia') {
        filteredJobs = jobsData.filter(job => 
            job.location.includes('Asia') ||
            job.location.includes('Japan') ||
            job.location.includes('Singapore')
        );
    }
    
    renderJobs(filteredJobs);
}

// Setup smooth scrolling for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 16px 24px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: var(--shadow-md);
        gap: 1rem;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .no-jobs {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
    }
    
    .no-jobs h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .no-jobs p {
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.step-card, .testimonial-card, .feature, .job-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
setTimeout(animateOnScroll, 100);

// Console welcome message
console.log('%c🎮 Godot Jobs - Welcome!', 'font-size: 20px; font-weight: bold; color: #478CBF;');
console.log('%cFind your dream job in Godot game development!', 'font-size: 14px; color: #4a4a5a;');
