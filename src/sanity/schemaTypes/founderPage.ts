import { defineField, defineType } from "sanity";

export const founderPage = defineType({
  name: "founderPage",
  title: "Founder Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Founder Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "biography",
      title: "Biography Paragraphs",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Founder Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
