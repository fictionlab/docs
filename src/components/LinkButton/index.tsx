import React from 'react';
import styles from './styles.module.css';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {
  useDocsSidebar,
  useDocById,
} from '@docusaurus/plugin-content-docs/client';
import type {
  PropSidebar,
  PropSidebarItemLink,
  PropVersionDoc,
} from '@docusaurus/plugin-content-docs';

export interface LinkButtonProps {
  to?: string;
  url?: string;
  docId?: string;
  icon?: string;
  title?: string;
  description?: string;
}

function get_link(props: LinkButtonProps) {
  if (props.to) return props.to;
  if (props.url) return props.url;
}

function get_icon(props: LinkButtonProps, item?: PropSidebarItemLink) {
  if (props.icon) return props.icon;
  if (isInternalUrl(props.url) || isInternalUrl(props.to)) return '📄';
  if (item) {
    if (item.type == 'link') return '📄';
    if (item.type == 'category') return '🗃️';
  } else return '🔗';
}

function get_description(props: LinkButtonProps) {
  if (props.title) return props.title;
  else return get_link(props);
}

function findSidebarItemLink(
  sidebar: PropSidebar,
  docId: string,
): PropSidebarItemLink | undefined {
  for (const item of sidebar) {
    if (item.type === 'category') {
      const subItem = findSidebarItemLink(item.items, docId);
      if (subItem) {
        return subItem;
      }
    } else if (item.type === 'link' && item.docId === docId) {
      return item;
    }
  }
  return undefined;
}

/**
 * Renders a styled link button component.
 *
 * This component generates a link (`<a>` tag) styled as a button.
 * It determines the link target and associated metadata (title, description, icon)
 * based on either a `docId` prop (to look up a document within the documentation context)
 * or direct `to`/`url` props.
 *
 * Throws an error if neither `docId`, `to`, nor `url` is provided.
 * It uses context (`useDocsSidebar`, `useDocById`) when `docId` is specified.
 *
 * @param {LinkButtonProps} props - The properties for the LinkButton component. Requires either `docId`, `to`, or `url`.
 * @returns {JSX.Element} A styled anchor element (`<a>`).
 * @throws {Error} If no `to`, `docId`, or `url` prop is specified.
 * @throws {Error} If `docId` is provided but the sidebar context is missing or the item cannot be found.
 */
export default function LinkButton(props: LinkButtonProps) {
  if (!props.to && !props.docId && !props.url)
    throw new Error('No ID or link specified!');

  let icon: string, link: string, title: string, description: string;
  if (props.docId) {
    let doc: PropVersionDoc;
    const sidebar = useDocsSidebar();
    if (!sidebar)
      throw new Error('Unexpected: cant find current sidebar in context');
    const item = findSidebarItemLink(sidebar.items, props.docId);
    if (!item)
      throw new Error(
        `Could not find link with with the following doc id: ${props.docId}`,
      );
    if (item.type == 'link') doc = useDocById(props.docId ?? undefined);
    link = item.href;
    icon = get_icon(props, item);
    title = item.label;
    description = item.description ?? doc.description;
  } else {
    link = get_link(props);
    title = get_description(props);
    icon = get_icon(props);
    description = props.description;
  }

  return (
    <a href={link} className={styles.ButtonContainer}>
      <div className={styles.TitleContainer}>
        <span className={styles.IconContainer}>{icon}</span>
        <span>{title}</span>
        {description ? (
          <div className={styles.Description}>{description}</div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.ArrowContainer}>
        <i className={styles.Arrow}> </i>
      </div>
    </a>
  );
}
