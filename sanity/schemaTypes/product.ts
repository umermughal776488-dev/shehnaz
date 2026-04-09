export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'oldPrice',
      title: 'Old Price',
      description: 'Optional, for showing discount',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(5),
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subcategory',
      title: 'Sub-Category',
      type: 'reference',
      to: [{ type: 'subcategory' }],
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'usage',
      title: 'Usage Instructions',
      type: 'text',
    },
    {
      name: 'variations',
      title: 'Variations (e.g. sizes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Variation Name', type: 'string' },
            { name: 'price', title: 'Variation Price', type: 'number' },
          ],
        },
      ],
    },
  ],
};
