(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "linkedin",
      purposes: ['statistics'],
      cookies: [
        /^_li_(_.*)?/, // we delete the cookies if the user declines its use
      ],
      translations: {
        zz: {
          title: 'LinkedIn'
        },
        en: {
          description: 'We use the LinkedIn service provided by LinkedIn Ireland Unlimited Company, Wilton Place, 2 Dublin, Ireland, email: <a href="mailto:info_impressum@cs.linkedin.com<">info_impressum@cs.linkedin.com</a>, website: <a href="https://www.linkedin.com/" target="_blank">https://www.linkedin.com/</a> on our website. Personal data is also transferred to the USA.\n' +
            klarokratieGetTableHtml('Cookie:', '_li_fat_id', 'Duration:', '30 days' ) +
            klarokratieGetTableHtml('Cookie:', '_li_ses.*', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '_li_giant', 'Duration:', '7 days') +
            klarokratieGetTableHtml('Cookie:', 'UserMatchHistory', 'Duration:', '30 days') +
            klarokratieGetTableHtml('Cookie:', 'AnalyticsSyncHistory', 'Duration:', '30 days') +
            klarokratieGetTableHtml('Cookie:', 'bcookie', 'Duration:', '2 years' ) +
            klarokratieGetTableHtml('Cookie:', 'bscookie', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', 'li_gc', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', 'lidc', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', 'lang', 'Duration:', 'Session')
        },
        de: {
          description: 'Wir verwenden auf unserer Seite den Dienst LinkedIn des Unternehmens LinkedIn Ireland Unlimited Company, Wilton Place, 2 Dublin, Irland, E-Mail: <a href="mailto:info_impressum@cs.linkedin.com<">info_impressum@cs.linkedin.com</a>, Website: <a href="https://www.linkedin.com/" target="_blank">https://www.linkedin.com/</a>. Die Übermittlung personenbezogener Daten erfolgt auch in die USA.\n' +
            klarokratieGetTableHtml('Cookie:', '_li_fat_id', 'Dauer:', '30 Tage') +
            klarokratieGetTableHtml('Cookie:', '_li_ses.*', 'Dauer:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '_li_giant', 'Dauer:', '7 Tage') +
            klarokratieGetTableHtml('Cookie:', 'UserMatchHistory', 'Dauer:', '30 Tage') +
            klarokratieGetTableHtml('Cookie:', 'AnalyticsSyncHistory', 'Dauer:', '30 Tage') +
            klarokratieGetTableHtml('Cookie:', 'bcookie', 'Dauer:', '2 Jahre' ) +
            klarokratieGetTableHtml('Cookie:', 'bscookie', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'li_gc', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'lidc', 'Dauer:', '24 Stunden') +
            klarokratieGetTableHtml('Cookie:', 'lang', 'Dauer:', 'Sitzung')
        },
      },
      onAccept: `

        let intervalEtracker = null;
        function updateEtracker() {
          if (typeof window._etracker == 'object'
              && typeof _etracker.enableCookies == 'function'
              && typeof _etracker.disableCookies == 'function'
          ) {

            let domain = window.location.hostname;
            _etracker.enableCookies(domain);

            window.clearInterval(intervalEtracker);
            intervalEtracker = null;
            // console.log('etracker with cookies allowed! Thank you!');
          }
        }
        intervalEtracker = window.setInterval(updateEtracker, 200);
      `,
      onDecline: `

        if (typeof window._etracker == 'object'
            && typeof _etracker.enableCookies == 'function'
            && typeof _etracker.disableCookies == 'function'
        ) {

          let domain = window.location.hostname;
          _etracker.disableCookies(domain);
          // console.log('etracker with cookies disabled! You are welcome!');
        }
			`,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
