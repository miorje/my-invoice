import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";
import { random } from "nanoid";

export interface IAvatar {
  id: string;
  index: number;
}

const palettes = [
  "#001219ff",
  "#005f73ff",
  "#0a9396ff",
  "#ee9b00ff",
  "#ca6702ff",
  "#bb3e03ff",
  "#9b2226ff",
];

export const Avatar = (props: IAvatar) => {
  const userById = useStoreState((state) => state.user.userById(props.id));

  const user = useMemo(
    () =>
      userById.name?.includes(" ")
        ? userById.name
            ?.split(" ", 2)
            .map((name) => name[0])
            .join("")
            .toUpperCase()
        : userById.name?.[0].toUpperCase(),
    [userById]
  );

  return (
    <div
      style={{
        backgroundColor: palettes[props.index % palettes.length],
      }}
      className="w-8 h-8 text-sm text-white flex justify-center items-center -mr-1 border-2 border-white rounded-full font-medium"
    >
      {user}
    </div>
  );
};
