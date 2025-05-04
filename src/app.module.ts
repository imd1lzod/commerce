import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresService } from './database/db';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { LoggingMiddleware } from './middlewares/logging-middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/exception.filter';
import { AllErrorHandler } from './filters/all-error.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { OrderModule } from './modules/orders/order.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), CategoryModule, ProductModule, UserModule, OrderModule],
  providers: [PostgresService,
    { provide: APP_FILTER, useClass: AllErrorHandler },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware)
      .forRoutes("*")
  }
}
