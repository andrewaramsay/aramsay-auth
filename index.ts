import 'core-js';
if (!Reflect.defineMetadata) {
	require('reflect-metadata');
}

export { AuthenticationService } from './src/business/authentication.service';
export { UsersRepository } from './src/data/repositories/users.repository';
export { AuthModule } from './src/dependency-injection/auth-module';
export * from './src/startup';
