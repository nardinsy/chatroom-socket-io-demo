import { FC } from "react";

type PlaceImageT = {
  src: string;
  alt: string;
};
const PlaceImage: FC<PlaceImageT> = ({ src, alt }) => {
  return (
    <div className="w-full h-image-select-card rounded-t-4xl mt-4 px-1 md:h-full md:w-3/5 md:rounded-l-4xl md:mt-0 md:px-0">
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-image-select-card rounded-t-4xl md:h-full md:rounded-l-4xl md:rounded-r-none"
        loading="lazy"
      />
    </div>
  );
};

export default PlaceImage;
