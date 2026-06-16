import { defineField, defineType } from "sanity";

export const volunteerPage = defineType({
  name: "volunteerPage",
  title: "Volunteer Page Settings",
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
      name: "formUrl",
      title: "Google Form Embedded URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formHeight",
      title: "Google Form Height (px)",
      type: "number",
      validation: (Rule) => Rule.required().min(500),
    }),
  ],
});
