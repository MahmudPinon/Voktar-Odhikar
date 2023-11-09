import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileAlreadyRedlistError extends HttpException {
    constructor() {
      super('Profile is already Red Listed.', HttpStatus.BAD_REQUEST);
    }
  }

export class ProfiledoesnotExistsError extends HttpException {
  constructor() {
    super('Profile does not exists.', HttpStatus.BAD_REQUEST);
  }
}

export class AuthorizationError extends HttpException {
  constructor() {
    super('Access denied. You are not authorized to perform this action.', HttpStatus.UNAUTHORIZED);
  }
}

export class VerificationNotVerifiedError extends HttpException {
  constructor() {
    super('The Industry or Distributor is not Verified.', HttpStatus.BAD_REQUEST);
  }
}

export class NotanyRedlistedDributor extends HttpException {
  constructor() {
    super('There is not any RedListed Ditributor.', HttpStatus.BAD_REQUEST);
  }
}

export class NotanyRedlistedIndustry extends HttpException {
  constructor() {
    super('There is not any RedListed Industry.', HttpStatus.BAD_REQUEST);
  }
}

export class NoRedListDistributoroftheNumberError extends HttpException {
  constructor() {
    super('There is not any Distributor of this Number.', HttpStatus.BAD_REQUEST);
  }
}

export class NoRedListIndustryoftheNumberError extends HttpException {
  constructor() {
    super('There is not any Industry of this Number.', HttpStatus.BAD_REQUEST);
  }
}