import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TeamManagerComponent } from './app/app';
bootstrapApplication(TeamManagerComponent, appConfig)
  .catch((err) => console.error(err));
