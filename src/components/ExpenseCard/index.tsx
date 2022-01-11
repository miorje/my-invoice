import { FunctionComponent, useMemo } from "react";
import { IExpenseValue } from "../../store/model/expense";
import dayjs from "dayjs";
import { UserCard } from "./UserCard";

export const ExpenseCard: FunctionComponent<IExpenseValue> = (expense) => {
  const total = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR",
      }).format(expense.total),
    [expense.total]
  );

  const totalPerParticipant = useMemo(
    () => expense.total / expense.users.length,
    [expense.users, expense.total]
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
      className="grid grid-cols-12 gap-4 border-gray-700 rounded-lg shadow-md py-6 px-4"
    >
      <section className="col col-span-1">
        <h2 className="text-xl font-extrabold text-red-500">{date.month}</h2>
        <span>{date.day}</span>
      </section>
      <section className="col col-start-2 col-end-11">
        <div className="flex w-full justify-between text-xl font-extrabold text-gray-800">
          <div>{expense.name}</div> <div>{total}</div>
        </div>
        <div className="flex w-full flex-col">
          {expense.users.map((id) => (
            <UserCard
              id={id}
              key={id}
              expenseId={expense.id as string}
              groupId={expense.groupId}
              total={totalPerParticipant}
              payment={expense.payment}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
