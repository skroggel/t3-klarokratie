(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "youTube",
      purposes: ['multimedia'],
      // contextualConsentOnly: true,
      translations: {
        zz: {
          title: 'YouTube'
        },
        en: {
          description: 'We embed videos from the "YouTube" platform of the provider Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, on our website. YouTube is integrated by embedding the service on our website by means of a so-called iFrame. When loading this iFrame, YouTube or Google may collect and process information (including personal data). It cannot be ruled out that YouTube or Google may also transmit the information to a server in a third country.'
        },
        de: {
          description: 'Wir binden auf unserer Website Videos der Plattform "YouTube" des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Die Einbindung von YouTube erfolgt durch das Einbetten des Service auf unserer Webseite mittels eines sog. iFrames. Beim Laden dieses iFrames erheben YouTube bzw. Google unter Umständen Informationen (auch personenbezogene Daten) und verarbeiten diese. Dabei kann nicht ausgeschlossen werden, dass YouTube bzw. Google die Informationen auch an einen Server in einem Drittland übermittelt.'
        },
      }
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
