"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = ({ strapi }) => ({
    index(ctx) {
        ctx.body = strapi
            .plugin('strapi-plugin-ai-translate')
            // the name of the service file & the method.
            .service('service')
            .getWelcomeMessage();
    },
    async translate(ctx) {
        try {
            const { fields, targetLocale, subject, background } = ctx.request.body;
            if (!fields || !Array.isArray(fields)) {
                ctx.badRequest('Fields array is required');
                return;
            }
            if (!targetLocale) {
                ctx.badRequest('Target locale is required');
                return;
            }
            const translationService = strapi
                .plugin('strapi-plugin-ai-translate')
                .service('service');
            const results = await translationService.translateFields({
                fields,
                targetLocale,
                subject,
                background,
            });
            ctx.body = {
                success: true,
                results,
            };
        }
        catch (error) {
            ctx.internalServerError('Translation failed', {
                error: error.message,
            });
        }
    },
});
exports.default = controller;
