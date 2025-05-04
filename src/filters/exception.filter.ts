import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status = exception.getStatus()

        console.log(exception);
        

        response
            .status(status)
            .json({
                statusCode: status,
                timeStamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
                error: exception.name
            })
    }
}