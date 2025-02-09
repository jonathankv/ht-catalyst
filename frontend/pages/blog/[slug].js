import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Layout from '../../components/Layout';
import { posts } from '../../data/posts';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TableOfContents from '../../components/blog/TableOfContents';

// Custom components for MDX
const components = {
  h1: () => null,
  img: (props) => (
    <div className="my-12">
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <Image
          {...props}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {props.alt && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center italic">
          {props.alt}
        </p>
      )}
    </div>
  ),
  h2: ({ children, ...props }) => {
    const id = children.toLowerCase().replace(/\s+/g, '-');
    return (
      <h2 
        id={id} 
        className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = children.toLowerCase().replace(/\s+/g, '-');
    return (
      <h3 
        id={id} 
        className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }) => {
    // Check if this is the first paragraph
    const isFirstParagraph = props.className?.includes('first-paragraph');
    if (isFirstParagraph) {
      return (
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6" {...props}>
          <span className="float-left text-5xl font-serif leading-tight mr-2 mt-1 text-primary-600 dark:text-primary-400">
            {children.charAt(0)}
          </span>
          {children.slice(1)}
        </p>
      );
    }
    return (
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 selection:bg-primary-100 dark:selection:bg-primary-900/30 selection:text-primary-900 dark:selection:text-primary-100" {...props}>
        {children}
      </p>
    );
  },
  strong: (props) => (
    <strong className="font-semibold text-gray-900 dark:text-white bg-primary-50 dark:bg-primary-900/20 px-1 rounded" {...props} />
  ),
  em: (props) => (
    <em className="italic text-primary-600 dark:text-primary-400" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="my-8 pl-6 border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 py-4 pr-4 rounded-r-lg italic text-gray-800 dark:text-gray-200" {...props} />
  ),
  ul: ({ children }) => (
    <ul className="list-none ml-6 space-y-3 text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-none ml-6 space-y-3 text-gray-700 dark:text-gray-300 counter-reset-item">
      {children}
    </ol>
  ),
  li: (props) => (
    <li className="relative pl-8 text-lg leading-relaxed before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary-500 dark:before:bg-primary-400 before:rounded-full" {...props} />
  ),
  a: (props) => (
    <a 
      className="text-primary-600 dark:text-primary-400 font-medium hover:underline decoration-2 underline-offset-2 transition-colors" 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  // Add a new component for callouts
  Callout: ({ children, type = 'info' }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-900 dark:text-blue-100',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-900 dark:text-yellow-100',
      tip: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-900 dark:text-green-100',
    };
    return (
      <div className={`my-8 p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
        {children}
      </div>
    );
  },
};

export default function BlogPost({ post, mdxSource, headings }) {
  if (!post) return null;

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="grid grid-cols-[1fr,minmax(auto,1000px),1fr]">
          {/* Left gray background */}
          <div className="bg-gray-50" />

          {/* Main content column */}
          <div className="col-start-2 bg-white">
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
                    <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    {post.title}
                  </h1>
                  
                  {post.subtitle && (
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      {post.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 relative overflow-hidden rounded-full ring-2 ring-white dark:ring-gray-800">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    <span>•</span>
                    <span>{post.date}</span>
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[720px] mx-auto px-8 py-12">
              <article className="prose prose-lg dark:prose-invert selection:bg-primary-100 dark:selection:bg-primary-900/30 selection:text-primary-900 dark:selection:text-primary-100">
                <MDXRemote {...mdxSource} components={components} />
              </article>
            </div>
          </div>

          {/* Right gray background */}
          <div className="bg-gray-50" />
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
export async function getStaticPaths() {
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

// Server-side code
export async function getStaticProps({ params }) {
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

    return { 
      props: { 
        post: postData,
        mdxSource,
        headings
      } 
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
} 