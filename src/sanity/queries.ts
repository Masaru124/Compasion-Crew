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

export const eventsQuery = `*[_type == "event"] {
  id,
  title,
  description,
  date,
  time,
  location,
  category,
  spots
}`;

export const workAreasQuery = `*[_type == "workArea"] | order(number asc) {
  id,
  title,
  description,
  image,
  number
}`;

export const storiesQuery = `*[_type == "story"] {
  quote,
  name,
  role,
  location
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
