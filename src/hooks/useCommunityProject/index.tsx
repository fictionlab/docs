import { PropBlogPostMetadata } from '@docusaurus/plugin-content-blog';
import { useBlogPost } from '@docusaurus/plugin-content-blog/lib/client/contexts.js';

interface communityProjectMetadata
  extends Omit<PropBlogPostMetadata, 'frontMatter'> {
  frontMatter: PropBlogPostMetadata['frontMatter'] & {
    company?: {
      name?: string;
      logo_url?: string;
      url?: string;
    };
  };
}

export default function useCommunityProject() {
  const blogPost = useBlogPost();
  return {
    ...blogPost,
    metadata: blogPost.metadata as communityProjectMetadata,
  };
}
