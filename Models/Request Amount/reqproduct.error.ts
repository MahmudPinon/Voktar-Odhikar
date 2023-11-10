import { HttpException, HttpStatus } from '@nestjs/common';


export class AuthorizationError extends HttpException {
  constructor() {
    super('Access denied. You are not authorized to perform this action.', HttpStatus.UNAUTHORIZED);
  }
}

export class NoRequestAvailable extends HttpException {
  constructor() {
    super('There is no request for this industry.', HttpStatus.BAD_REQUEST);
  }
}
