import { FunctionComponent, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, ISelections, Modal } from "./Modal.AutoCompletel";
import { shift, useFloating } from "@floating-ui/react-dom";
import {useClickAway} from "../../utility/useClickAway";

interface IAutoComplete extends ITextField, IModal {}

export const AutoComplete: FunctionComponent<IAutoComplete> = ({
  label,
  errors,
  selections,
  ...textFieldProps
}) => {
  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [shift()],
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(() => false);

  const handleCloseModal = () => {
      setShowModal(false)
  }

  useClickAway(refs.reference, handleCloseModal);

  return (
    <div ref={reference} className="relative">
      <TextField
        label={label}
        errors={errors}
        {...textFieldProps}
        onFocus={handleShowModal}
      />
      <Modal
        selections={selections}
        show={showModal}
        modalRef={floating}
        modalStyle={{
          left: x ?? undefined,
          top: y ?? undefined,
          position: strategy,
        }}
      />
    </div>
  );
};
