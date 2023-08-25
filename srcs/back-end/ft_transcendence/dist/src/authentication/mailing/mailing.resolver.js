"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mailing_service_1 = require("./mailing.service");
let MailingResolver = exports.MailingResolver = class MailingResolver {
    constructor(mailingService) {
        this.mailingService = mailingService;
    }
    async sendTwoFactorCodeByEmail(email, code) {
        try {
            await this.mailingService.sendMail(email, code);
            return true;
        }
        catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MailingResolver.prototype, "sendTwoFactorCodeByEmail", null);
exports.MailingResolver = MailingResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [mailing_service_1.MailingService])
], MailingResolver);
//# sourceMappingURL=mailing.resolver.js.map