import { Service } from 'typedi';
import * as HttpStatus from 'http-status-codes';

export class APIError extends Error {
  public code = 0;
  public extra?: { [error: string]: string } | null = null;

  constructor(message: string, code: number, extra?: { [error: string]: string }) {
    super(message);
    this.message = message;
    this.code = code;
    this.extra = extra;
  }
}

@Service()
export class ErrorService {
  createInputValidationError(name: string): APIError {
    return new APIError(`${name}InputValidationError`, 400);
  }

  createInputError(errors: { [key: string]: string }): APIError {
    return new APIError(`InputValidationError`, 400, errors);
  }

  createInvalidIdError(name: string): APIError {
    return new APIError(`Invalid${name}IdError`, 400);
  }

  createUnauthorizedError(name: string): APIError {
    return new APIError(`Unauthorized${name}APIError`, HttpStatus.StatusCodes.UNAUTHORIZED);
  }

  createNotFoundError(name: string): APIError {
    return new APIError(`${name}NotFoundError`, 404);
  }

  createNotAvailableOperationError(name: string): APIError {
    return new APIError(`Not Available Operation for ${name} datamodel`, 400);
  }

  createInvalidOperationError(name: string): APIError {
    return new APIError(`InvalidOperaton: ${name}`, 400);
  }

  createFailedDependencyError(): APIError {
    return new APIError('FailedDependencyError', 400);
  }

  createUnimplementedMethod(methodName: string) {
    return new APIError('UnimplementedMethod ' + methodName, 501);
  }

  databaseInternalError(internalError: string): APIError {
    return new APIError('DatabaseInternalError', 400, {
      internal: internalError,
    });
  }

  sendError(res: any, errorCode: number, errText?: string): void {
    let errorText = HttpStatus.getStatusText(errorCode);

    if (errText != null) {
      errorText = errorText.concat(`: ${errText}`);
    }

    res.status(errorCode).send({ error: errorText });
  }
}
