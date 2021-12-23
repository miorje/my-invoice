import { action, Action, persist, thunk, Thunk } from "easy-peasy";
import Router from "next/router";
import { IStoreModel } from "../index";
import exp from "constants";
import { IUser } from "./user";

export interface IGroup {
  id?: string;
  name: string;
  users: string[];
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
  getGroup: Thunk<
    IGroupModel,
    IStoreModel,
    IGroup , IGetGroup
  >;

}

export interface IGetGroup extends Omit<IGroup, "users"> {
  users: IUser[];
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    setGroups: action((state, group) => {
      group["id"] = `group-${new Date().getTime()}`;

      state.groups.push(group);
    }),
    getGroup: thunk((actions, groupId, helpers) => {
      const group = helpers
        .getState()
        .groups.find((group) => group.id === groupId);

      const users = group?.users.map((userId) =>
        helpers.getStoreActions().user.getUser(userId)
      );

      console.log("dekat sini: ", users);

      if (!group) {
        return {
          id: "",
          users: [],
          name: "",
        };
      }
      return {
        ...group,
        users,
      };
    }),
  },
  {
    storage: "localStorage",
  }
);
