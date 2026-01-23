import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import type {Props} from '@theme/BlogPostItem';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

// apply a bottom margin in list view
function useContainerClassName() {
  const {isBlogPostPage} = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}


export default function BlogPostCard({children, className}: Props): ReactNode {
  const containerClassName = useContainerClassName();
  const {metadata, isBlogPostPage} = useBlogPost();

  return (
    <BlogPostItemContainer
      className={clsx(containerClassName, className, styles.compactCard)}
    >
      <Link to={metadata.permalink} className={styles.cardLink}>
        {metadata.frontMatter.image && (
          <div className={styles.cardImage}>
            <img src={metadata.frontMatter.image} alt={metadata.title} />
          </div>
        )}
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{metadata.title}</h2>
          {metadata.description && (
            <p className={styles.cardDescription}>{metadata.description}</p>
          )}
          {metadata.tags && metadata.tags.length > 0 && (
            <div className={styles.cardTags}>
              {metadata.tags.slice(0, 3).map((tag) => (
                <span key={tag.label} className={styles.cardTag}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </BlogPostItemContainer>
  );
}
