"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = exports.APIError = void 0;
const typedi_1 = require("typedi");
const HttpStatus = __importStar(require("http-status-codes"));
class APIError extends Error {
    constructor(message, code, extra) {
        super(message);
        this.code = 0;
        this.extra = null;
        this.message = message;
        this.code = code;
        this.extra = extra;
    }
}
exports.APIError = APIError;
let ErrorService = class ErrorService {
    createInputValidationError(name) {
        return new APIError(`${name}InputValidationError`, 400);
    }
    createInputError(errors) {
        return new APIError(`InputValidationError`, 400, errors);
    }
    createInvalidIdError(name) {
        return new APIError(`Invalid${name}IdError`, 400);
    }
    createUnauthorizedError(name) {
        return new APIError(`Unauthorized${name}APIError`, HttpStatus.StatusCodes.UNAUTHORIZED);
    }
    createNotFoundError(name) {
        return new APIError(`${name}NotFoundError`, 404);
    }
    createNotAvailableOperationError(name) {
        return new APIError(`Not Available Operation for ${name} datamodel`, 400);
    }
    createInvalidOperationError(name) {
        return new APIError(`InvalidOperaton: ${name}`, 400);
    }
    createFailedDependencyError() {
        return new APIError('FailedDependencyError', 400);
    }
    createUnimplementedMethod(methodName) {
        return new APIError('UnimplementedMethod ' + methodName, 501);
    }
    databaseInternalError(internalError) {
        return new APIError('DatabaseInternalError', 400, {
            internal: internalError,
        });
    }
    sendError(res, errorCode, errText) {
        let errorText = HttpStatus.getStatusText(errorCode);
        if (errText != null) {
            errorText = errorText.concat(`: ${errText}`);
        }
        res.status(errorCode).send({ error: errorText });
    }
};
exports.ErrorService = ErrorService;
exports.ErrorService = ErrorService = __decorate([
    (0, typedi_1.Service)()
], ErrorService);
