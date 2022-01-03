import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Need group name"),
  users: yup
    .array()
    .min(1, "partipant required")
    .required("participant is required"),
});
