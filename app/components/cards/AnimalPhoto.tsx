import getCardCover from "@/app/client/getCardCover";
import { Card } from "@/app/types/Card";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const AnimalPhoto = ({
  animal,
  name,
  isMini = false,
}: {
  animal: Card;
  name: string;
  isMini?: boolean;
}) => {
  const [cover, setCover] = useState("");
  const [trelloCover, setTrelloCover] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPhotoOpened, setOpenPhoto] = useState(false);

  const fetchCover = useCallback(async () => {
    const attachmentId = animal.cover.idAttachment;
    const cardCover = await getCardCover(animal.id, attachmentId);
    const cardUrl = cardCover.find((i) => i.id === attachmentId)?.url;
    setTrelloCover(cardUrl);
  }, [animal]);

  useEffect(() => {
    if (animal.cover.url) {
      if (animal.cover.url.includes("cloudinary")) {
        setCover(animal.cover.url);
        setIsLoading(false);
        return;
      }

      setCover(`/api/imageFile?url=${animal.cover.url}`);
      setIsLoading(false);
      return;
    }

    fetchCover();
    
    if (trelloCover) {
      setCover(`/api/imageFile?url=${trelloCover}`);
    }
    setIsLoading(false);
  }, [animal, fetchCover, trelloCover]);

  const sizeClass = isMini ? "w-16 h-16 md:w-20 md:h-20" : "w-24 h-24";

  return (
    <>
      <div
        className={`${sizeClass} flex-shrink-0 relative ${
          isLoading ? "animate-pulse" : ""
        }`}
      >
        {cover ? (
          <Image
            src={cover}
            alt={name}
            width={128}
            height={128}
            className="object-cover rounded-full w-full h-full"
            loading="lazy"
            unoptimized
            onLoad={() => setIsLoading(false)}
            onClick={() => {
              setOpenPhoto(true);
            }}
          />
        ) : (
          <div
            className={`${sizeClass} bg-gray-200 dark:bg-gray-400 rounded-full flex items-center justify-center`}
          >
            <span
              className="text-3xl text-gray-400"
              role="img"
              aria-label="No photo available"
            >
              🐾
            </span>
          </div>
        )}
      </div>
      {isPhotoOpened && animal.cover.url && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setOpenPhoto(false)}
        >
          <div className="relative">
            <Image
              src={trelloCover ?? cover}
              alt={name}
              width={512}
              height={512}
              className="object-contain max-h-screen max-w-screen"
              loading="lazy"
              unoptimized
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setOpenPhoto(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimalPhoto;
