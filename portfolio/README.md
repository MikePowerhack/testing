# Portfolio Site - Content Editing Guide

Welcome to your cozy portfolio site! This guide will help you update content without touching code.

## 📁 File Structure Overview

```
portfolio/
├── index.html              # Main HTML file (minimal editing needed)
├── css/                    # Styles (colors, fonts, layouts)
├── js/                     # JavaScript functionality
├── data/                   # ✏️ EDIT THESE FILES!
│   ├── site.json           # Site-wide settings
│   └── sections.json       # Page content
└── assets/
    ├── images/             # Your artwork goes here
    └── icons/              # Social media icons
```

## 🎨 Editing Site Settings (`data/site.json`)

Open `site.json` in any text editor to change:

### Basic Info
```json
{
  "site": {
    "title": "My Portfolio",        // Your site title (appears in browser tab)
    "tagline": "Artist & Creator"   // Your tagline
  }
}
```

### Colors
Change the color palette to match your style:
```json
"theme": {
  "primary": "#8B7355",      // Main heading color
  "secondary": "#D4A574",    // Accent color (links, buttons)
  "accent": "#E8C4A0",       // Decorative elements
  "background": "#F5EBE0",   // Main background
  "text": "#4A3F35"          // Body text color
}
```

### Navigation Menu
Edit the navigation links:
```json
"nav": [
  { "label": "About", "href": "#about" },
  { "label": "Illustrations", "href": "#illustrations" }
]
```

### Social Media Links
Update your social media URLs:
```json
"social": [
  { "name": "twitter", "url": "https://twitter.com/yourusername" },
  { "name": "instagram", "url": "https://instagram.com/yourusername" }
]
```

## 📝 Editing Page Content (`data/sections.json`)

### Hero Section (Walking Character + Parallax)
```json
{
  "id": "hero",
  "type": "hero",
  "title": "Welcome to My World",
  "subtitle": "A cozy corner of art and creativity",
  "walkingCharacter": {
    "gif": "assets/images/walking-character.gif",
    "alt": "Walking character"
  },
  "parallaxBackgrounds": [
    "assets/images/bg-layer-1.png",
    "assets/images/bg-layer-2.png",
    "assets/images/bg-layer-3.png"
  ]
}
```

**To customize:**
1. Replace `walking-character.gif` with your own walking animation
2. Add 3 parallax background images (they should be wider than the screen for scrolling effect)

### About Section
```json
{
  "id": "about",
  "type": "about",
  "title": "About Me",
  "content": "Your bio text here...",
  "image": "assets/images/about-photo.png"
}
```

### Project Sections (Illustrations, Animations, Characters)
Each project section has items in a grid:
```json
{
  "id": "illustrations",
  "type": "projects",
  "title": "Illustrations",
  "description": "A collection of my work",
  "items": [
    {
      "title": "Project Name",
      "image": "assets/images/project-1.png",
      "description": "Short description"
    }
  ]
}
```

**To add more projects:** Copy and paste an item block and change the details.

### Resume/Contact Section
```json
{
  "id": "resume",
  "type": "contact",
  "title": "Resume & Contact",
  "content": "Your intro text",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "experience": [
    {
      "role": "Your Role",
      "company": "Company Name",
      "period": "2020 - Present",
      "description": "What you did"
    }
  ],
  "email": "your@email.com",
  "socialLinks": true
}
```

## 🖼️ Adding Your Images

1. **Place image files** in `assets/images/`
2. **Recommended sizes:**
   - Walking character GIF: 200x200px (or similar square)
   - Parallax backgrounds: At least 1920px wide
   - Project images: 600x400px (3:2 ratio works well)
   - About photo: 400x500px

3. **Update the JSON** to reference your new image filenames

## 📱 Responsive Design

This portfolio is fully responsive and adapts to all screen sizes:

- **Desktop** (1400px+): Large layout with multi-column grids
- **Tablet** (769px - 1024px): Optimized two-column layouts
- **Mobile** (≤768px): Single column with collapsible navigation menu
- **Small Mobile** (≤480px): Compact layout with adjusted font sizes

The navigation automatically converts to a hamburger menu on mobile devices.

## 🎯 Quick Tips

- **Colors**: Use a color picker tool to get hex codes (#RRGGBB)
- **Images**: Keep file sizes optimized for web (under 500KB per image ideal)
- **Text**: Keep descriptions concise and friendly
- **Testing**: Open `index.html` in a browser to preview changes
- **Navigation**: Click any nav link to smoothly scroll to that section

## 🚀 Viewing Your Site

Since this uses ES6 modules, you need to serve it via a local server:

**Option 1: VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

**Option 2: Python**
```bash
cd portfolio
python -m http.server 8000
```
Then visit `http://localhost:8000`

**Option 3: Node.js**
```bash
npx serve portfolio
```

## ❓ Troubleshooting

- **Images not showing?** Check the file paths in JSON match actual filenames
- **Styles not loading?** Make sure all CSS files are in the `css/` folder
- **JavaScript errors?** Open browser DevTools (F12) to see error messages

---

Happy creating! 🎨✨
