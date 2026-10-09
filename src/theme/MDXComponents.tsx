// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

import LinkButton from '@site/src/components/LinkButton';
import ImageZoom from '@site/src/components/ImageZoom';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  LinkButton,
  ImageZoom,
};

declare global {
  type MDXProvidedComponents = {
    LinkButton: typeof LinkButton;
    ImageZoom: typeof ImageZoom;
  };
}
