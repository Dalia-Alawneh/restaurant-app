import { FormikValues } from 'formik';
import { ISelectOptions } from '../../interfaces'

interface IProps {
    options: ISelectOptions[];
    formik: FormikValues ;
}

export default function SelectInput({ options, formik }: IProps) {
    return (
        <div className="mt-3">
            <select
                value={formik.values.categories}
                multiple
                onChange={(e) => formik.setFieldValue('categories', Array.from(e.target.selectedOptions, (option) => option.value))}
                id="categories" name='categories' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {options.map((option, optionIdx) => (
                    <option
                        key={optionIdx}
                        value={option.id}
                        className="relative cursor-default select-none py-2 pl-10 pr-4"
                    >
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    )
}
