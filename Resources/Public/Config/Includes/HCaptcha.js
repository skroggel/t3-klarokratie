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
      translations: {
        zz: {
          title: 'Captcha (hCaptcha)'
        },
        en: {
          description: 'The cookie ensures the functionality of the spam protection (captcha).' +
            klarokratieGetTableHtml('Cookie:', '__cflb', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'hcaptcha', 'Duration:', 'Session')
        },
        de: {
          description: 'Das Cookie stellt die Funktionsfähigkeit des Spam-Schutzes (Captcha) sicher.' +
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
