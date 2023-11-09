import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileAlreadyVerifiedError extends HttpException {
    constructor() {
      super('Profile is already verified.', HttpStatus.BAD_REQUEST);
    }
  }
export class LicenseNumberExistsError extends HttpException {
  constructor() {
    super('License number already exists.', HttpStatus.BAD_REQUEST);
  }
}

export class AuthorizationError extends HttpException {
  constructor() {
    super('Access denied. You are not authorized to perform this action.', HttpStatus.UNAUTHORIZED);
  }
}

export class ProfileMismatchError extends HttpException {
  constructor() {
    super('User ID and license number do not match with the profile.', HttpStatus.UNAUTHORIZED);
  }
  
}
export class NotanyVerificationRequests extends HttpException{
  constructor(){
    super('There is no Requests for Verification',HttpStatus.BAD_REQUEST)
  }
}

export class ProfiledoesnotExistsError extends HttpException{
  constructor(){
    super('There is no Profile for Verification with the Number',HttpStatus.BAD_REQUEST)
  }
}




  