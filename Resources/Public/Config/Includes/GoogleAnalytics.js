(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
      name: "google-analytics",
      purposes: ["statistics"],
      cookies: [
        /^_ga(_.*)?/, // we delete the Google cookies if the user declines its use
        /^_gid/,
      ],
      translations: {
        zz: {
          title: 'Google Tag Manager & Google Analytics'
        },
        en: {
          description: 'We use the Google Tag Manager and Google Analytics services provided by Google Ireland Ltd., Gordon House, Barrow Street, 4 Dublin, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com, website: <a href="https://www.google.com/" target="_blank">https://www.google.com/</a>, on our website. Personal data is also transferred to the USA.' +
            klarokratieGetTableHtml('Cookie:', '_ga', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '_gid', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', '_gat', 'Duration:', '1 minute') +
            klarokratieGetTableHtml('Cookie:', '_gac_*', 'Duration:', '90 days')
        },
        de: {
          description: 'Wir verwenden auf unserer Seite den Dienst Google Tag Manager und Google Analytics des Unternehmens Google Ireland Ltd., Gordon House, Barrow Street, 4 Dublin, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank">https://www.google.com/</a>. Die Übermittlung personenbezogener Daten erfolgt auch in die USA.\n' +
            klarokratieGetTableHtml('Cookie:', '_ga', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', '_gid', 'Dauer:', '24 Stunden') +
            klarokratieGetTableHtml('Cookie:', '_gat', 'Dauer:', '1 Minute') +
            klarokratieGetTableHtml('Cookie:', '_gac_*', 'Dauer:', '90 Tage')
        },
      },
      onInit: `
      `,
      onAccept: `

        klarokratieInjectGoogleTagManager();

        // we notify the tag manager about all services that were accepted. You can define
        // a custom event in GTM to load the service if consent was given.
        for(let k of Object.keys(opts.consents)){
          if (opts.consents[k]){
            let eventName = 'klaro-'+k+'-accepted';
            dataLayer.push({'event': eventName});
            // console.log('Event "' + eventName + '" fired');
          }
        }

        // we grant data storage
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
        });
        console.log('Google Analytics allowed! Thank you!');
      `,
      onDecline: `
        // we again explicitly deny data storage
        gtag('consent', 'update', {
          'analytics_storage': 'denied',
        });
        console.log('Google Analytics denied! You are welcome!');
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
