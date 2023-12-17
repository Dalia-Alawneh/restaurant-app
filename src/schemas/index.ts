import * as Yup from 'yup';

export const signupSchema = Yup.object({
    identifier: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
})
export const signinSchema = Yup.object().shape({
    identifier: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
