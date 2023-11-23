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
exports.Api = void 0;
const express_1 = require("express");
const typedi_1 = require("typedi");
const sample_controller_1 = require("../../app/sample/sample.controller");
let Api = class Api {
    constructor(sampleControler) {
        this.sampleControler = sampleControler;
        this.apiRouter = (0, express_1.Router)();
        this.apiRouter.use('/samples', this.sampleControler.router());
    }
    getApiRouter() {
        return this.apiRouter;
    }
};
exports.Api = Api;
exports.Api = Api = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [sample_controller_1.SampleController])
], Api);
