import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title_en: Yup.string()
    .required("Title (EN) is required")
    .min(3, "Title (EN) must be at least 3 characters"),
});
