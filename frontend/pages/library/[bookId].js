import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export default function BookNotes({ frontMatter, mdxSource }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const contentRef = useRef(null);

  if (!frontMatter) {
    return (
      <Layout>
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
      <ReadingProgress target={contentRef} />

      <div className="min-h-screen bg-background" ref={contentRef}>
        {/* Hero Section */}
        <div className="relative bg-surface">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card relative h-[500px] w-full overflow-hidden"
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
              
              <div className="lg:col-span-8 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h1 className="section-title">{frontMatter.title}</h1>
                  <p className="text-text-secondary text-xl">
                    {t('library.by')} {frontMatter.author}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-text-secondary">{frontMatter.summary}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  {frontMatter.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-surface-elevated rounded-full text-sm
                        text-text-secondary border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <article className="prose">
            <MDXRemote {...mdxSource} />
          </article>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const booksDirectory = path.join(process.cwd(), 'content/books');
  const filenames = fs.readdirSync(booksDirectory);
  
  const paths = filenames.map(filename => {
    const fileContent = fs.readFileSync(
      path.join(booksDirectory, filename),
      'utf8'
    );
    const { data } = matter(fileContent);
    return {
      params: { bookId: data.id.toString() }
    };
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
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        frontMatter: null,
        mdxSource: null
      }
    };
  }

  const source = fs.readFileSync(
    path.join(booksDirectory, bookFile),
    'utf8'
  );

  const { data: frontMatter, content } = matter(source);
  const mdxSource = await serialize(content);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      frontMatter,
      mdxSource
    }
  };
} 