import { type ReactNode } from 'react';
import type { Tag } from '@docusaurus/utils';
import styles from './styles.module.css';
import TagsListInline from '@theme/TagsListInline';

interface Props {
  tags?: Tag[];
  className?: string;
}

export default function CommunityProjectsTags({
  tags,
  className = '',
}: Props): ReactNode {
  const allTags = [
    {
      label: 'All',
      permalink: '/community-projects/tags',
      description: 'All community projects',
    },
  ].concat(tags || []);

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.tagsContainer} ${className}`}>
      <TagsListInline tags={allTags} />
    </div>
  );
}
