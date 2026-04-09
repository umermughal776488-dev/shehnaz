export default {
  name: 'deal',
  title: 'Deal / Offer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'discount',
      title: 'Discount Text (e.g. 33% OFF)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Is Featured Deal?',
      description: 'Show this deal in the Hero section',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'price',
      title: 'Price (Deal Price)',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
