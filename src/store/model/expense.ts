import { Action, action, persist, thunk, Thunk } from "easy-peasy";
import { IStoreModel } from "../index";
import { IGetGroup, IGroup } from "./group";

interface IExpenseValue {
  id: string;
  name: string;
  users: string[]; // user.id
  total: number;
  groupId: string;
}

export interface IGetExpenseByGroup extends Omit<IExpenseValue, "groupId"> {}

export interface IExpense {
  [groupId: string]: IGetExpenseByGroup[];
}

export interface IExpenseModel {
  expenses: IExpense;
  setExpenses: Action<IExpenseModel, IExpenseValue>;
  getExpenseByGroup: Thunk<
    IExpenseModel,
    string,
    undefined,
    IStoreModel,
    IGetExpenseByGroup[]
  >;
}

export const expenseModel: IExpenseModel = persist(
  {
    expenses: {},
    setExpenses: action((state, { groupId, ...expense }) => {
      state.expenses[groupId].push(expense);
    }),
    getExpenseByGroup: thunk((actions, groupId, helpers) => {
      const expenseByGroup = helpers.getState().expenses?.[groupId];

      if (!expenseByGroup) {
        return [];
      }

      return expenseByGroup;
    }),
  },
  {
    storage: "localStorage",
  }
);
