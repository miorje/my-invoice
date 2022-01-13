import { Avatar } from "./Avatar";
import { motion } from "framer-motion";

interface IUserAvatarGroup {
  users: string[];
}

export const UserAvatarGroup = (props: IUserAvatarGroup) => {
  return (
    <div className=" flex">
      {props.users.map((user, index) => (
        <motion.div
          initial={{ opacity: 0.4, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          key={user}
        >
          <Avatar id={user} index={index} />
        </motion.div>
      ))}
    </div>
  );
};
