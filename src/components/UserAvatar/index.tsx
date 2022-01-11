import { Avatar } from "./Avatar";

interface IUserAvatarGroup{
  users:string[];
}

export const UserAvatarGroup = (props: IUserAvatarGroup) => {
  return (
    <div className=" flex mb-2">
      {props.users.map((user,index) => (
        <Avatar id={user} key={user} index={index}/>
      ))}
    </div>
  );
};
