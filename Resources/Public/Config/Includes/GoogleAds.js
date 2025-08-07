(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      // In GTM, you should define a custom event trigger named `klaro-google-ads-accepted` which should trigger the Google Ads integration.
      name: "google-ads",
      purposes: ["marketing"],
      cookies: [
        /^_ga(_.*)?/, // we delete the Google cookies if the user declines its use
      ],
      translations: {
        zz: {
          title: 'Google Tag Manager & Google Ads'
        },
        en: {
          description: 'We use "Google Tag Manager" and "Google Ads" of the provider Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, on our website. Google may collect and process information (including personal data). It cannot be ruled out that YGoogle may also transmit the information to a server in a third country.' +
            klarokratieGetTableHtml('Cookie:', 'IDE', 'Duration:', '1 year') +
            klarokratieGetTableHtml('Cookie:', 'test_cookie', 'Duration:', '15 minutes') +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Duration:', '6 months') +
            klarokratieGetTableHtml('Cookie:', 'ANID', 'Duration:', '13 months (in the EU)') +
            klarokratieGetTableHtml('Cookie:', '__gads', 'Duration:', '13 months')
        },
        de: {
          description: 'Wir setzen auf unserer Website "Google Tag Manager" und "Google Ads" des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Google kann unter Umständen Informationen (auch personenbezogene Daten) erfassen und verarbeiten. Dabei kann nicht ausgeschlossen werden, dass Google die Informationen auch an einen Server in einem Drittland übermittelt.' +
            klarokratieGetTableHtml('Cookie:', 'IDE', 'Dauer:', '1 Jahr') +
            klarokratieGetTableHtml('Cookie:', 'test_cookie', 'Dauer:', '15 Minuten', ) +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Dauer:', '6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'ANID', 'Dauer:', '13 Monate (in der EU)') +
            klarokratieGetTableHtml('Cookie:', '__gads', 'Dauer:', '13 Monate', 'Verwendung')
        },
      },
      onInit: ``,
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
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        console.log('Google Ads allowed! Thank you!');
      `,
      onDecline: `

        // we again explicitly deny data storage
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        console.log('Google Ads denied! You are welcome!');
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
