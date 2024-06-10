import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Lütfen geçerli bir email adresi girin.")
    .required("Email alanı boş bırakılamaz."),
  password: yup
    .string()
    .required("Parola alanı boş bırakılamaz.")
    .min(6, "Parola en az 6 karakter olmalıdır.")
    .max(20, "Parola en fazla 20 karakter olabilir."),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Lütfen geçerli bir email adresi girin.")
    .required("Email alanı boş bırakılamaz."),
  nameAndSurname: yup
    .string()
    .required("Ad ve Soyad alanı boş bırakılamaz.")
    .min(3, "Ad Soyad en az 3 karakter olmalıdır."),
  password: yup
    .string()
    .required("Parola alanı boş bırakılamaz.")
    .min(6, "Parola en az 6 karakter olmalıdır.")
    .max(20, "Parola en fazla 20 karakter olabilir."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Parolalar eşleşmiyor.")
    .required("Parola tekrar alanı boş bırakılamaz."),
});
