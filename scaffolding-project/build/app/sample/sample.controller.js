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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleController = void 0;
//comentario para git
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const typedi_1 = require("typedi");
const error_1 = require("../../error/error");
const sample_service_1 = require("./sample.service");
let SampleController = class SampleController {
    constructor(sampleService, errorService) {
        this.sampleService = sampleService;
        this.errorService = errorService;
    }
    router() {
        const router = (0, express_1.Router)();
        router.get('/:sampleId', (req, res, next) => this.get(req, res, next));
        router.get('/', (req, res, next) => this.getAll(req, res, next));
        router.post('/', (req, res, next) => this.create(req, res, next));
        router.put('/:sampleId', (req, res, next) => this.update(req, res, next));
        router.delete('/:sampleId', (req, res, next) => this.delete(req, res, next));
        return router;
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Si no llega sampleId en la petición  devolvemos FORBIDDEN
            if (req.params.sampleId == null && req.query.name == null) {
                return next(this.errorService.sendError(res, http_status_codes_1.StatusCodes.FORBIDDEN));
            }
            try {
                // 2. Buscamos los samples que coinciden con el filtro de búsqueda.
                const sampleCode = parseInt(req.params.sampleId);
                const sample = yield this.sampleService.findById(sampleCode);
                // 3. Devolvemos los samples.
                res.send(sample);
            }
            catch (err) {
                console.log(err);
                // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
                res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const samples = yield this.sampleService.findAll();
                res.send(samples);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sample = yield this.sampleService.create(req.body);
                res.send(sample);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Si no llega sampleId en la petición  devolvemos FORBIDDEN
            if (req.params.sampleId == null && req.query.name == null) {
                return next(this.errorService.sendError(res, http_status_codes_1.StatusCodes.FORBIDDEN));
            }
            if (req.body.type == undefined) {
                return next(this.errorService.sendError(res, http_status_codes_1.StatusCodes.FORBIDDEN));
            }
            try {
                // 2. Buscamos los samples que coinciden con el filtro de búsqueda.
                const sampleCode = parseInt(req.params.sampleId);
                const sampleType = req.body.type;
                const sample = yield this.sampleService.update(sampleCode, sampleType);
                // 3. Devolvemos los samples.
                res.send(sample);
            }
            catch (err) {
                console.log(err);
                // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
                res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Si no llega sampleId en la petición  devolvemos FORBIDDEN
            if (req.params.sampleId == null && req.query.name == null) {
                return next(this.errorService.sendError(res, http_status_codes_1.StatusCodes.FORBIDDEN));
            }
            try {
                // 2. Buscamos los samples que coinciden con el filtro de búsqueda.
                const sampleCode = parseInt(req.params.sampleId);
                const sample = yield this.sampleService.delete(sampleCode);
                // 3. Devolvemos los samples.
                res.send(sample);
            }
            catch (err) {
                console.log(err);
                // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
                res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
            }
        });
    }
};
exports.SampleController = SampleController;
exports.SampleController = SampleController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [sample_service_1.SampleService,
        error_1.ErrorService])
], SampleController);
