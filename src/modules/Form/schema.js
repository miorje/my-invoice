import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().min(3, "min 3 char").max(20, "max 20 char"),
});
