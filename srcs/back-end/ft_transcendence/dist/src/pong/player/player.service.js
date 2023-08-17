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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PlayerService = exports.PlayerService = class PlayerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPlayerInput) {
        const newPlayer = this.prisma.player.create({
            data: createPlayerInput,
        });
        return newPlayer;
    }
    ;
    findAll() {
        return this.prisma.player.findMany();
    }
    findUnique(id) {
        return this.prisma.player.findUnique({
            where: { id },
        });
    }
    update(id, updatePlayerInput) {
        return this.prisma.player.update({
            where: { id: id },
            data: updatePlayerInput,
        });
    }
    remove(id) {
        return this.prisma.player.delete({
            where: { id: id },
        });
    }
    findWaitingRoomPlayers(id) {
        return this.prisma.player.findMany({
            where: { waitingRoomId: id }
        });
    }
    ;
};
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayerService);
//# sourceMappingURL=player.service.js.map