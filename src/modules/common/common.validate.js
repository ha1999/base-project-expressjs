import {Joi, getOptions} from "../../lib/validate";

export function checkGetAddress(data, lang) {
    const schema = Joi.object({
        type: Joi.string().trim().valid('province', 'district', 'ward').required(),
        id: Joi.any().when('type', {
            is: 'province',
            then: Joi.number().integer().strip(),
            otherwise: Joi.number().integer().required()
        })
    }).required();
    return schema.validate(data, [getOptions(lang), {stripUnknown: true}]);
}