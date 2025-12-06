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
        /^__gads/, // we delete the cookies if the user declines its use
        /^NID/,
        /^ANID/,
        /^IDE/,
        /^test_cookie/,
      ],
      translations: {
        zz: {
          title: 'Google Tag Manager & Google Ads'
        },
        en: {
          description: 'We use the Google Tag Manager and Google Ads services provided by Google Ireland Ltd., Gordon House, Barrow Street, 4 Dublin, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank">https://www.google.com/</a>, on our website. Personal data is also transferred to the USA.\n' +
            klarokratieGetTableHtml('Cookie:', 'IDE', 'Duration:', '1 year') +
            klarokratieGetTableHtml('Cookie:', 'test_cookie', 'Duration:', '15 minutes') +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Duration:', '6 months') +
            klarokratieGetTableHtml('Cookie:', 'ANID', 'Duration:', '13 months (in the EU)') +
            klarokratieGetTableHtml('Cookie:', '__gads', 'Duration:', '13 months')
        },
        de: {
          description: 'Wir verwenden auf unserer Seite den Dienst Google Tag Manager und Google Ads des Unternehmens Google Ireland Ltd., Gordon House, Barrow Street, 4 Dublin, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank">https://www.google.com/</a>. Die Übermittlung personenbezogener Daten erfolgt auch in die USA.\n' +
            klarokratieGetTableHtml('Cookie:', 'IDE', 'Dauer:', '1 Jahr') +
            klarokratieGetTableHtml('Cookie:', 'test_cookie', 'Dauer:', '15 Minuten', ) +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Dauer:', '6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'ANID', 'Dauer:', '13 Monate (in der EU)') +
            klarokratieGetTableHtml('Cookie:', '__gads', 'Dauer:', '13 Monate')
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
