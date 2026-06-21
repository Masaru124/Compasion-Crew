import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Real Story",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote / Testimonial",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Program / Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (City/State)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approved",
      title: "Approved / Show on Site",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
