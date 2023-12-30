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


export const productValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    img: Yup.mixed().required('Image is required'),
    categories: Yup.array().of(Yup.number().required('Category is required')),
    discount: Yup.number()
        .typeError('Discount must be a number')
        .min(0, 'Discount must be at least 0')
        .max(100, 'Discount cannot exceed 100')
        .required('Discount is required'),
    price: Yup.number()
        .typeError('Price must be a number')
        .min(0, 'Price must be at least 0')
        .required('Price is required'),
    duration: Yup.string().required('Duration is required'),
    rating: Yup.number()
        .typeError('Rating must be a number')
        .min(0, 'Rating must be at least 0')
        .max(5, 'Rating cannot exceed 5')
        .required('Rating is required'),
});