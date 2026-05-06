import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Unregister any stale service workers that may be intercepting requests
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
