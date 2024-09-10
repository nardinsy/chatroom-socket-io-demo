import { FC } from "react";
import wordWrap from "../../../helpers/wordWrapper";
import { PlaceDto } from "../../../helpers/dtos";

type PlaceInfoT = {
  placeDto: PlaceDto;
};

const PlaceInfo: FC<PlaceInfoT> = ({ placeDto }) => {
  const { title, description, address, pictureUrl, creator } = placeDto;

  const titlelineWidth = 14;
  const descriptionLineWidth = 21;
  const addressLineWidth = 10;

  const oneLineTitle = wordWrap(title, titlelineWidth);
  const oneLineAddress = wordWrap(address, addressLineWidth);
  const wrappedDescription = wordWrap(description, descriptionLineWidth);

  const text = description.split("\n").map((item, index) => {
    return (
      <span key={index}>
        {item}
        <br />
      </span>
    );
  });

  return (
    <div className="w-full mb-8 py-0 px-4 text-black-light">
      <h3 className="font-bold tracking-wide">{oneLineTitle}</h3>
      <p className="tracking-wide">
        <strong>Description:</strong>
        <span className=" text-gray-dark">{text}</span>
      </p>
      <p className="tracking-wide ">
        <strong>Address: </strong>
        <span className=" text-gray-dark">{oneLineAddress}</span>
      </p>
    </div>
  );
};

export default PlaceInfo;
