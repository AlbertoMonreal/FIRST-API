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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const environment_1 = require("../config/environment");
const api_1 = require("./api/api");
const apiError_1 = require("./middlewares/apiError");
let Server = class Server {
    constructor(api) {
        this.api = api;
        this.app = (0, express_1.default)();
        this.setupServer();
        this.httpServer = this.app
            .listen(environment_1.config.port, () => {
            this.onHttpServerListening();
        })
            .on('error', (error) => {
            console.log('Error starting up server:', error);
        });
    }
    setupServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)());
            this.app.use((0, body_parser_1.json)({ limit: '5mb' }));
            this.app.use((0, body_parser_1.urlencoded)({ extended: false }));
            this.app.use('/api', this.api.getApiRouter());
            this.app._router.use(apiError_1.apiError);
        });
    }
    onHttpServerListening() {
        console.log('Server Express iniciado en modo %s (ip: %s, puerto: %s)', environment_1.config.env, environment_1.config.ip, environment_1.config.port);
    }
};
exports.Server = Server;
exports.Server = Server = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [api_1.Api])
], Server);
