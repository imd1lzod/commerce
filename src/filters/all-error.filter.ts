import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class AllErrorHandler implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse()
        const request = context.getRequest()
        // const status = exception.getStatus()
        // console.log(exception);


        response
            .json({
                timeStamp: new Date().toISOString(),
                path: request.url,
                error: exception.name,
                message: exception.message,
            })
    }
}