import { FC, useState, ChangeEvent, MouseEvent } from "react";
import Button from "../../shared-UI/Button";
import { placeInfoCard } from "../../helpers/dtos";

interface PlaceInfoCardProps {
  onSubmit: (place: placeInfoCard) => void;
  submitButtonName: string;
  onCancel: () => void;

  closeModal?: () => void;
  extraAction?: {
    action: () => void;
    "button-name": string;
  };
  placeInputs?: placeInfoCard;
}

interface FormINputValidation {
  title: boolean;
  description: boolean;
  address: boolean;
}

const PlaceInfoCard: FC<PlaceInfoCardProps> = ({
  onSubmit,
  placeInputs,
  submitButtonName,
  onCancel,
  closeModal,
  extraAction,
}) => {
  const [formINputs, setInfos] = useState<placeInfoCard>({
    title: placeInputs ? placeInputs.title : "",
    description: placeInputs ? placeInputs.description : "",
    address: placeInputs ? placeInputs.address : "",
  });

  const [formInputsIsvalid, setFormInputsIsvalid] =
    useState<FormINputValidation>({
      title: true,
      description: true,
      address: true,
    });

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!formInputsIsvalid.title) {
      formInputsIsvalid.title = event.target.value ? true : false;
    }
    setInfos({ ...formINputs, title: event.target.value });
  };

  const descriptionChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!formInputsIsvalid.description) {
      formInputsIsvalid.description =
        event.target.value.length > 7 ? true : false;
    }

    if (event.target.value.length > 300) {
      setInfos({ ...formINputs, description: event.target.value.slice(210) });
    } else {
      setInfos({ ...formINputs, description: event.target.value });
    }
  };

  const addressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!formInputsIsvalid.address) {
      formInputsIsvalid.address = event.target.value ? true : false;
    }
    setInfos({ ...formINputs, address: event.target.value });
  };

  const inputValidation: (infos: placeInfoCard) => boolean = (infos) => {
    const { title, description, address } = infos;
    if (title && description && address) {
      return true;
    }

    const futureState = {
      title: formInputsIsvalid.title,
      description: formInputsIsvalid.description,
      address: formInputsIsvalid.address,
    };

    if (!title) {
      futureState.title = false;
    }

    if (!description) {
      futureState.description = false;
    }

    if (!address) {
      futureState.address = false;
    }

    console.log(futureState);
    setFormInputsIsvalid(futureState);

    return false;
  };

  const submitCardHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!inputValidation(formINputs)) return;

    const place = {
      title: formINputs.title,
      description: formINputs.description,
      address: formINputs.address,
    };

    // if (placeDto.id) {
    //   place.id = placeDto.id;
    // }

    await onSubmit(place);
    if (submitButtonName === "Save" && closeModal) {
      closeModal();
    }
  };

  const cancelCardHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onCancel();
  };

  const extraActionHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!placeInputs || !extraAction) throw new Error("");

    await extraAction.action();
  };

  return (
    <div className="flex flex-col shadow-default px-2 pt-8 pb-2 rounded-xl">
      <>
        <input
          maxLength={30}
          type="text"
          className={`bg-gray-light mb-2 h-10 px-1 outline-none border border-edit-button-bg rounded-md focus:border focus:rounded-md focus:border-primary
          ${formInputsIsvalid.title ? "" : "border-red-heart"}`}
          placeholder="Title"
          value={formINputs.title}
          onChange={titleChangeHandler}
        />

        <textarea
          maxLength={210}
          className={`bg-gray-light mb-2 h-28 px-1 resize-none outline-none border border-edit-button-bg rounded-md focus:border focus:rounded-md focus:border-primary
          ${formInputsIsvalid.description ? "" : "border-red-heart"}`}
          placeholder="Description about this place"
          value={formINputs.description}
          onChange={descriptionChangeHandler}
        />
        <input
          maxLength={30}
          className={`bg-gray-light mb-2 h-10 px-1 outline-none border border-edit-button-bg rounded-md focus:border focus:rounded-md focus:border-primary
          ${formInputsIsvalid.address ? "" : "border-red-heart"}`}
          placeholder="Address"
          value={formINputs.address}
          onChange={addressChangeHandler}
        />
      </>

      <div className="flex flex-row justify-end">
        {extraAction && (
          <Button action={"delete"} onClick={extraActionHandler}>
            {extraAction["button-name"]}
          </Button>
        )}
        <Button action={"cancel"} onClick={cancelCardHandler}>
          Cancel
        </Button>
        <Button action={"submit"} onClick={submitCardHandler}>
          {submitButtonName}
        </Button>
      </div>
    </div>
  );
};

export default PlaceInfoCard;
