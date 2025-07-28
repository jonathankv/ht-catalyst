# About Page Documentation

## Overview

The About page provides a professional summary of the site owner, highlighting their background, expertise, approach, and vision. It features a clean, modern design with animated sections and a skills overview.

## Components

### Profile Section

The profile section includes:
- Profile image (with fallback to an icon if the image fails to load)
- Name and job title
- Social media links (LinkedIn, GitHub, Email)
- CV download button

### Professional Summary

The summary section is divided into four key areas:
1. **Background** - Professional journey and passion
2. **Expertise** - Core strengths and skills
3. **Approach** - Philosophy toward product development
4. **Vision** - Long-term goals and values

### Skills Overview

The skills section categorizes expertise into three areas:
1. **Product Management** - Product strategy, roadmap planning, etc.
2. **Technical** - Agile methodologies, programming languages, etc.
3. **Leadership** - Team management, stakeholder communication, etc.

## Animations

The page uses Framer Motion for smooth animations:
- Fade-in and slide-up animations for section titles
- Staggered animations for summary items
- Subtle hover effects on interactive elements

## Customization

### Updating Content

All text content is managed through translation files:
- English: `frontend/public/locales/en/common.json`
- Vietnamese: `frontend/public/locales/vi/common.json`

Look for the `about` section in these files to update text content.

### Changing Profile Image

Replace the profile image at:
```
frontend/public/images/avatar/profile-avatar.jpg
```

### Updating CV File

Replace the CV file at:
```
frontend/public/files/jonathan-vu-cv.pdf
```

### Modifying Skills

Edit the `skillCategories` array in `frontend/components/About.js` to update the skills listed in each category.

## Styling

The styling for the About page is contained in:
```
frontend/styles/About.module.css
```

Key style classes include:
- `.aboutSection` - Main container with gradient background
- `.profileSection` - Profile image and contact information
- `.summarySection` - Professional summary sections
- `.skillsOverview` - Skills categories and lists

## Responsive Design

The page is fully responsive with specific styles for:
- Desktop (default)
- Tablet (max-width: 768px)
- Mobile (max-width: 480px)

Adjust the media queries in the CSS file to modify responsive behavior 