import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
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
      name: "date",
      title: "Date",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Expert Talk", value: "Expert Talk" },
          { title: "Community Meetup", value: "Community Meetup" },
          { title: "Service Drive", value: "Service Drive" },
          { title: "Campaign", value: "Campaign" },
          { title: "Workshop", value: "Workshop" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "spots",
      title: "Available Spots",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isPast",
      title: "Is Past Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationOpen",
      title: "Is Registration Open",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "details",
      title: "Event Details / Recap Text",
      type: "text",
    }),
    defineField({
      name: "gallery",
      title: "Event Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
