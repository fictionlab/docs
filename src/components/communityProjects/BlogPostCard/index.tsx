import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import type {Props} from '@theme/BlogPostItem';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import { PropBlogPostMetadata } from '@docusaurus/plugin-content-blog';

interface communityProjectMetadata extends Omit<PropBlogPostMetadata, 'frontMatter'> {
  frontMatter: PropBlogPostMetadata['frontMatter'] & {
    company?: {
      name?: string;
      logo_url?: string;
      url?: string;
    };
  };
}

export default function BlogPostCard({children, className}: Props): ReactNode {
  const {metadata} = useBlogPost() as {metadata: communityProjectMetadata};

  return (
    <BlogPostItemContainer
      className={clsx(className, styles.compactCard)}
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
            <p className={styles.cardDescription}>{children}</p>
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
          <div className={styles.cardCompanyContainer}>
            { metadata.frontMatter.company && metadata.frontMatter.company.name && metadata.frontMatter.company.url && (
              <a
                href={metadata.frontMatter.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardCompany}
              >
                {metadata.frontMatter.company.logo_url && (
                  <img
                    src={metadata.frontMatter.company.logo_url}
                    alt={metadata.frontMatter.company.name}
                    className={styles.cardCompanyLogo}
                  />
                )}
                <span className={styles.cardCompanyName}>{metadata.frontMatter.company.name}</span>
              </a>
            )}
          </div>
        </div>
      </Link>
    </BlogPostItemContainer>
  );
}
