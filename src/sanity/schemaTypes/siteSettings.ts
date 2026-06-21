import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Contact Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Contact Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text Override",
      type: "string",
      description: "Default is 'COMPASSION CREW. All rights reserved.'",
    }),
  ],
});
