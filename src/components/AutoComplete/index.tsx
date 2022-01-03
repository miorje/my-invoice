import { FunctionComponent, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, ISelections, Modal } from "./Modal.AutoCompletel";
import { shift, useFloating } from "@floating-ui/react-dom";

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

  return (
    <div ref={reference} className="relative">
      <TextField
        label={label}
        errors={errors}
        {...textFieldProps}
        onFocus={handleShowModal}
      />
      {showModal && (
        <div
            className="w-full"
          ref={floating}
          style={{
            left: x ?? undefined,
            top: y ?? undefined,
            position: strategy,
          }}
        >
          <Modal selections={selections} show={showModal} />
        </div>
      )}
    </div>
  );
};
