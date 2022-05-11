const TextFieldMSONAttributes = ["name", "component", "label", "required", "block", "fullWidth", "hidden", "disabled", "useDisplayValue", "multiline", "help", "minLength", "maxLength"];
const SelectFieldMSONAttributes = ["name", "component", "label", "fullWidth", "options", "required", "block", "hidden", "disabled", "useDisplayValue", "help"];
const BooleanFieldMSONAttributes = ["name", "label", "component", "required", "block", "fullWidth", "hidden", "disabled", "useDisplayValue"];

export const getWellFormedField = (fieldItem) => {
    let component = {}
    for (const property in fieldItem) {
        if (fieldItem.component === "TextField" && TextFieldMSONAttributes.includes(property)) {
            component[property] = fieldItem[property]
        }
        if (fieldItem.component === "SelectField" && SelectFieldMSONAttributes.includes(property)) {
            component[property] = fieldItem[property]
        }
        if (fieldItem.component === "BooleanField" && BooleanFieldMSONAttributes.includes(property)) {
            component[property] = fieldItem[property]
        }
    }
    return component;
}