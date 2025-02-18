import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DownloadIcon } from "@/components/footer/SocialMediaLinks";
import TextElement from "@/components/TextElement";

import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { X } from "lucide-react";
import { ReactSVG } from "react-svg";

interface Props {
  image: ImageMetadata;
  networkPattern: ImageMetadata;
}

const documentCardsEN = [
  {
    label:
      "Application requesting for Frequency Interference Complaint License",
    description: "The Application for Complaint",
    link: "/service/for-operator/FrequencyInterference/Complaint Form.pdf",
  },
  {
    description: "The Guideline for Frequency Interference Complaint",
    link: "/service/for-operator/FrequencyInterference/Guideline for Frequency Interference Complaint.pdf",
  },
];

const documentCardsKH = [
  {
    label: "លិខិតស្នើសុំអាជ្ញាប័ណ្ណពាក្យបណ្តឹង",
    description: "ពាក្យស្នើសុំបណ្តឹងតវ៉ា",
    link: "/service/for-operator/FrequencyInterference/Complaint Form.pdf",
  },
  {
    description: "ការផ្តល់កិច្ចអន្តរាគមន៍លើការប្តឹងតវ៉ា",
    link: "/service/for-operator/FrequencyInterference/Guideline for Frequency Interference Complaint.pdf",
  },
];

let documentCards = [];

const FrequencyInterferencePopup: React.FC<Props> = ({
  image,
  networkPattern,
}) => {
  const [url, setUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);
  const lang = getLangFromUrl(url);
  documentCards = lang === "en" ? documentCardsEN : documentCardsKH;
  const t = useTranslations(lang);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.href.includes("frequency-interference-complaint")) {
        setIsDialogOpen(true);
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger
        onClick={handleClick}
        style={{ width: "100%", height: "100%" }}
      >
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border py-2 md:h-full md:flex-row 2xl:py-6">
          <img
            src={image.src}
            alt="Frequency Interference Complaint"
            className="size-24 rounded-lg p-2 lg:size-24"
            loading="lazy"
          />
          <TextElement className="break-word w-2/4 text-center text-[12px] lg:text-[13px]">
            {t("nav.services.frequencyInterferenceComplaint")}
          </TextElement>
        </div>
      </DialogTrigger>
      <DialogContent className="h-auto w-[90vw] max-w-[1000px] rounded-2xl p-4 md:p-8">
        <button
          className="absolute right-4 top-4 z-50 rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => setIsDialogOpen(false)}
          aria-label="Close"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="flex flex-col items-center justify-center md:flex-row md:gap-5">
          <div className="mb-6 flex flex-col items-center justify-center text-center md:mb-0 md:w-1/3">
            <ReactSVG
              src={image.src}
              beforeInjection={(svg) => {
                svg.classList.add("size-24");
                const paths = svg.querySelectorAll("path");
                paths.forEach((path) => {
                  path.classList.add("fill-primary");
                  path.classList.add("stroke-primary");
                });
              }}
            />
            <span className="w-full text-center text-xs text-primary">
              {t("nav.services.frequencyInterferenceComplaint")}
            </span>
          </div>
          <div className="md:w-3/3 grid grid-cols-1 gap-5 md:grid-cols-1 md:items-end lg:grid-cols-2">
            {documentCards.map((card, index) => (
              <div key={index} className="flex flex-col">
                <TextElement className="mb-2 text-xs font-semibold">
                  {card.label}
                </TextElement>
                <a href={card.link} target="_blank" rel="noopener noreferrer">
                  <div className="relative flex h-auto max-h-[150px] min-h-[120px] flex-col justify-between overflow-hidden rounded-2xl bg-primary p-4 text-xs text-white md:h-[100px] md:w-[350px] lg:w-[300px]">
                    <span className="mb-2 grow">{card.description}</span>
                    <div className="flex items-start justify-between">
                      <div>
                        <img
                          src={networkPattern.src}
                          alt="Network Pattern"
                          className="absolute bottom-0 left-0 w-[106px]"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <a href={card.link} download>
                          <DownloadIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FrequencyInterferencePopup;
