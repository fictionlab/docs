import { PropBlogPostMetadata } from '@docusaurus/plugin-content-blog';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

interface CommunityProjectMetadata
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
    metadata: blogPost.metadata as CommunityProjectMetadata,
  };
}
