import * as yup from 'yup';

export const contactSchema = yup.object({
    fullName: yup.string().required('نام و نام خانوادگی الزامی می باشد'),
    photo : yup.string().required('تصویر کاربر الزامی می باشد'),
    mobile : yup.number().required("شماره تلفن همراه کاربر الزامی می باشد"),
    email : yup.string().email().required("ایمیل الزامی می باشد"),
    job : yup.string().nullable(),
    groups : yup.string().required("گروه کاربر الزامی می باشد")
})