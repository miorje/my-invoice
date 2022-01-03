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

  const [showModal, setShowModal] = useState(() => false);

  return (
    <div>
      <TextField label={label} errors={errors} {...textFieldProps} />
      <button
        onClick={() => {
          setShowModal((prevState) => !prevState);
        }}
      >
        {" "}
        toggle modal
      </button>
      {showModal && <Modal selections={selections} />}
    </div>
  );
};
