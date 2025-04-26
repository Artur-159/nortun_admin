import * as yup from "yup";

const createAdminValid = yup.object().shape({
  name: yup.string().required("Անուն Ազգանուն դաշտը պարտադիր է!"),
  email: yup
    .string()
    .required("Էլ. հասցե դաշտը պարտադիր է!")
    .email("Խնդրում ենք մուտքագրել վավեր էլ. հասցե"),
  password: yup.string().required("Անուն դաշտը պարտադիր է!"),
  role: yup
    .string()
    .required("Դաշտը պարտադիր է!")
    .transform((value) => (value?.value ? String(value.value) : value)),
});

const personalValid = yup.object().shape({
  name: yup.string().required("Անուն դաշտը պարտադիր է!"),
  email: yup
    .string()
    .required("Էլ. հասցե դաշտը պարտադիր է!")
    .email("Խնդրում ենք մուտքագրել վավեր էլ. հասցե"),
});

export { createAdminValid, personalValid };
