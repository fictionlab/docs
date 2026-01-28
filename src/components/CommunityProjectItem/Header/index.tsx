import React, { type ReactNode } from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import styles from './styles.module.css';
import useCommunityProject from '@site/src/hooks/useCommunityProject';

export default function CommunityProjectItemHeader(): ReactNode {
  const { metadata } = useCommunityProject();
  const { frontMatter } = metadata;
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <div className={styles.authorsContainer}>
        <div className={styles.authorsInfo}>
          <BlogPostItemHeaderAuthors />
        </div>
        {frontMatter.company?.logo_url && (
          <img
            className={styles.companyLogo}
            src={frontMatter.company?.logo_url}
            alt={frontMatter.company?.name || 'Company logo'}
          />
        )}
      </div>
    </header>
  );
}
