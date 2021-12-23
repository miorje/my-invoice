import { action, Action, persist } from "easy-peasy";
import Router from "next/router";

export interface IGroup {
  id?: string;
  name: string;
  users: string[];
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    setGroups: action((state, group) => {
      group["id"] = `group-${new Date().getTime()}`;

      state.groups.push(group);
    }),
  },
  {
    storage: "localStorage",
  }
);
