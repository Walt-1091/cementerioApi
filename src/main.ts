import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors();

  // --- Swagger config ---
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API Autenticación y autorización con JWT')
    .setVersion('1.0.0')
    .setBasePath('api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa tu JWT token (sin el prefijo Bearer)',
        name: 'Authorization',
        in: 'header',
      },
      'access_token', 
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { 
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  // --- fin Swagger ---

  const port = process.env.PORT || 3000;
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(port);
}
bootstrap();