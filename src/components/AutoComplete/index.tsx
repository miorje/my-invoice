import { ChangeEvent, FunctionComponent, RefObject, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoCompletel";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";

interface IAutoComplete<Generic>
  extends ITextField,
    Pick<IModal<Generic>, "getOptionLabel" | "getOptionValue"> {
  options: Generic[];
}

export const AutoComplete = <Generic extends object>({
  label,
  errors,
  options,
  getOptionLabel,
  getOptionValue,
  ...textFieldProps
}: IAutoComplete<Generic>) => {
  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [shift()],
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(() => false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useClickAway(refs.reference as RefObject<HTMLElement>, handleCloseModal);

  const [selections, setSelections] = useState<Generic[]>(() => []);

  console.log(selections);

  const handleOptionChange =
    (selection: Generic) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelections((prevState) => [selection, ...prevState]);
      } else {
        setSelections((prevState) =>
          prevState.filter(
            (prevSelection) =>
              getOptionValue(prevSelection) !== getOptionValue(selection)
          )
        );
      }
    };

  return (
    <div ref={reference} className="relative">
      <TextField
        label={label}
        errors={errors}
        {...textFieldProps}
        onFocus={handleShowModal}
      />
      <Modal
        options={options}
        show={showModal}
        modalRef={floating}
        modalStyle={{
          left: x ?? undefined,
          top: y ?? undefined,
          position: strategy,
        }}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        handleOptionChange={handleOptionChange}
        selections={selections}
      />
    </div>
  );
};
