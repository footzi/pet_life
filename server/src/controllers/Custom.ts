import { Request, Response } from 'express';

export default class CustomController {
  public static test(req: Request, res: Response): void {
    res.send('Custom');
  }
}
