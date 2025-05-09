import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log(`Metod: ${req.method} | Url: ${req.url}`);
        next()
    }
}