import { defineField, defineType } from "sanity";

export const impactStat = defineType({
  name: "impactStat",
  title: "Impact Stat",
  type: "document",
  fields: [
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Icon name to map (e.g., Heart, Users, Baby, PawPrint, Award, Globe)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Numeric Value",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "suffix",
      title: "Value Suffix",
      type: "string",
      description: "Suffix such as '+' or '%'",
    }),
    defineField({
      name: "label",
      title: "Text Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
