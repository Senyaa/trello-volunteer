import getCardCover from "@/app/client/getCardCover";
import { Card } from "@/app/types/Card";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true); 

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

    const attachmentId = animal.cover.idAttachment;

    getCardCover(animal.id, attachmentId).then((images) => {
      const coverUrl = images.find((i) => i.id === attachmentId)?.url;

      if (coverUrl) {
        setCover(`/api/imageFile?url=${coverUrl}`);
      }
      setIsLoading(false); // Stop loading after attempting to fetch the cover
    });
  }, [animal]);

  const sizeClass = isMini
    ? "w-16 h-16 md:w-20 md:h-20"
    : "w-24 h-24 md:w-32 md:h-32";

  return (
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
          onLoadingComplete={() => setIsLoading(false)} 
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
  );
};

export default AnimalPhoto;
