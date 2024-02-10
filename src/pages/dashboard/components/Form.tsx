import React, { useState } from 'react';
import {
    useFormik,
    FormikHelpers,
} from 'formik';
import { postData, putData } from '../../../helpers/api';
import { ICategory, IProduct, ISelectOptions } from '../../../interfaces';
import SelectInput from '../../../components/ui/SelectInput';
import { productFormFeilds } from '../../../constants';
import { productValidationSchema } from '../../../schemas';
import { FormikTouchedWithIndexSignature } from '../../Auth/pages/Login/Login';
import toast from 'react-hot-toast';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface IProps {
    options: ISelectOptions[];
    closeModal: () => void;
    initialValues?: MyFormValues | IProduct;
    mode?: "POST" | "PUT";
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>>;

}

interface MyFormValues {
    id: number | string;
    title: string;
    img: File | null | string;
    categories: number[];
    discount: number | string;
    stock: number | string;
    price: number | string;
    [key: string]: any;
    duration: string;
    rating: number | string;
}

interface FormikErrorsWithIndexSignature {
    [key: string]: string | string[];
}

const defaultInitialValues: MyFormValues = {
    id: '',
    title: '',
    categories: [],
    duration: '',
    img: null,
    discount: '',
    price: '',
    rating: '',
    stock: ''
};

const feildClasses =
    'w-full text-md bg-transparent p-2 rounded-lg border placeholder:text-sm outline-none focus:outline-none focus-visible:outline-none';

const MyForm = ({ options, closeModal, initialValues = defaultInitialValues, mode = "POST", refetch }: IProps) => {
    const isUpdateMode = mode === "PUT";
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false)
    const updateProduct = initialValues?.attributes
    let updateInitailValues
    if (updateProduct) {
        updateInitailValues = {
            title: updateProduct.title,
            duration: updateProduct.duration,
            stock: updateProduct.stock,
            price: updateProduct.price,
            discount: updateProduct.discount ?? 0,
            rating: updateProduct.stars ?? 0,
            img: updateProduct.img.data.attributes.url,
            categories: updateProduct.categories.data.map((category: ICategory) => category.id)
        }
    }

    const submitHandler = async (
        values: MyFormValues,
        actions: FormikHelpers<MyFormValues>
    ) => {

        actions.setSubmitting(false);

        try {
            const { title, price, img, discount, duration, categories, stock } = values;
            const formData = new FormData();
            formData.append(
                'data',
                JSON.stringify({
                    title,
                    price,
                    duration,
                    discount,
                    categories,
                    isNew: !isUpdateMode,
                    stock,
                })
            );

            if (img !== null) {
                formData.append('files.img', img);
            }

            if (isUpdateMode) {
                await putData(`/products/${initialValues?.id}?populate=*`, formData);
                toast.success('Menu Item Updated Successfully! ❤️‍🔥');

            } else {
                await postData('/products?populate=*', formData);
                toast.success('Menu Item Added Successfully! ❤️‍🔥');
            }
            closeModal();

            refetch()
        } catch (error) {
            toast.error('Menu Item not Added. Something Went Wrong!');
        }
    };


    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void
    ) => {
        const file = event.currentTarget.files?.[0];
        setFieldValue('img', file);
        setIsImageChanged(true)
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
                <div className="flex gap-2 items-center">
                    {mode === 'PUT' && !isImageChanged && <img className='w-[40%]' src={`${formik.values.img}`} />}
                    <input
                        type="file"
                        className={feildClasses}
                        name="img"
                        onChange={(event) => handleImageChange(event, formik.setFieldValue)}
                    />
                </div>
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
                        {mode === 'PUT' ? 'Save Updates' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyForm;
