import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Layout from '../../components/Layout';
import { posts } from '../../data/posts';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  // Add other custom components here
};

export default function BlogPost({ post, mdxSource }) {
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

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-8 py-16">
          <div className="prose prose-lg dark:prose-invert">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>
      </article>
    </Layout>
  );
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
    
    const mdxSource = await serialize(content);

    return { 
      props: { 
        post: postData,
        mdxSource 
      } 
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
} 