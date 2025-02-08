import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Layout from '../../components/Layout';
import { posts } from '../../data/posts';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TableOfContents from '../../components/blog/TableOfContents';

// Custom components for MDX
const components = {
  img: (props) => (
    <div className="relative w-full h-[400px] my-8">
      <Image
        {...props}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </div>
  ),
  h2: ({ children, ...props }) => {
    const id = children.toLowerCase().replace(/\s+/g, '-');
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }) => {
    const id = children.toLowerCase().replace(/\s+/g, '-');
    return <h3 id={id} {...props}>{children}</h3>;
  },
  // Add other custom components here
};

export default function BlogPost({ post, mdxSource, headings }) {
  if (!post) return null; // Add error handling

  return (
    <Layout>
      <article className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-3xl mx-auto px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {post.subtitle}
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-medium">{post.author.name}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content with Table of Contents */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-between items-start">
            <div className="prose prose-lg dark:prose-invert max-w-3xl">
              <MDXRemote {...mdxSource} components={components} />
            </div>
            <TableOfContents headings={headings} />
          </div>
        </div>
      </article>
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