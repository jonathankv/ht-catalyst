import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { posts } from '../../data/posts';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TableOfContents from '../../components/blog/TableOfContents';
import { getTranslatedStaticProps } from '../../utils/translationUtils';

// Custom components for MDX
const components = {
  h1: props => (
    <h1
      className="text-3xl font-bold mt-12 mb-6 text-neutral-900 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-700"
      {...props}
    />
  ),
  h2: props => (
    <h2
      className="text-2xl font-semibold mt-8 mb-4 text-neutral-900 dark:text-white"
      {...props}
    />
  ),
  h3: ({ children, ...props }) => {
    const id = children.toLowerCase().replace(/\s+/g, '-');
    return (
      <h3 
        id={id} 
        className="text-2xl font-semibold mt-8 mb-4 text-neutral-900 dark:text-white"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: props => (
    <p
      className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-100 mb-6 selection:bg-primary-100 dark:selection:bg-primary-900/30 selection:text-primary-900 dark:selection:text-primary-100"
      {...props}
    />
  ),
  strong: props => (
    <strong
      className="font-semibold text-neutral-900 dark:text-white bg-primary-50 dark:bg-primary-900/30 px-1 rounded"
      {...props}
    />
  ),
  em: (props) => (
    <em className="text-primary-700 dark:text-primary-300 italic" {...props} />
  ),
  blockquote: props => (
    <blockquote
      className="my-8 pl-6 border-l-4 border-primary-600 dark:border-primary-400 bg-primary-50/50 dark:bg-primary-900/20 py-4 pr-4 rounded-r-lg italic text-neutral-800 dark:text-neutral-100"
      {...props}
    />
  ),
  ul: props => (
    <ul className="list-none ml-6 space-y-3 text-neutral-800 dark:text-neutral-100">
      {props.children}
    </ul>
  ),
  ol: props => (
    <ol className="list-none ml-6 space-y-3 text-neutral-800 dark:text-neutral-100 counter-reset-item">
      {props.children}
    </ol>
  ),
  li: (props) => (
    <li className="relative pl-8 text-lg leading-relaxed before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary-600 dark:before:bg-primary-400 before:rounded-full" {...props} />
  ),
  a: (props) => (
    <a 
      className="text-primary-700 dark:text-primary-300 font-medium hover:underline decoration-2 underline-offset-2 transition-colors" 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  // Add image component for MDX content
  img: ({ src, alt, ...props }) => (
    <div className="my-8 relative">
      <Image 
        src={src} 
        alt={alt || "Image"} 
        width={800} 
        height={450} 
        className="rounded-lg shadow-lg dark:shadow-neutral-950/30 w-full h-auto"
        {...props}
      />
    </div>
  ),
  // Add a new component for callouts
  Callout: ({ children, type = 'info' }) => {
    const styles = {
      info: 'bg-primary-50 dark:bg-primary-900/30 border-primary-600 dark:border-primary-400 text-primary-900 dark:text-primary-100',
      warning: 'bg-secondary-50 dark:bg-secondary-900/30 border-secondary-600 dark:border-secondary-400 text-secondary-900 dark:text-secondary-100',
      tip: 'bg-tertiary-50 dark:bg-tertiary-900/30 border-tertiary-600 dark:border-tertiary-400 text-tertiary-900 dark:text-tertiary-100',
    };
    return (
      <div className={`my-8 p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
        {children}
      </div>
    );
  },
  // Add or update the code component with better contrast
  code: props => (
    <code
      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.5 rounded font-mono text-sm"
      {...props}
    />
  ),
  // Add or update the pre component for code blocks with better contrast
  pre: props => {
    return (
      <pre
        className="my-8 p-4 bg-neutral-900 dark:bg-neutral-950 text-neutral-200 dark:text-neutral-100 rounded-lg overflow-x-auto font-mono text-sm"
        {...props}
      />
    );
  },
};

export default function BlogPost({ post, mdxSource, headings, locale }) {
  const { t } = useTranslation('common');
  
  if (!post) return null;

  return (
    <Layout>
      <Head>
        <title>{post.title} | {t('site.title')}</title>
        <meta name="description" content={post.subtitle || post.excerpt} />
      </Head>
      <div className="min-h-screen bg-primary-25 dark:bg-neutral-900">
        <div className="grid grid-cols-[1fr,minmax(auto,1000px),1fr]">
          {/* Left background */}
          <div className="bg-primary-25 dark:bg-neutral-900" />

          {/* Main content column */}
          <div className="col-start-2 bg-white border rounded-xl overflow-hidden border-neutral-200 dark:bg-neutral-900">
            {/* Hero Section */}
            <div className="px-8">
              {post.coverImage && (
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden my-12 shadow-xl">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              
              <div className="py-6">
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200 rounded-full">
                      {t(`blog.categories.${post.category}`)}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
                    {post.title}
                  </h1>
                  
                  {post.subtitle && (
                    <p className="text-xl text-neutral-700 dark:text-neutral-200 leading-relaxed">
                      {post.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-neutral-700 dark:text-neutral-200 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 relative overflow-hidden rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-neutral-900 dark:text-white">{post.author.name}</span>
                    </div>
                    <span>•</span>
                    <span>{post.date}</span>
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <span>{t('library.reading_time', { minutes: post.readTime })}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[720px] mx-auto px-8 py-12">
              <article className="prose prose-lg dark:prose-dark mx-auto">
                <MDXRemote {...mdxSource} components={components} />
              </article>
            </div>
          </div>

          {/* Right background */}
          <div className="bg-primary-25 dark:bg-neutral-900" />
        </div>
      </div>
    </Layout>
  );
}

// Helper function to extract headings from MDX content
function extractHeadings(content) {
  const headings = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  return headings;
}

// Server-side code
export async function getStaticPaths({ locales }) {
  const paths = [];
  
  // Generate paths for all locales
  for (const locale of locales) {
    posts.forEach((post) => {
      paths.push({
        params: { slug: post.slug },
        locale,
      });
    });
  }

  return { paths, fallback: false };
}

// Server-side code
export async function getStaticProps({ params, locale }) {
  try {
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');

    const postData = posts.find((p) => p.slug === params.slug);
    
    if (!postData) {
      return {
        notFound: true,
      };
    }

    const postFilePath = path.join(process.cwd(), 'content/posts', `${params.slug}.mdx`);
    const source = fs.readFileSync(postFilePath, 'utf8');
    
    const { content, data } = matter(source);
    
    // Extract headings before serializing
    const headings = extractHeadings(content);
    
    const mdxSource = await serialize(content);

    return getTranslatedStaticProps(locale, ['common'], {
      post: postData,
      mdxSource,
      headings
    });
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
} 