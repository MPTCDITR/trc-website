import { useCallback, useEffect, useMemo, useState } from "react";

import { toKhmerNumerals } from "@/lib/date-helper";
import { getContentUrl } from "@/lib/route";

import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TextElement from "@/components/TextElement";

import type { SupportedLanguage } from "@/i18n/ui";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import type { CollectionEntry } from "astro:content";
import Autoplay from "embla-carousel-autoplay";

interface ImageCarouselProps {
  carouselDatas: CollectionEntry<"activities" | "events" | "news-releases">[];
  lang: SupportedLanguage;
}

export default function ImageCarousel({
  carouselDatas,
  lang,
}: ImageCarouselProps) {
  const plugin = useMemo(
    () =>
      Autoplay({
        delay: 5000,
        playOnInit: true,
        stopOnInteraction: false,
      }),
    [],
  );

  const [url, setUrl] = useState("");
  const t = useTranslations(getLangFromUrl(url));

  const dateFormat = useCallback(
    (index: number) => {
      return lang === "km" ? toKhmerNumerals(`${index}`) : index;
    },
    [lang],
  );

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Carousel
        plugins={[plugin]}
        opts={{ loop: true }}
        className="max-h-screen overflow-hidden"
      >
        <CarouselContent>
          {carouselDatas?.map((item, index) => (
            <CarouselItem
              key={item.data.title}
              className="relative h-[calc(100vh-175px)] min-h-96 w-full lg:h-[calc(100vh-139px)]"
            >
              <a href={getContentUrl(item, lang)}>
                <img
                  src={item.data.image.src}
                  alt={item.data.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  decoding="async"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 flex size-full items-center bg-black/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/50">
                  <section
                    aria-labelledby="about-dsc"
                    className="w-full px-24 max-lg:p-10 max-md:p-5 max-sm:px-0 max-sm:py-5"
                  >
                    <div className="container size-full">
                      <CardContent className="flex flex-col items-center justify-center space-y-4 p-0 text-center text-primary-foreground lg:items-end lg:justify-end">
                        <div className="flex w-full flex-col items-center justify-center lg:h-2/5 lg:w-4/5 lg:items-end lg:justify-end">
                          <Badge
                            variant="secondary"
                            className="mb-4 rounded-3xl bg-secondary px-7 py-2 font-normal capitalize text-white hover:bg-secondary"
                          >
                            {t("home.media." + item.data.type)}
                          </Badge>
                          <TextElement
                            variant="medium"
                            className="line-clamp-4 whitespace-pre-line text-pretty text-center font-normal lg:text-right"
                          >
                            {item.data.title}
                          </TextElement>
                        </div>
                      </CardContent>
                      <div className="mt-16 flex items-center justify-center gap-5 text-secondary lg:items-center lg:justify-end">
                        {carouselDatas?.map((_, i) => (
                          <div key={i}>
                            {index === i ? (
                              <div className="flex items-center gap-5">
                                <hr className="h-2 w-20 rounded-2xl border-none bg-secondary" />
                                <div className="font-semibold">
                                  {dateFormat(index + 1)}
                                </div>
                              </div>
                            ) : (
                              <div className="size-2 rounded-full border-2 border-solid border-secondary"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="link"
          size="icon"
          className="left-14 hidden lg:flex"
        />
        <CarouselNext
          variant="link"
          size="icon"
          className="right-14 hidden lg:flex"
        />
      </Carousel>
    </div>
  );
}
