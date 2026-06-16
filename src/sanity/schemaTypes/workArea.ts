import { defineField, defineType } from "sanity";

export const workArea = defineType({
  name: "workArea",
  title: "Work Area",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Unique ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Display Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
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
      name: "image",
      title: "Image Asset",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
