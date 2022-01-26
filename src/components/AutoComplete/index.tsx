import { ChangeEvent, RefObject, useMemo, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoCompletel";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";
import { Chip } from "../Chip";
import { event } from "next/dist/build/output/log";
import { useDebounce } from "use-debounce";
import { matchSorter } from "match-sorter";

interface IAutoComplete<Generic>
  extends ITextField,
    Pick<IModal<Generic>, "getOptionLabel" | "getOptionValue"> {
  options: Generic[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filterBy: keyof Generic & string;
  onCreateNew?: (newOption: string) => void;
}

export const AutoComplete = <Generic extends object>({
  label,
  errors,
  options,
  onChange,
  getOptionLabel,
  getOptionValue,
  filterBy,
  onCreateNew,
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

  const [userInput, setUserInput] = useState(() => "");

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const [recommendationInput] = useDebounce(userInput, 250);

  const recommendation = useMemo(() => {
    if (!recommendationInput) {
      return options;
    }

    return matchSorter(options, recommendationInput, { keys: [filterBy] });
  }, [options, filterBy, recommendationInput]);

  const [selections, setSelections] = useState<Generic[]>(() => []);

  const isAllowCreateNew = useMemo(() => Boolean(onCreateNew), [onCreateNew]);

  const handleAddNew = () => {
    if (onCreateNew && userInput) {
      onCreateNew(userInput);
    }
  };

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

      setUserInput("");
      onChange(event);
    };

  return (
    <div ref={reference} className="relative">
      <TextField
        value={userInput}
        onChange={handleChangeInput}
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
        isAllowedToCreateNew={isAllowCreateNew}
        handleAddNew={handleAddNew}
        options={recommendation}
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
