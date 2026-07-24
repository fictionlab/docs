import { type ReactNode } from 'react';
import clsx from 'clsx';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import type { Props } from '@theme/BlogPostItem';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import useCommunityProject from '@site/src/hooks/useCommunityProject';

export default function CommunityProjectCard({
  children,
  className,
}: Props): ReactNode {
  const { metadata } = useCommunityProject();

  return (
    <BlogPostItemContainer className={clsx(className, styles.compactCard)}>
      <Link to={metadata.permalink} className={styles.cardLink}>
        {metadata.frontMatter.image && (
          <div className={styles.cardImage}>
            <img src={metadata.frontMatter.image} alt={metadata.title} />
          </div>
        )}
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{metadata.title}</h2>
          {metadata.description && (
            <div className={styles.cardDescription}>{children}</div>
          )}
          <div>
            {metadata.frontMatter.company &&
              metadata.frontMatter.company.name &&
              (metadata.frontMatter.company.logo_url ? (
                <img
                  src={metadata.frontMatter.company.logo_url}
                  alt={metadata.frontMatter.company.name}
                  className={styles.cardCompanyLogo}
                />
              ) : (
                <span className={styles.cardCompanyName}>
                  {metadata.frontMatter.company.name}
                </span>
              ))}
          </div>
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
