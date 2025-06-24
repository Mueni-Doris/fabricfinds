import {
    Controller,
    Post,
    Body,
    Req,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Request } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    async register(
      @Body() body: {
        email: string;
        password: string;
        full_name: string;
        phone_number: string; // still comes in as string from frontend
        username: string;
        location: string;
      }
    ) {
      const userData = {
        ...body,
        phone_number: parseInt(body.phone_number, 10), // 💡 convert to number
      };
  
      return this.authService.register(userData);
    }
  
    @Post('login')
    async login(
      @Body() body: { email: string; password: string },
      @Req() req: Request
    ) {
      const result = await this.authService.login(body.email, body.password);
  
      if (result.success) {
        req.session.user = {
          email: body.email,
        };
      }
  
      return result;
    }
  }
  