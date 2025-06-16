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
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Duration:', '1 year')
        },
        de: {
          description: 'Wir setzen auf unserer Website "Google Tag Manager" und "Google Ads" des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Google kann unter Umständen Informationen (auch personenbezogene Daten) erfassen und verarbeiten. Dabei kann nicht ausgeschlossen werden, dass Google die Informationen auch an einen Server in einem Drittland übermittelt.' +
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Dauer:', '1 Jahr')
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

        // we grant analytics storage
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        console.log('Google Ads allowed! Thank you!');
      `,
      onDecline: `

        // we again explicitly deny analytics storage
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
