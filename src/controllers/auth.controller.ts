import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.authService.login(req.body.email, req.body.password);

      return res.status(200).json(user);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async profile(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }
}
