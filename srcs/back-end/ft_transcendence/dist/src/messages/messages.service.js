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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll_msg() {
        return this.prisma.message.findMany({});
    }
    async findOne_msg(id) {
        return this.prisma.message.findUnique({ where: { id: id } });
    }
    create(createMsg) {
        return this.prisma.message.create({ data: createMsg });
    }
    update(id, updateMsg) {
        return this.prisma.message.update({
            where: { id: id },
            data: updateMsg,
        });
    }
    delete(id) {
        return this.prisma.message.delete({ where: { id: id } });
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map