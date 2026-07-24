import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItems';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import CommunityProjectCard from '@site/src/components/CommunityProjectCard';

export default function CommunityProjectItems({ items }: Props): ReactNode {
  return (
    <div className={styles.blogPostGrid}>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}
        >
          <div className={styles.blogPostCard}>
            <CommunityProjectCard>
              <BlogPostContent />
            </CommunityProjectCard>
          </div>
        </BlogPostProvider>
      ))}
    </div>
  );
}
