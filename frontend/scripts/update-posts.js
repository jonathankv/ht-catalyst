#!/usr/bin/env node

/**
 * Blog Post Automation Script
 * 
 * This script automatically generates the posts.js file by reading MDX files
 * from the content/posts directory. It extracts frontmatter data and creates
 * a posts array that can be used by the blog components.
 * 
 * Usage: npm run update-posts
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const OUTPUT_FILE = path.join(process.cwd(), 'data/posts.js');
const BACKUP_FILE = path.join(process.cwd(), 'data/posts.backup.js');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DEFAULT_IMAGES = {
  'Technology': '/images/blog/ai-research.svg',
  'Engineering': '/images/blog/blogs.jpg',
  'Product Management': '/images/blog/product-management.jpg',
  'Social Impact': '/images/blog/social-impact.jpg',
  'default': '/images/blog/blogs.jpg'
};
const WORDS_PER_MINUTE = 200;

// Create a backup of the existing file
function createBackup() {
  if (fs.existsSync(OUTPUT_FILE)) {
    console.log('Creating backup of existing posts.js file...');
    fs.copyFileSync(OUTPUT_FILE, BACKUP_FILE);
  }
}

// Calculate read time based on content length
function calculateReadTime(content) {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return `${minutes} min read`;
}

// Extract excerpt from content if not provided in frontmatter
function extractExcerpt(content, providedExcerpt, title) {
  if (providedExcerpt) return providedExcerpt;
  
  // Find the first paragraph that's not a heading and not an image
  const paragraphs = content.split('\n\n');
  for (const paragraph of paragraphs) {
    if (!paragraph.startsWith('#') && 
        !paragraph.startsWith('![') && 
        paragraph.length > 10) {
      // Clean up markdown syntax
      return paragraph
        .replace(/[#*`]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just text
        .substring(0, 160)
        .trim() + '...';
    }
  }
  return `Learn more about ${title}...`;
}

// Check if an image exists in the public directory
function imageExists(imagePath) {
  if (!imagePath.startsWith('/')) return true; // External URL or data URL
  
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  return fs.existsSync(fullPath);
}

// Get cover image from frontmatter or find first image in content
function getCoverImage(data, content, category) {
  // If coverImage is specified in frontmatter, use that
  if (data.coverImage) {
    if (imageExists(data.coverImage)) {
      return data.coverImage;
    } else {
      console.warn(`Warning: Cover image ${data.coverImage} not found in public directory`);
    }
  }
  
  // Try to find the first image in the content
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (imageMatch && imageMatch[1]) {
    const imagePath = imageMatch[1];
    if (imageExists(imagePath)) {
      return imagePath;
    } else {
      console.warn(`Warning: Image ${imagePath} referenced in content not found in public directory`);
    }
  }
  
  // Use a default image based on category
  const defaultImage = DEFAULT_IMAGES[category] || DEFAULT_IMAGES.default;
  if (!imageExists(defaultImage)) {
    console.warn(`Warning: Default image ${defaultImage} for category ${category} not found`);
    return DEFAULT_IMAGES.default;
  }
  return defaultImage;
}

// Process all MDX files and generate posts array
async function generatePosts() {
  console.log('Reading MDX files from content/posts directory...');
  
  // Read all MDX files
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.mdx'));
  
  if (files.length === 0) {
    console.log('No MDX files found in content/posts directory.');
    return [];
  }
  
  // Process each file
  const posts = files.map((file, index) => {
    const filePath = path.join(POSTS_DIR, file);
    const slug = file.replace('.mdx', '');
    
    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Validate required fields
    if (!data.title) {
      console.warn(`Warning: Missing title in ${file}`);
      data.title = 'Untitled Post';
    }
    
    // Set default values for missing fields
    const category = data.category || 'Uncategorized';
    const date = data.date || new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Calculate read time if not provided
    const readTime = data.readTime || calculateReadTime(content);
    
    // Extract excerpt
    const excerpt = extractExcerpt(content, data.excerpt, data.title);
    
    // Get cover image
    const coverImage = getCoverImage(data, content, category);
    
    // Create post object
    return {
      id: index + 1,
      slug,
      title: data.title,
      subtitle: data.subtitle || '',
      content: 'Sample content here...',  // We don't need the full content in the posts array
      date,
      readTime,
      category,
      author: {
        name: data.author?.name || 'Jonathan Vu',
        avatar: data.author?.avatar || '/images/avatar/avatar.jpg'
      },
      excerpt,
      coverImage,
      tags: data.tags || []
    };
  });
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
}

// Generate the posts.js file
async function generatePostsFile() {
  try {
    // Create backup
    createBackup();
    
    // Generate posts array
    const posts = await generatePosts();
    
    // Preserve existing image definitions from current posts.js if it exists
    let imageDefinitions = '';
    if (fs.existsSync(OUTPUT_FILE)) {
      const currentFile = fs.readFileSync(OUTPUT_FILE, 'utf8');
      const matches = currentFile.match(/^([\s\S]*?)export const posts/m);
      if (matches && matches[1]) {
        imageDefinitions = matches[1];
      }
    }
    
    // Generate file content
    const fileContent = `${imageDefinitions}export const posts = ${JSON.stringify(posts, null, 2)};\n`;
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    
    console.log(`Successfully generated posts.js with ${posts.length} posts!`);
    
    // List all posts
    console.log('\nBlog Posts:');
    posts.forEach(post => {
      console.log(`- ${post.title} (${post.date}) [${post.category}]`);
    });
  } catch (error) {
    console.error('Error generating posts.js:', error);
    process.exit(1);
  }
}

// Run the script
generatePostsFile(); 