import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import { productFormFeilds } from '../../../constants';
import SelectInput from '../../../components/ui/SelectInput';
import { useEffect } from 'react';
import { getData, postData } from '../../../utils/helpers';
import { ISelectOptions } from '../../../interfaces';
import axios from 'axios';

interface IProps {
    options: ISelectOptions[]
}
interface MyFormValues {
    title: string;
    // img: string;
    categories: number[];
    discount: number;
    price: number;
    rating: number;
}
const feildClasses = 'w-full text-md bg-transparent p-2 rounded-lg border placeholder:text-sm outline-none focus:outline-none focus-visible:outline-none'
const myForm = ({ options }: IProps) => {
    const initialValues: MyFormValues = { title: '', categories: [], discount: 0, price: 0, rating: 0 };
    const submitHandler = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
        console.log({ values, actions });
        actions.setSubmitting(false);
        const { title, price, img, discount,duration, categories } = values
        console.log({ title, price, img, discount,duration, categories });
        const formData = new FormData()
        formData.append(
            "data",
            JSON.stringify({
                title,
                price,
                discount,
                duration,
                categories,
            })
        )
        formData.append("files", img)
        const res = await axios.post('https://davur-restaurant-server.onrender.com/api/upload', formData)
        console.log(res);
        
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
            >
                <Form className='flex flex-col gap-3 my-4'>
                    {productFormFeilds.map(feild => (

                        <div>
                            <Field className={feildClasses} type={feild.type}
                                placeholder={feild.placeholder} name={feild.name} />
                        </div>

                    ))}
                    <SelectInput options={options} />
                    <div className="mt-4 text-center flex gap-3 justify-center">
                        <button

                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-[--sec-light] px-4 py-2 text-sm font-medium hover:text-white hover:bg-[--sec-color] focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default myForm