(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "etracker",
      purposes: ['statistics'],
      default: true,
      required: true,
      cookies: [

      ],
      translations: {
        zz: {
          title: 'eTracker Cookieless'
        },
        en: {
          description: 'We use etracker Analytics in cookieless standard mode for the statistical analysis of the use of our website. The provider is etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Germany, website: <a href="https://www.etracker.com/" target="_blank" rel="noopener noreferrer">https://www.etracker.com/</a>.<br><br>' +
            'The processing is used for the aggregated statistical analysis of visits, page views, downloads and interactions on our website, so that we can continuously improve our online offering. In cookieless standard mode, no cookies or comparable identifiers are stored on or accessed from your device. The analysis is not carried out for the purpose of providing personalised content or advertising and is not used for direct communication with a specific person.<br><br>' +
            'According to etracker, the data generated with etracker is processed and stored exclusively in Germany and is not combined with other data that would allow conclusions to be drawn about individual persons. The data is not passed on to third parties.<br><br>' +
            'The legal basis for the cookieless use of etracker Analytics is Section 25(2) no. 2 TDDDG, insofar as access to your device is strictly necessary for providing the website and for reach measurement without cookies. Where personal data is processed, the processing is carried out on the basis of Article 6(1)(f) GDPR. Our legitimate interest lies in the privacy-friendly statistical analysis and optimisation of our online offering.'
        },
        de: {
          description: 'Wir verwenden etracker Analytics im cookieless Standardmodus zur statistischen Auswertung der Nutzung unserer Website. Anbieter ist die etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Deutschland, Website: <a href="https://www.etracker.com/" target="_blank" rel="noopener noreferrer">https://www.etracker.com/</a>.<br><br>' +
            'Die Verarbeitung dient der aggregierten statistischen Auswertung von Besuchen, Seitenaufrufen, Downloads und Interaktionen auf unserer Website, damit wir unser Webangebot kontinuierlich verbessern können. Im cookieless Standardmodus werden keine Cookies oder vergleichbaren Identifier auf Ihrem Endgerät gespeichert oder ausgelesen. Die Auswertung erfolgt nicht zum Zweck der Bereitstellung personalisierter Inhalte oder Werbung und nicht zur direkten Kommunikation mit einer bestimmten Person.<br><br>' +
            'Die mit etracker erzeugten Daten werden nach Angaben von etracker ausschließlich in Deutschland verarbeitet und gespeichert und nicht mit anderen Daten zusammengeführt, die einen Rückschluss auf einzelne Personen ermöglichen. Eine Weitergabe der Daten an Dritte erfolgt nicht.<br><br>' +
            'Rechtsgrundlage für den cookieless Einsatz von etracker Analytics ist § 25 Abs. 2 Nr. 2 TDDDG, soweit hierfür ein Zugriff auf Ihr Endgerät zur Bereitstellung der Website und zur Reichweitenmessung ohne Cookies unbedingt erforderlich ist. Soweit personenbezogene Daten verarbeitet werden, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der datenschutzfreundlichen, statistischen Analyse und Optimierung unseres Webangebots.'
        },
      },
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
