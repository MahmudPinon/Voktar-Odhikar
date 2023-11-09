import { HttpException, HttpStatus } from '@nestjs/common';

export class productNotaAddedExist extends HttpException{
    constructor(){
      super('There is no product added',HttpStatus.BAD_REQUEST)
    }
}

export class productAlreadyExist extends HttpException{
  constructor(){
    super('Product is already added please update quantity.',HttpStatus.BAD_REQUEST)
  }
}

export class productUpdateFailed extends HttpException{
  constructor(){
    super('Product is not updated',HttpStatus.BAD_REQUEST)
  }
}