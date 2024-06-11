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
  name: yup
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

export const debtFormSchema = yup.object().shape({
  debtName: yup.string().required("Borç adı alanı boş bırakılamaz."),
  lenderName: yup.string().required("Borç veren alanı boş bırakılamaz."),
  debAmount: yup
    .number()
    .typeError("Borç tutarı bir sayı olmalıdır.")
    .required("Borç tutarı alanı boş bırakılamaz.")
    .positive("Borç tutarı pozitif bir sayı olmalıdır.")
    .integer("Borç tutarı tam sayı olmalıdır."),
  interestRate: yup
    .number()
    .typeError("Faiz oranı bir sayı olmalıdır.")
    .required("Faiz oranı alanı boş bırakılamaz.")
    .min(0, "Faiz oranı negatif olamaz.")
    .max(100, "Faiz oranı 100'den büyük olamaz.")
    .transform((value, originalValue) => {
      if (typeof originalValue === "string" && originalValue.trim() === "") {
        return null;
      }
      return value;
    }),
  amount: yup
    .number()
    .typeError("Toplam tutar bir sayı olmalıdır.")
    .required("Toplam tutar alanı boş bırakılamaz.")
    .positive("Toplam tutar pozitif bir sayı olmalıdır.")
    .integer("Toplam tutar tam sayı olmalıdır.")
    .transform((value, originalValue) => {
      if (typeof originalValue === "string" && originalValue.trim() === "") {
        return null;
      }
      return value;
    }),
  paymentStart: yup.date().required("Başlangıç tarihi alanı boş bırakılamaz."),
  installment: yup
    .number()
    .typeError("Taksit sayısı bir sayı olmalıdır.")
    .required("Taksit sayısı alanı boş bırakılamaz.")
    .positive("Taksit sayısı pozitif bir sayı olmalıdır.")
    .integer("Taksit sayısı tam sayı olmalıdır.")
    .transform((value, originalValue) => {
      if (typeof originalValue === "string" && originalValue.trim() === "") {
        return null;
      }
      return value;
    }),
  description: yup.string().optional(), // Açıklama alanı zorunlu değil
});
