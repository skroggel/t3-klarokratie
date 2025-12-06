(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: 'captcha',
      default: true,
      required: true,
      purposes: ['functional'],
      cookies: [
        /^__cf_bm/, // we delete the cookies if the user declines its use
        /^__cflb/,
        /^hcaptcha/,
      ],
      translations: {
        zz: {
          title: 'Captcha (hCaptcha)'
        },
        en: {
          description: 'The cookie ensures the functionality of the spam protection (captcha).' +
            klarokratieGetTableHtml('Cookie:', '__cf_bm', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '__cflb', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'hcaptcha', 'Duration:', 'Session')
        },
        de: {
          description: 'Das Cookie stellt die Funktionsfähigkeit des Spam-Schutzes (Captcha) sicher.' +
            klarokratieGetTableHtml('Cookie:', '__cf_bm', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', '__cflb', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'hcaptcha', 'Dauer:', 'Sitzung')
        },
      },
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
