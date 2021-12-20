import {IUserModel, userModel as user} from "./model/user";
import {IGroupModel, groupModel as group} from "./model/group";
import {IExpenseModel, expenseModel as expense} from "./model/expense";
import {createStore} from "easy-peasy";


export interface IStoreModel{
    user:IUserModel;
    group: IGroupModel;
    expense: IExpenseModel;
}

export const store = createStore({user,group,expense},{
    name:"store-invoice"
})