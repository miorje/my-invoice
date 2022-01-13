import { ChangeEvent, RefObject, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoCompletel";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";
import { Chip } from "../Chip";

interface IAutoComplete<Generic>
  extends ITextField,
    Pick<IModal<Generic>, "getOptionLabel" | "getOptionValue"> {
  options: Generic[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AutoComplete = <Generic extends object>({
  label,
  errors,
  options,
  onChange,
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

  useClickAway(() => {
    handleCloseModal();
  }, [refs.reference as RefObject<HTMLElement>]);

  const [selections, setSelections] = useState<Generic[]>(() => []);

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

      onChange(event);
    };

  return (
    <div ref={reference} className="relative">
      <TextField
        label={label}
        errors={errors}
        {...textFieldProps}
        onFocus={handleShowModal}
        inputAdornment={selections.map((selection) => (
          <Chip
            handleDelete={handleOptionChange(selection)}
            key={getOptionValue(selection)}
            value={getOptionValue(selection)}
          >
            {getOptionLabel(selection)}
          </Chip>
        ))}
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
