import {action, Action, persist} from "easy-peasy";


interface IGroup{
    id:string;
    name:string;
    users: string[];
}

export interface IGroupModel {
    groups:IGroup[],
    setUsers: Action<IGroupModel, IGroup>;
}

export const groupModel: IGroupModel = persist({
    groups:[{name:"Test Group", id:"abc",users:[]}],
    setUsers: action((state,user)=> {
        state.groups.push(user)
    })
},{
    storage: "localStorage"
});