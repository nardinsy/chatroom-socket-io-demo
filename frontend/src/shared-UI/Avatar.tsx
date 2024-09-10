import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Avatar = ({
  cssClassName,
  pictureUrl,
  alt,
  width,
}: {
  cssClassName?: string;
  pictureUrl: string | undefined;
  alt: string | undefined;
  width: string;
}) => {
  //if pictureUrl is not undefined but it is not valid url, then what?

  const content = pictureUrl ? (
    <img
      data-testid="image"
      src={pictureUrl}
      alt={alt}
      style={{ width, height: width }}
      className={`block rounded-full w-full h-full object-cover ${cssClassName}`}
      loading="lazy"
    />
  ) : (
    <FontAwesomeIcon
      data-testid="no-image"
      icon={faCircleUser}
      className={`block rounded-full w-full h-full object-cover ${cssClassName}`}
      style={{ width, height: width }}
    />
  );

  return (
    <div className={`text-5xl text-gray-light ${cssClassName}`}>{content}</div>
  );
};

export default Avatar;
