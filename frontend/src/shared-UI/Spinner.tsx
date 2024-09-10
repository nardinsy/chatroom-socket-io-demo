import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  // const [deg, setDeg] = useState(0);

  // let timer = setTimeout(() => {
  //   rotateIcon();
  //   clearTimeout(timer);
  // }, 400);

  // const rotateIcon = () => {
  //   setDeg((pre) => pre + 10);
  // };

  return (
    <>
      <h2 className="text-gray font-bold p-2 text-xl tracking-wide">Loading</h2>
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-3xl text-gray"
      />
    </>
  );
};

export default Spinner;
