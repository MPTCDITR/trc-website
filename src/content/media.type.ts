export const MEDIA_TYPES = {
  ACTIVITY: "activity",
  EVENT: "event",
  NEWS_RELEASE: "new-release",
} as const;

export type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES];