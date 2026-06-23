export const milestonesQuery = `*[_type == "milestone"] | order(year asc) {
  year,
  title,
  description
}`;

export const teamMembersQuery = `*[_type == "teamMember"] {
  name,
  role,
  bio,
  linkedin,
  x,
  email
}`;

export const eventsQuery = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  description,
  date,
  time,
  location,
  category,
  spots,
  image,
  isPast,
  registrationOpen,
  details,
  gallery
}`;

export const workAreasQuery = `*[_type == "workArea"] | order(number asc) {
  id,
  title,
  description,
  image,
  number
}`;

export const storiesQuery = `*[_type == "story" && approved == true] {
  quote,
  name,
  role,
  location
}`;

export const allStoriesQuery = `*[_type == "story"] | order(_createdAt desc) {
  _id,
  quote,
  name,
  role,
  location,
  approved
}`;

export const impactStatsQuery = `*[_type == "impactStat"] {
  icon,
  value,
  suffix,
  label
}`;

export const heroSectionQuery = `*[_type == "heroSection"][0] {
  eyebrow,
  title,
  description,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  image
}`;

export const ctaSectionQuery = `*[_type == "ctaSection"][0] {
  title,
  description,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink
}`;

export const founderPageQuery = `*[_type == "founderPage"][0] {
  name,
  role,
  biography,
  image
}`;

export const volunteerPageQuery = `*[_type == "volunteerPage"][0] {
  title,
  description,
  formUrl,
  formHeight
}`;

export const donatePageQuery = `*[_type == "donatePage"][0] {
  title,
  description,
  donationOptions,
  customAmountTitle,
  customAmountDesc,
  taxNote
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  email,
  phone,
  address,
  footerDescription,
  copyrightText
}`;

export const blogsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  mainImage,
  "author": author->{
    name,
    role,
    bio,
    email
  },
  authorNameFallback,
  seoTitle,
  seoDescription,
  keywords
}`;

export const blogBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  mainImage,
  body,
  "author": author->{
    name,
    role,
    bio,
    email
  },
  authorNameFallback,
  seoTitle,
  seoDescription,
  keywords
}`;

export const recentBlogsQuery = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  mainImage,
  "author": author->{
    name,
    role
  },
  authorNameFallback
}`;

export const latestBlogsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category
}`;

export const eventByIdQuery = `*[_type == "event" && _id == $id][0] {
  _id,
  title,
  description,
  date,
  time,
  location,
  category,
  spots,
  image,
  isPast,
  registrationOpen,
  details,
  gallery
}`;



