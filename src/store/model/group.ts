import { action, Action, persist } from "easy-peasy";

export interface IGroup {
  id: string;
  name: string;
  users: string[];
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, Omit<IGroup, "id">>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    setGroups: action((state, group) => {
      state.groups.push({ id: `grups-${new Date().getTime()}`,...group });
    }),
  },
  {
    storage: "localStorage",
  }
);
