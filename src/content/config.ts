import { DIRECTIVE_TYPES, type DirectiveType } from "./content.type";
import { LEADERS_TYPES, type LeadersType } from "./leader.type";
import { MEDIA_TYPES, type MediaType } from "./media.type";
import { languages } from "@/i18n/ui";
import { defineCollection, z } from "astro:content";
import type { SchemaContext } from "astro:content";

const SupportedLanguage = Object.values(languages) as [string, ...string[]];

const DirectiveTypeEnum = z.enum(
  Object.values(DIRECTIVE_TYPES) as [DirectiveType, ...DirectiveType[]],
);

const MediaTypeEnum = z.enum(
  Object.values(MEDIA_TYPES) as [MediaType, ...MediaType[]],
);

const LeadersTypeEnum = z.enum(
  Object.values(LEADERS_TYPES) as [LeadersType, ...LeadersType[]],
);

const mediaSchema = ({ image }: SchemaContext) =>
  z.object({
    author: z
      .string()
      .default("Telecommunication Regulator of Cambodia - T.R.C."),
    categories: z.array(z.string()).default(["News", "Article"]),
    date: z.string(),
    featured: z.boolean(),
    isCarousel: z.boolean(),
    index: z.number().optional(),
    image: image(),
    title: z.string(),
    description: z.string().max(160, {
      message: "Description must be at most 160 characters long",
    }),
    lang: z.enum(SupportedLanguage),
    type: MediaTypeEnum,
  });

const mediaCollection = defineCollection({
  schema: mediaSchema,
});

const activeSchema = ({ image }: SchemaContext) =>
  z.object({
    phone: z.string(),
    address: z.string(),
    image: image(),
    title: z.string(),
    descriptionOne: z.string().default("NULL"),
    descriptionTwo: z.string().default("NULL"),
    descriptionThree: z.string().default("NULL"),
    descriptionFour: z.string().default("NULL"),
    descriptionFive: z.string().default("NULL"),
    lang: z.enum(SupportedLanguage),
  });

const activesCollection = defineCollection({
  schema: activeSchema,
});

const directiveSchema = ({ image }: SchemaContext) =>
  z.object({
    date: z.string(),
    title: z.string(),
    featured: z.boolean(),
    image: image(),
    lang: z.enum(SupportedLanguage),
    file: z.string(),
    type: DirectiveTypeEnum,
  });

const directivesCollection = defineCollection({
  schema: directiveSchema,
});

const secretariesSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    title: z.string(),
    image: image(),
    organization: z.string(),
    role: LeadersTypeEnum,
    lang: z.enum(SupportedLanguage),
  });

const secretariesCollection = defineCollection({
  schema: secretariesSchema,
});

export const collections = {
  "news-releases": mediaCollection,
  activities: mediaCollection,
  events: mediaCollection,
  directives: directivesCollection,
  actives: activesCollection,
  secretaries: secretariesCollection,
};
