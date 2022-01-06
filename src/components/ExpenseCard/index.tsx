import { FunctionComponent, useMemo } from "react";
import { IGetExpensesByGroup } from "../../store/model/expense";
import exp from "constants";
import dayjs from "dayjs";

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

  const date = useMemo(
    () => ({
      month: dayjs(expense.created).format("MMM"),
      day: dayjs(expense.created).format("DD"),
    }),
    [expense.created]
  );
  return (
    <div
      key={expense.id}
      className="grid grid-cols-12 gap-4 border-gray-700 rounded-lg shadow-md"
    >
      <section className="col col-span-1">
        <h2 className="text-xl font-extrabold text-gray-800">{date.month}</h2>
        <span>{date.day}</span>
      </section>
      <div className="col col-start-2 col-end-11">{expense.name}</div>
      <div className="col col-span-1 col-end-auto ">{total}</div>
    </div>
  );
};
