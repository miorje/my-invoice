import {IUserModel, userModel as user} from "./model/user";
import {createStore} from "easy-peasy";

export interface IStoreModel{
    user:IUserModel
}

export const store = createStore({user},{
    name:"store-invoice"
})