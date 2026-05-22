import React, { type ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import type { Tag } from '@docusaurus/utils';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';
import CommunityProjectItems from '@site/src/components/CommunityProjectItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import Layout from '@theme/Layout';
import CommunityProjectsTags from '@site/src/components/CommunityProjectsTags';

function BlogListPageMetadata(props: Props): ReactNode {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function CommunityProjectsPageContent(props: Props): ReactNode {
  const { metadata, items } = props;

  // Extract unique tags from items metadata
  const tags = useMemo(() => {
    const tagsMap = new Map<string, Tag>();

    items.forEach(({ content }) => {
      (content.metadata.tags as Tag[])?.forEach((tag) => {
        if (!tagsMap.has(tag.permalink)) {
          tagsMap.set(tag.permalink, tag);
        }
      });
    });

    return Array.from(tagsMap.values());
  }, [items]);

  return (
    <Layout>
      <div className="container margin-vert--lg">
        <CommunityProjectsTags tags={tags} />
        {items.length === 0 ? <p>No community projects have been added yet!</p> : <CommunityProjectItems items={items} />}
        <BlogListPaginator metadata={metadata} />
      </div>
    </Layout>
  );
}

export default function CommunityProjectsPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <CommunityProjectsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
