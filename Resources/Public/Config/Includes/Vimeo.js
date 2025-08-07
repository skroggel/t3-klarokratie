(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "vimeo",
      purposes: ['multimedia'],
      // contextualConsentOnly: true,
      translations: {
        zz: {
          title: 'Vimeo'
        },
        en: {
          description: 'We embed videos from the "Vimeo" platform of the provider Vimeo Inc., 330 W 34th St, Suite 5, New York, NY, USA, on our website. Vimeo is integrated by embedding the service on our website by means of a so-called iFrame. When loading this iFrame, Vimeo may collect and process information (including personal data). It cannot be ruled out that Vimeo may also transmit the information to a server in a third country.'
        },
        de: {
          description: 'Wir binden auf unserer Website Videos der Plattform "Vimeo" des Anbieters Vimeo Inc., 330 W 34th St, Suite 5, New York, NY, USA, ein. Die Einbindung von Vimeo erfolgt durch das Einbetten des Service auf unserer Webseite mittels eines sog. iFrames. Beim Laden dieses iFrames erhebt Vimeo unter Umständen Informationen (auch personenbezogene Daten) und verarbeiten diese. Dabei kann nicht ausgeschlossen werden, dass Vimeo die Informationen auch an einen Server in einem Drittland übermittelt.'
        },
      },
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
