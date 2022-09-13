import {Joi, getOptions} from "../../lib/validate";

export function checkPhone(data, lang) {
    const schema = Joi.object({
        phone: Joi.string().trim().min(8).max(11).pattern(/^(0|\+84)\d+$/).required()
    }).required();
    return schema.validate(data, [getOptions(lang), {stripUnknown: true}]);
}

export function checkCustomerData(data, lang) {
    const customer = Joi.object().keys({
        profile: Joi.object({
            name: Joi.string().trim().max(255).pattern(/^[a-zA-Z0-9\s]+$/).required(),
            email: Joi.string().trim().max(255).email({ignoreLength: true}).allow(null).default(null),
            dob: Joi.date().format('DD-MM-YYYY').less('now').min('01-01-1900').allow(null).default(null),
            gender: Joi.string().trim().valid('Nam', 'Nữ', 'Khác').required(),
            address: Joi.array().min(1).max(5).items(Joi.object({
                ward: Joi.number().integer().required(),
                street: Joi.string().trim().sanitize().max(500).required(),
                district: Joi.number().integer().required(),
                province: Joi.number().integer().required(),
            })).default([]),
            note: Joi.string().trim().sanitize().max(255)
        }).required(),
        group: Joi.array().min(1).items(Joi.string().trim().uuid()).required(),
        label: Joi.array().min(1).items(Joi.string().trim().uuid()).required(),
        phone: Joi.array().min(1).max(10).items(Joi.string().trim().min(8).max(11).pattern(/^(0|\+84)\d+$/)).required(),
        social_profile: Joi.array().min(1).items(
            Joi.object({
                name: Joi.string().trim().sanitize().max(255).required(),
                url: Joi.string().trim().sanitize().uri({scheme: ['https']}).required(),
                social_id: Joi.string().trim().sanitize().max(255).allow(null).default(null),
                phone: Joi.string().trim().min(8).max(11).pattern(/^(0|\+84)\d+$/).allow(null).default(null)
            })
        ).required(),
        contract: Joi.array().min(1).items(Joi.object({
            contract_id: Joi.string().trim().sanitize().max(255).required(),
            service_name: Joi.string().trim().sanitize().max(255).required(),
            signing_date: Joi.date().format('DD-MM-YYYY').less('now').min('01-01-1900').required(),
            status: Joi.string().trim().sanitize().max(255).required()
        })).required()
    }).required()
    return customer.validate(data, [getOptions(lang), {stripUnknown: true}]);
}