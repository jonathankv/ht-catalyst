// Create SVG data URLs for placeholder images
const productManagementImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzNCODJGNiIgcng9IjgiLz48dGV4dCB4PSI0MDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlByb2R1Y3QgTWFuYWdlbWVudDwvdGV4dD48L3N2Zz4=";
const userResearchImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzEwQjk4MSIgcng9IjgiLz48dGV4dCB4PSI0MDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlVzZXIgUmVzZWFyY2g8L3RleHQ+PC9zdmc+";
const socialImpactImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0Y1OUUwQiIgcng9IjgiLz48dGV4dCB4PSI0MDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlNvY2lhbCBJbXBhY3Q8L3RleHQ+PC9zdmc+";

export const posts = [
  {
    id: 1,
    slug: 'building-products-that-matter',
    title: 'Building Products That Matter',
    subtitle: 'A guide to creating impactful digital solutions',
    content: 'Sample content here...',
    date: 'February 8, 2024',
    readTime: '5 min read',
    category: 'Product Management',
    author: {
      name: 'Jonathan Vu',
      avatar: '/images/avatar/avatar.jpg'
    },
    excerpt: 'Learn how to build products that make a real difference in people\'s lives.',
    coverImage: productManagementImg
  },
  {
    id: 2,
    slug: 'user-research-techniques',
    title: 'Essential User Research Techniques',
    subtitle: 'Understanding your users better',
    content: 'Sample content here...',
    date: 'January 15, 2024',
    readTime: '7 min read',
    category: 'Product Management',
    author: {
      name: 'Jonathan Vu',
      avatar: '/images/avatar/avatar.jpg'
    },
    excerpt: 'Discover the most effective techniques for understanding your users and their needs.',
    coverImage: userResearchImg
  },
  {
    id: 3,
    slug: 'impact-driven-development',
    title: 'Impact-Driven Development',
    subtitle: 'Building technology for social good',
    content: 'Sample content here...',
    date: 'December 10, 2023',
    readTime: '6 min read',
    category: 'Social Impact',
    author: {
      name: 'Jonathan Vu',
      avatar: '/images/avatar/avatar.jpg'
    },
    excerpt: 'How to align your development process with creating positive social impact.',
    coverImage: socialImpactImg
  }
]; 