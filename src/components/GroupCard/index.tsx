import { useStoreState } from "../../store/hooks";
import {Summary} from "./  Summary";

export const GroupCard = () => {
  const group = useStoreState((state) => state.group.groups);

  return (
    <section className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4">
      {group.map((group) => (
        <Summary {...group} key={group.id} />
      ))}
    </section>
  );
};