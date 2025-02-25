import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

// Reading progress indicator component
const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const element = target.current;
    const handleScroll = () => {
      if (!element) return;
      
      const totalHeight = element.scrollHeight - element.clientHeight;
      const progress = (element.scrollTop / totalHeight) * 100;
      setReadingProgress(progress);
    };

    element?.addEventListener('scroll', handleScroll);
    return () => element?.removeEventListener('scroll', handleScroll);
  }, [target]);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
      <div 
        className="h-full bg-primary-500/30 dark:bg-primary-400/30 transition-all duration-200"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default function BookNotes({ frontMatter, mdxSource, headings, locale }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const contentRef = useRef(null);

  if (!frontMatter) {
    return (
      <Layout>
        <Head>
          <title>{t('library.book_not_found')} | {t('site.title')}</title>
          <meta name="description" content={t('library.book_not_found_description')} />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="section-title">{t('library.book_not_found')}</h1>
            <p className="text-text-secondary mb-8">
              {t('library.book_not_found_description')}
            </p>
            <button
              onClick={() => router.push('/library')}
              className="btn-primary"
            >
              {t('common.back_to_library')}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{frontMatter.title} | {t('site.title')}</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <ReadingProgress target={contentRef} />

      <div className="min-h-screen bg-neutral-25 dark:bg-neutral-900" ref={contentRef}>
        <div className="grid grid-cols-[1fr,minmax(auto,1000px),1fr]">
          {/* Left background */}
          <div className="bg-neutral-25 dark:bg-neutral-900" />

          {/* Main content column */}
          <div className="col-start-2 bg-white border rounded-xl overflow-hidden border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
            {/* Hero Section */}
            <div className="px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-lg"
                  >
                    <Image
                      src={frontMatter.coverImage}
                      alt={frontMatter.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </div>
                
                <div className="lg:col-span-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
                      {frontMatter.title}
                    </h1>
                    <p className="text-xl text-neutral-700 dark:text-neutral-300">
                      {t('library.by')} {frontMatter.author}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-neutral-700 dark:text-neutral-300">{frontMatter.summary}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3"
                  >
                    {frontMatter.tags?.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
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
          <div className="bg-neutral-25 dark:bg-neutral-900" />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const booksDirectory = path.join(process.cwd(), 'content/books');
  const filenames = fs.readdirSync(booksDirectory);
  
  // Create paths for all books in all locales
  const paths = filenames.flatMap(filename => {
    const fileContent = fs.readFileSync(
      path.join(booksDirectory, filename),
      'utf8'
    );
    const { data } = matter(fileContent);
    
    // Generate a path for each locale
    return locales.map(locale => ({
      params: { bookId: data.id.toString() },
      locale
    }));
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const booksDirectory = path.join(process.cwd(), 'content/books');
  const filenames = fs.readdirSync(booksDirectory);
  
  // Find the file with matching book ID
  const bookFile = filenames.find(filename => {
    const fileContent = fs.readFileSync(
      path.join(booksDirectory, filename),
      'utf8'
    );
    const { data } = matter(fileContent);
    return data.id.toString() === params.bookId;
  });

  if (!bookFile) {
    return getTranslatedStaticProps(locale, ['common'], {
      frontMatter: null,
      mdxSource: null
    });
  }

  const source = fs.readFileSync(
    path.join(booksDirectory, bookFile),
    'utf8'
  );

  const { data: frontMatter, content } = matter(source);
  
  // Extract headings from the content
  const headings = extractHeadings(content);
  
  const mdxSource = await serialize(content);

  return getTranslatedStaticProps(locale, ['common'], {
    frontMatter,
    mdxSource,
    headings
  });
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