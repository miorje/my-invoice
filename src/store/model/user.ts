import {
  Action,
  action,
  computed,
  Computed,
  persist,
  thunk,
  Thunk,
} from "easy-peasy";
import { IStoreModel } from "../index";
import { IGetExpensesByGroup } from "./expense";

export interface IUser {
  id: string;
  name: string;
}

export interface IUserModel {
  users: IUser[];
  setUsers: Action<IUserModel, string>;
  getUser: Thunk<IUserModel, string, undefined, IStoreModel, IUser>;
  userById: Computed<IUserModel, (Id: string) => IUser>;
}

export const userModel: IUserModel = persist(
  {
    users: [],
    userById: computed(
      (state) => (id) =>
        state.users.find((user) => user.id === id) ?? { id: "", name: "" }
    ),
    setUsers: action((state, name) => {
      state.users.push({ name, id: `user-${new Date().getTime()}` });
    }),
    getUser: thunk((actions, payload, helpers) => {
      const user = helpers.getState().users.find((user) => user.id === payload);

      if (!user) {
        return {
          id: "",
          name: "",
        };
      }

      return user;
    }),
  },
  {
    storage: "localStorage",
  }
);
