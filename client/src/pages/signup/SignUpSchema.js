import * as Yup from 'yup';

export const signupSchema = Yup.object({
    username: Yup.string().min(3).max(15).required("Please Enter Your Name!"),
    email: Yup.string().email().required("Please Enter Email!"),
    password: Yup.string().required("Please Enter Password!")
});