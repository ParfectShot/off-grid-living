import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend requests
  await app.listen(3001); // Use port 3001 to avoid conflict with frontend
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
