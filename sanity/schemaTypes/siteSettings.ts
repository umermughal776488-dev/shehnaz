export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Shehnaz Collection',
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      initialValue: 'We believe in gentle care and natural beauty. Our products are crafted to nourish your skin deeply and help you glow with confidence—every day.',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+880 1455852585',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'hello@shehnaz.com',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'twitterUrl',
      title: 'Twitter URL',
      type: 'url',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    },
    {
      name: 'exclusiveProductsTitle',
      title: 'Exclusive Products Headline',
      type: 'string',
      initialValue: 'Exclusive Products',
    },
    {
      name: 'exclusiveProductsSubtitle',
      title: 'Exclusive Products Subheadline',
      type: 'string',
      initialValue: 'Discover our premium selection crafted with the finest ingredients.',
    },
    {
      name: 'reviewsTitle',
      title: 'Reviews Headline',
      type: 'string',
      initialValue: 'What Our Customers Say',
    },
    {
      name: 'reviewsSubtitle',
      title: 'Reviews Subheadline',
      type: 'string',
      initialValue: 'Stories of glow and transformation from our community.',
    },
  ],
};
