import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme/BlogPostItem';
import type { Props } from '@theme/BlogPostItems';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import BlogPostCard from '@site/src/components/communityProjects/BlogPostCard';

export default function BlogPostItems({ items }: Props): ReactNode {
  return (
    <div className={styles.blogPostGrid}>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}
        >
          <div className={styles.blogPostCard}>
            <BlogPostCard>
              <BlogPostContent />
            </BlogPostCard>
          </div>
        </BlogPostProvider>
      ))}
    </div>
  );
}
