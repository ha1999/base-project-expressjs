import JoiLib from 'joi';
import DateExtension from '@joi/date';
import Sanitize from 'sanitize-html';

const Joi = JoiLib.extend(DateExtension).extend((joi) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            htmlStrip: 'Should not contain any html tags.',
        },
        rules: {
            sanitize: {
                validate(value, helpers) {
                    const clean = Sanitize(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                    });
                    if (clean) {
                        return clean;
                    }
                    return helpers.error('htmlStrip')
                }
            }
        },
    };
}).extend(joi => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'base64.diagram.script': 'A script tag is forbidden',
            'base64.diagram.svg': 'File must have svg tag',
        },
        rules: {
            diagram: {
                validate(value, helps) {
                    const svg = Buffer.from(value, 'base64').toString('ascii').toLowerCase()
                    if (svg.includes('<script')) return helps.error('base64.diagram.script')
                    if (svg.includes('<svg') && svg.includes('<\/svg')) return value
                    return helps.error('base64.diagram.svg')
                }
            }
        }
    }
});
function getOptions(language) {
    const vi_vn = {};

    let opt = {
        stripUnknown: true,
        language: vi_vn
    };

    if (language === 'en_us')
        return opt.language = {};
    return opt;
}

export {
    Joi,
    getOptions
}
