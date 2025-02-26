# Scripts Documentation

This directory contains utility scripts for the website.

## Blog Post Automation

### `update-posts.js`

This script automatically generates the `posts.js` file by reading MDX files from the `content/posts` directory. It extracts frontmatter data and creates a posts array that can be used by the blog components.

#### Usage

```bash
npm run update-posts
```

#### How It Works

1. Reads all MDX files from the `frontend/content/posts` directory
2. For each file:
   - Extracts the filename to get the slug
   - Parses the frontmatter using gray-matter
   - Extracts key information (title, subtitle, date, author, category, tags, etc.)
   - Determines the cover image path (either from frontmatter or content)
   - Creates a post object with all necessary fields
3. Sorts the posts by date (newest first)
4. Generates a JavaScript file that exports the posts array
5. Writes this file to `frontend/data/posts.js`

#### MDX Frontmatter Format

Your MDX blog posts should include frontmatter at the top of the file:

```mdx
---
title: 'Your Blog Post Title'
subtitle: 'Optional subtitle for your post'
date: 'Month Day, Year'
author:
  name: 'Your Name'
  avatar: '/images/avatar.jpg'
category: 'Category Name'
tags: ['tag1', 'tag2', 'tag3']
coverImage: '/path/to/cover/image.jpg'  # Optional
excerpt: 'Custom excerpt for the post'   # Optional
---

Your content starts here...
```

#### Features

- **Automatic Excerpt Generation**: If no excerpt is provided, one will be generated from the first paragraph of content
- **Read Time Calculation**: Automatically calculates read time based on content length
- **Image Validation**: Checks if referenced images exist in the public directory
- **Backup Creation**: Creates a backup of the existing posts.js file before overwriting
- **Sorting**: Sorts posts by date with newest first

## Translation Management

### `translation-manager.js`

This script manages translations for the website. See the script file for detailed documentation.

#### Usage

```bash
npm run translate:extract   # Extract translation keys
npm run translate:generate  # Generate translation files
npm run translate:import    # Import translations
npm run translate:validate  # Validate translations
npm run translate           # Run all translation tasks
``` 