export interface ISelections {
  label: string;
  value: number;
}

export interface IModal {
  selections: ISelections[];
}

export function Modal({ selections }: IModal) {
  return (
    <div className="border-2">
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
