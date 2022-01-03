import { CSSProperties, LegacyRef, Ref } from "react";

export interface ISelections {
  label: string;
  value: number;
}

export interface IModal {
  selections: ISelections[];
  show: boolean;
  modalStyle: CSSProperties;
  modalRef: Ref<HTMLDivElement>;
}

export function Modal({ selections, show, modalStyle, modalRef }: IModal) {
  if (!show) {
    return null;
  }
  return (
    <div
      className="py-2 mt-1 border-gray-50 bg-white rounded-lg shadow-md w-full"
      style={modalStyle}
      ref={modalRef}
    >
      {selections.map((item) => (
        <label key={item.value} className="flex items-center py-1 pl-3">
          <input
            type="checkbox"
            className="w-4 h-4 align-middle mx-1 border-2"
            value={item.value}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}
