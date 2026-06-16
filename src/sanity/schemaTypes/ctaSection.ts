import { defineField, defineType } from "sanity";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryBtnText",
      title: "Primary Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryBtnLink",
      title: "Primary Button Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryBtnText",
      title: "Secondary Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryBtnLink",
      title: "Secondary Button Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
