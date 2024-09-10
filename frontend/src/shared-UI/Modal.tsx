import ReactDOM from "react-dom";
import { FC } from "react";
import { HasChildren } from "../helpers/props";
import classes from "./Modal.module.css";

type ModalOverlayProps = HasChildren & {
  cssClassName: string | undefined;
};

type ModalProps = HasChildren & {
  onBackdropClick?: (event: any) => void;
  cssClassName?: string;
};

const Backdrop = ({
  onBackdropClick,
}: {
  onBackdropClick?: (event: any) => void;
}) => {
  return (
    <div
      data-testid="backdrop"
      className={classes.backdrop}
      onClick={onBackdropClick}
    ></div>
  );
};

const ModalOverlay: FC<ModalOverlayProps> = ({
  cssClassName,
  children,
}: ModalOverlayProps) => {
  return (
    <div className={`${classes.modal} ${cssClassName}`}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal: FC<ModalProps> = ({ onBackdropClick, cssClassName, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onBackdropClick={onBackdropClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay cssClassName={cssClassName}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

//with problem but it works
// const portalElement = document.createElement("overlays") as HTMLElement;

// const Modal: FC<ModalProps> = ({ onBackdropClick, cssClassName, children }) => {
//   // portalElement.setAttribute("data-testid", "overlay");

//   const portalElement = document.createElement("div") as HTMLElement;
//   useEffect(() => {
//     portalElement.setAttribute("data-testid", "overlay");

//     document.body.appendChild(portalElement);

//     return () => {
//       document.body.removeChild(portalElement);
//     };
//   }, []);

//   const closeModalHandler = (e: any) => {
//     document.body.removeChild(portalElement);
//     if (onBackdropClick) {
//       onBackdropClick(e);
//     }
//   };
//   return (
//     <>
//       {ReactDOM.createPortal(
//         <Backdrop onBackdropClick={closeModalHandler} />,
//         portalElement
//       )}
//       {ReactDOM.createPortal(
//         <ModalOverlay cssClassName={cssClassName}>{children}</ModalOverlay>,
//         portalElement
//       )}
//     </>
//   );
// };
