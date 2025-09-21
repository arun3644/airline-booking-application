import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { AppConfig } from './app/app.config';
import { provideServerRendering } from '@angular/platform-server';

// 👇 Angular expects a default export here
export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      { provide: 'AppConfig', useValue: AppConfig },
      provideServerRendering()
    ]
  });
}
