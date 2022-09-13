import {getOptions, Joi} from "../../lib/validate";

export function checkUpdateUserGroup(data, lang) {
    const schema = Joi.array().items(Joi.string().uuid()).required()
    return schema.validate(data, getOptions(lang));
}