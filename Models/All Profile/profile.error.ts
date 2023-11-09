import { HttpException, HttpStatus } from '@nestjs/common';

export class PhonenumberExistsforUpdate extends HttpException {
    constructor() {
      super('Phone Number is Used by another User.', HttpStatus.BAD_REQUEST);
    }
  }


  export class NoDistributorFound extends HttpException {
    constructor() {
      super('There is no Distributor.', HttpStatus.BAD_REQUEST);
    }
  }

  export class NoIndustryFound extends HttpException {
    constructor() {
      super('There is no Industry.', HttpStatus.BAD_REQUEST);
    }
  }