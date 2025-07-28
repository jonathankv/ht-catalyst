# Blog Automation Documentation

## Overview

The blog automation system simplifies the process of managing blog posts by automatically processing MDX files and generating the necessary data for the frontend. This system handles metadata extraction, excerpt generation, image validation, and data formatting.

## How It Works

The automation script (`scripts/update-posts.js`) performs the following tasks:

1. Scans the `content/posts` directory for MDX files
2. Extracts metadata from frontmatter (title, date, category, etc.)
3. Generates excerpts from the content
4. Validates featured images
5. Creates a JSON data file for the frontend

## Post Structure

Each blog post should be an MDX file with the following structure:

```mdx
---
title: "Post Title"
date: "2023-01-01"
category: "product"
excerpt: "Optional manual excerpt. If not provided, one will be generated automatically."
coverImage: "/images/blog/post-image.jpg"
---

Content of the post goes here...
```

### Required Frontmatter Fields

- `title`: The title of the post
- `date`: Publication date in "YYYY-MM-DD" format
- `category`: One of the predefined categories (product, growth, impact, family, projects)

### Optional Frontmatter Fields

- `excerpt`: A manual excerpt. If not provided, one will be generated automatically
- `coverImage`: Path to the featured image. If not provided, a default image for the category will be used

## Running the Automation

To update the blog posts data:

```bash
npm run update-posts
```

This command will:
1. Process all MDX files in the `content/posts` directory
2. Generate a `posts.json` file in the `public/data` directory
3. Log information about the processed posts

## Adding a New Post

1. Create a new MDX file in the `content/posts` directory
2. Add the required frontmatter fields
3. Write your content using MDX syntax
4. Add any images to the `public/images/blog` directory
5. Run `npm run update-posts` to update the posts data

## Image Management

### Featured Images

Featured images should be placed in the `public/images/blog` directory and referenced in the frontmatter:

```mdx
---
coverImage: "/images/blog/my-image.jpg"
---
```

### Default Images

If a post doesn't specify a featured image, a default image for its category will be used:

- Product: `/images/blog/categories/product.jpg`
- Growth: `/images/blog/categories/growth.jpg`
- Impact: `/images/blog/categories/impact.jpg`
- Family: `/images/blog/categories/family.jpg`
- Projects: `/images/blog/categories/projects.jpg`

## Excerpt Generation

If an excerpt is not provided in the frontmatter, one will be generated automatically by:

1. Removing all HTML and MDX tags
2. Taking the first 160 characters of the content
3. Ensuring the excerpt ends with a complete word
4. Adding an ellipsis (...) at the end

## Troubleshooting

### Missing Images

If the script detects a missing featured image, it will:
1. Log a warning
2. Use the default image for the post's category

### Invalid Categories

If a post uses an invalid category:
1. The script will log a warning
2. The post will be categorized as "product" (default)

### Duplicate Titles

If multiple posts have the same title:
1. All posts will be processed
2. They will be distinguished by their publication dates

## Customization

### Adding New Categories

To add a new category:

1. Add the category to the `VALID_CATEGORIES` array in `scripts/update-posts.js`
2. Add a default image for the category in `public/images/blog/categories/`
3. Add translations for the category in the locale files

### Modifying Excerpt Generation

To change how excerpts are generated, modify the `generateExcerpt` function in `scripts/update-posts.js`. 