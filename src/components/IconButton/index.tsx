import { ButtonHTMLAttributes, forwardRef, FunctionComponent } from "react";
import { motion } from "framer-motion";

const IconButtonLayout = forwardRef<
    FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>>
    >((props, ref) => (
    <button
        className="text-gray-400 bg-opacity-50 shadow-md rounded-xl p-2 backdrop-filter backdrop-blur firefox:bg-opacity-90"
        //@ts-ignore
        ref={ref}
        {...props}
    />
));

IconButtonLayout.displayName = "icon-button";

export const IconButton = motion(IconButtonLayout);