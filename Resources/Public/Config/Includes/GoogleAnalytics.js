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
      ],
      translations: {
        zz: {
          title: 'Google Tag Manager & Google Analytics'
        },
        en: {
          description: 'We use "Google Tag Manager" and "Google Analytics" of the provider Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, on our website. Google may collect and process information (including personal data). It cannot be ruled out that YGoogle may also transmit the information to a server in a third country.' +
            klarokratieGetTableHtml('Cookie:', '_ga', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '_gid', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', '_gat', 'Duration:', '1 minute') +
            klarokratieGetTableHtml('Cookie:', '_gac_*', 'Duration:', '90 days')
        },
        de: {
          description: 'Wir setzen auf unserer Website "Google Tag Manager" und "Google Analytics" des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Google kann unter Umständen Informationen (auch personenbezogene Daten) erfassen und verarbeiten. Dabei kann nicht ausgeschlossen werden, dass Google die Informationen auch an einen Server in einem Drittland übermittelt.' +
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
