import { HasChildren } from "../helpers/props";
import Modal from "./Modal";
import { FC } from "react";

type MessageProps = HasChildren & {
  className?: string;
  message: string;
  //   children?: React.ReactNode | JSX.Element;
};

const MessageModal: FC<MessageProps> = ({ className, message, children }) => {
  const classNames = `font-bold text-gray text-base p-4" ${className}`;

  return (
    <Modal>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="font-bold text-gray text-base p-4">{message}</div>
        <div>{children}</div>
      </div>
    </Modal>
  );
};

export default MessageModal;
