import React, { type ReactNode } from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import type DocsVersionDropdownNavbarItemType from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof DocsVersionDropdownNavbarItemType>;

export default function DocsVersionDropdownNavbarItemWrapper(
  props: Props,
): ReactNode {
  const { docsPluginId } = props;
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes(docsPluginId) ? (
        <DocsVersionDropdownNavbarItem {...props} />
      ) : null}
    </>
  );
}
