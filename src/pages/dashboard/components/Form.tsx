import React from 'react';
import {
    useFormik,
    FormikHelpers,
} from 'formik';
import { getTokenFromCookie, postData, putData } from '../../../helpers/api';
import { IProduct, ISelectOptions } from '../../../interfaces';
import SelectInput from '../../../components/ui/SelectInput';
import { productFormFeilds } from '../../../constants';
import { productValidationSchema } from '../../../schemas';
import { FormikErrorsWithIndexSignature, FormikTouchedWithIndexSignature } from '../../Auth/pages/Login/Login';
import toast from 'react-hot-toast';

interface IProps {
    options: ISelectOptions[];
    closeModal: () => void;
    initialValues?: MyFormValues | IProduct;
    mode?: "POST" | "PUT"
}

interface MyFormValues {
    title: string;
    img: File | null;
    categories: number[];
    discount: number;
    price: number;
    duration: string;
    rating: number;
}
const defaultInitialValues: MyFormValues = {
    title: '',
    categories: [],
    duration: '',
    img: null,
    discount: 0,
    price: 0,
    rating: 0,
};

const feildClasses =
    'w-full text-md bg-transparent p-2 rounded-lg border placeholder:text-sm outline-none focus:outline-none focus-visible:outline-none';

const MyForm = ({ options, closeModal, initialValues = defaultInitialValues, mode = "POST" }: IProps) => {
    const isUpdateMode = mode === "PUT";
    console.log(initialValues);
    const updateProduct = initialValues?.attributes
    let updateInitailValues: MyFormValues
    if (updateProduct) {
        updateInitailValues = {
            title: updateProduct.title,
            duration: updateProduct.duration,
            price: updateProduct.price,
            discount: updateProduct.discount,
            rating: updateProduct.stars,
            img: updateProduct.img.data.attributes.url,
            categories: updateProduct.categories.data.map((category) => category.id)
        }
    }
    const submitHandler = async (
        values: MyFormValues,
        actions: FormikHelpers<MyFormValues>
    ) => {
        console.log({ values, actions }); console.log(formik.values.categories);

        actions.setSubmitting(false);

        try {
            const { title, price, img, discount, duration, categories } = values;
            const jwt = getTokenFromCookie()
            const formData = new FormData();
            formData.append(
                'data',
                JSON.stringify({
                    title,
                    price,
                    duration,
                    discount,
                    categories,
                })
            );

            if (img !== null) {
                formData.append('files.img', img);
            }

            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);
            // }
            // const res = await postData('/products?populate=*', formData, {
            //     headers:{
            //         Authorization: `Bearer ${jwt}`,
            //         'Content-Type':'application/json; charset=utf-8'
            //     }
            // });
            // console.log({ res });
            if (isUpdateMode) {
                const res = await putData(`/products/${initialValues?.id}?populate=*`, formData);
                console.log({ res });
                toast.success('Menu Item Updated Successfully! ❤️‍🔥');
            } else {
                const res = await postData('/products?populate=*', formData);
                console.log({ res });
                toast.success('Menu Item Added Successfully! ❤️‍🔥');
            }
            closeModal();

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Menu Item not Added. Something Went Wrong!');
        }
    };


    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        const file = event.currentTarget.files?.[0];
        setFieldValue('img', file);
    };


    const formik = useFormik<MyFormValues>({
        initialValues: isUpdateMode ? updateInitailValues : defaultInitialValues,
        validationSchema: productValidationSchema,
        onSubmit: submitHandler,
    });
    const validationErrors: FormikErrorsWithIndexSignature = formik.errors
    const formikTouched: FormikTouchedWithIndexSignature = formik.touched
    const hasErrors = Object.keys(formik.errors).length > 0;
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 my-4">
                {productFormFeilds.map((feild) => (
                    <div key={feild.name}>
                        <input
                            className={feildClasses}
                            type={feild.type}
                            placeholder={feild.placeholder}
                            name={feild.name}
                            onChange={formik.handleChange}
                            value={formik.values[feild.name]}
                        />
                        {validationErrors[`${feild.name}`] && formikTouched[`${feild.name}`] && (
                            <p className="text-red-500 text-xs">* {validationErrors[`${feild.name}`]}</p>
                        )}
                    </div>
                ))}
                <input
                    type="file"
                    className={feildClasses}
                    name="img"
                    onChange={(event) => handleImageChange(event, formik.setFieldValue)}
                />
                {validationErrors[`img`] && formikTouched[`img`] && (
                    <p className="text-red-500 text-xs">* {validationErrors[`img`]}</p>
                )}
                <SelectInput options={options} formik={formik} />
                <div className="mt-4 text-center flex gap-3 justify-center">
                    <button
                        type="submit"
                        className=
                        {`${hasErrors ? "cursor-not-allowed" : ""} 
                        "inline-flex justify-center rounded-md border border-transparent bg-[--sec-light] px-4 py-2 text-sm font-medium hover:text-white hover:bg-[--sec-color] focus:outline-none"`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyForm;
