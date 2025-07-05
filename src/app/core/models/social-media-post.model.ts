export interface SocialMediaPost {
  image: File;
  description: string;
  platforms: {
    instagram: boolean;
    googleMyBusiness: boolean;
  };
}
