import { CSSProperties, LegacyRef, Ref } from "react";

export interface IModal<Generic> {
  options: Generic[];
  show: boolean;
  modalStyle: CSSProperties;
  modalRef: Ref<HTMLDivElement>;

  getOptionLabel: (option: Generic) => string;
  getOptionValue: (option: Generic) => string;
}

export const Modal = <Generic extends object>({
  options,
  show,
  modalStyle,
  modalRef,
  getOptionLabel,
  getOptionValue,
}: IModal<Generic>) => {
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
        <label key={getOptionValue(item)} className="flex items-center py-1 pl-3">
          <input
            type="checkbox"
            className="w-4 h-4 align-middle mx-1 border-2"
            value={getOptionValue(item)}
          />
          {getOptionLabel(item)}
        </label>
      ))}
    </div>
  );
};
