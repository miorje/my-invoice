import { ChangeEvent, CSSProperties, LegacyRef, Ref, useMemo } from "react";

export interface IModal<Generic> {
  selections: Generic[];
  options: Generic[];
  show: boolean;
  modalStyle: CSSProperties;
  modalRef: Ref<HTMLDivElement>;

  getOptionLabel: (option: Generic) => string;
  getOptionValue: (option: Generic) => string;
  handleOptionChange: (
    selection: Generic
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Modal = <Generic extends object>({
  options,
  show,
  modalStyle,
  modalRef,
  getOptionLabel,
  getOptionValue,
  handleOptionChange,
  selections,
}: IModal<Generic>) => {
  const selectionsValue = useMemo(
    () => selections.map((selections) => getOptionValue(selections)),
    [selections, getOptionValue]
  );
  if (!show) {
    return null;
  }
  return (
    <div
      className="py-2 mt-1 border-gray-50 bg-white rounded-lg shadow-md w-full"
      style={modalStyle}
      ref={modalRef}
    >
      {options.map((item) => (
        <label
          key={getOptionValue(item)}
          className="flex items-center py-1 pl-3"
        >
          <input
            type="checkbox"
            className="w-4 h-4 align-middle mx-1 border-2"
            value={getOptionValue(item)}
            onChange={handleOptionChange(item)}
            checked={selectionsValue.includes(getOptionValue(item))}
          />
          {getOptionLabel(item)}
        </label>
      ))}
    </div>
  );
};
