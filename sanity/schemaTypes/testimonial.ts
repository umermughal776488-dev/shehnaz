export default {
  name: 'testimonial',
  title: 'Testimonial / Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Review Body',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'avatar',
      title: 'Customer Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
