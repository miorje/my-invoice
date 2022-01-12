import { IGroup } from "../../store/model/group";
import { UserAvatarGroup } from "../UserAvatar";
import {useRouter} from "next/router";

export const Summary = (group: IGroup) => {
  const router = useRouter();

  const handleToGroup = async () => {
    await router.push(`/group/${group.id}`)
  }

  return (
    <div onClick={handleToGroup} className="border-2 border-black pt-1 pb-3 px-1 cursor-pointer">
      <h2>{group.name}</h2>
      <UserAvatarGroup users={group.users} />
    </div>
  );
};
