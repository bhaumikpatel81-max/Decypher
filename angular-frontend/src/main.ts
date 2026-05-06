import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {
    const msg = err?.message || err?.toString() || JSON.stringify(err);
    document.body.innerHTML = `<pre style="color:red;background:#fff;padding:24px;font-size:13px;white-space:pre-wrap;">${msg}</pre>`;
    console.error(err);
  });
