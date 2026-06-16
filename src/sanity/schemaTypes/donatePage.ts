import { defineField, defineType } from "sanity";

export const donatePage = defineType({
  name: "donatePage",
  title: "Donate Page Settings",
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
      name: "donationOptions",
      title: "Donation Impact Options",
      type: "array",
      of: [
        {
          type: "object",
          name: "donationOption",
          title: "Donation Option",
          fields: [
            { name: "amount", title: "Amount (INR)", type: "number", validation: (Rule) => Rule.required() },
            { name: "impact", title: "Impact Description", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "customAmountTitle",
      title: "Custom Amount Card Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customAmountDesc",
      title: "Custom Amount Card Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "taxNote",
      title: "Tax Deduction Disclaimer",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
