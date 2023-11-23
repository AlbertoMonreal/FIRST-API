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
exports.SampleService = void 0;
const lodash_1 = require("lodash");
const typedi_1 = require("typedi");
const sample_repository_1 = require("./sample.repository");
let SampleService = class SampleService {
    constructor(sampleRepository) {
        this.sampleRepository = sampleRepository;
    }
    findById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(sampleId)) {
                return Promise.reject(new Error('InvalidSampleIdError'));
            }
            return yield this.sampleRepository.findById(sampleId);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sampleRepository.findAll();
        });
    }
    create(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidSample(sample)) {
                return Promise.reject(new Error('InvalidSampleError'));
            }
            return yield this.sampleRepository.create(sample);
        });
    }
    isValidId(id) {
        return id != null && (0, lodash_1.isNumber)(id) && id > 0;
    }
    isValidType(type) {
        //Sin contar tampoco con los espacios en blanco al principio y al final de una cadena-> Uso trim()
        return type != null && typeof type == 'string' && type.trim().length > 0;
    }
    isValidSample(sample) {
        if (sample === null || sample === void 0 ? void 0 : sample.type) {
            return true;
        }
        else {
            return false;
        }
    }
    //Digo que hay que borrar.De manera generica.
    delete(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(sampleId)) {
                return Promise.reject(new Error('InvalidSampleIdError'));
            }
            return yield this.sampleRepository.delete(sampleId);
        });
    }
    //Digo que hay que actualizar.De manera generica.
    update(sampleId, newType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(sampleId)) {
                return Promise.reject(new Error('InvalidSampleIdError'));
            }
            if (!this.isValidType(newType)) {
                return Promise.reject(new Error('InvalidSampleTypeError'));
            }
            return yield this.sampleRepository.update(sampleId, newType);
        });
    }
};
exports.SampleService = SampleService;
exports.SampleService = SampleService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [sample_repository_1.SampleRepository])
], SampleService);
