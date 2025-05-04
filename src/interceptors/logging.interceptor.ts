import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs"

export class LoggingInterceptor implements NestInterceptor {
    intercept(constext: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<any> {
        const now = Date.now()

        return next
            .handle()
            .pipe(tap(() => console.log(`${Date.now() - now} - millisecond`)
            ))
    }
}