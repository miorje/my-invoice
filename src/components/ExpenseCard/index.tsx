import { FunctionComponent, useMemo } from "react";
import { IGetExpensesByGroup } from "../../store/model/expense";

export const ExpenseCard: FunctionComponent<IGetExpensesByGroup> = (
  expense
) => {
  const total = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR",
      }).format(expense.total),
    [expense.total]
  );
  return (
    <div
      key={expense.id}
      className="grid grid-cols-3 gap-4 border-gray-700 border-2 rounded-lg shadow-md"
    >
      <div className="col">{expense.created}</div>
      <div className="col col-span-8">{expense.name}</div>
      <div className="col">{total}</div>
    </div>
  );
};
