// /schemas/contact.ts

import { defineType } from 'sanity';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default defineType({
  name: 'contact',
  type: 'document',
  title: 'Contact',
  fields: [
    {
      name: 'primaryMobile',
      type: 'string',
      title: 'Primary Mobile Number',
      validation: (Rule: any) =>
        Rule.required()
          .regex(/^\+?[1-9]\d{1,14}$/, {
            name: 'Phone number', // Error message
            invert: false, // Allow phone number format
          })
          .error('Must be a valid phone number'),
    },
    {
      name: 'secondaryMobile',
      type: 'string',
      title: 'Secondary Mobile Number',
      validation: (Rule: any) =>
        Rule.optional()
          .regex(/^\+?[1-9]\d{1,14}$/, {
            name: 'Phone number',
            invert: false,
          })
          .error('Must be a valid phone number'),
    },
    {
      name: 'primaryEmail',
      type: 'string',
      title: 'Primary Email Address',
      validation: (Rule: any) => Rule.required().email().error('Must be a valid email address'),
    },
    {
      name: 'secondaryEmail',
      type: 'string',
      title: 'Secondary Email Address',
      validation: (Rule: any) => Rule.optional().email().error('Must be a valid email address'),
    },
    {
      name: 'primaryAddress',
      type: 'object',
      title: 'Primary Address',
      fields: [
        { name: 'street', type: 'string', title: 'Street' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zipCode', type: 'string', title: 'Zip Code' },
        { name: 'country', type: 'string', title: 'Country' },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'secondaryAddress',
      type: 'object',
      title: 'Secondary Address',
      fields: [
        { name: 'street', type: 'string', title: 'Street' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zipCode', type: 'string', title: 'Zip Code' },
        { name: 'country', type: 'string', title: 'Country' },
      ],
    },
  ],
});
