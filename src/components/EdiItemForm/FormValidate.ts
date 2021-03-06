import {ValuesType} from "./EditItemForm";

export const validate = (values: ValuesType, editForm: boolean) => {
    const errors: Partial<ValuesType> = {};

    if (!values.name && !editForm) {
        errors.name = 'Заполните поле';
    } else if (values.name.length > 50) {
        errors.name = 'Должно быть 50 символов или меньше';
    }

    if (!values.amount && !editForm) {
        errors.amount = 'Заполните поле';
    }

    if(!values.price){
        errors.price = 'Заполните поле';
    }

    return errors;
};