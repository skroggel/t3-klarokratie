(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: 'facebook',
      purposes: ['marketing'],
      contextualConsentOnly: false,

      cookies: [
        /^_fbp$/,
        /^_fbc$/,
        /^fr$/,
        /^datr$/,
        /^sb$/,
        /^c_user$/,
        /^xs$/,
      ],

      translations: {
        zz: {
          title: 'Meta Pixel / Facebook Pixel'
        },

        en: {
          description:
            'We use the Meta Pixel, also known as the Facebook Pixel, an analytics and marketing service provided by Meta Platforms Ireland Limited. The Meta Pixel is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland, website: <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/</a>.<br><br>' +
            'The Meta Pixel is used to measure website activities, evaluate conversions, create target audiences and improve and display advertising campaigns on Meta platforms. Cookies may be set and personal data may be transmitted to Meta and processed by Meta for measurement, analytics, advertising and profiling purposes, in particular IP address, device and browser information, visited pages, interaction data, event data and cookie or device identifiers.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to Meta Platforms, Inc. in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly.' +
            klarokratieGetTableHtml('Cookie:', '_fbp', 'Duration:', '3 months') +
            klarokratieGetTableHtml('Cookie:', '_fbc', 'Duration:', '3 months') +
            klarokratieGetTableHtml('Cookie:', 'fr', 'Duration:', '3 months') +
            klarokratieGetTableHtml('Cookie:', 'datr', 'Duration:', 'up to 400 days') +
            klarokratieGetTableHtml('Cookie:', 'sb', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', 'c_user / xs', 'Duration:', 'up to 1 year')
        },

        de: {
          description:
            'Wir verwenden den Meta Pixel, auch Facebook Pixel genannt, einen Analyse- und Marketingdienst des Anbieters Meta Platforms Ireland Limited. Der Meta Pixel wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland, Website: <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/</a>.<br><br>' +
            'Der Meta Pixel dient der Messung von Website-Aktivitäten, der Auswertung von Conversions, der Bildung von Zielgruppen und der Verbesserung sowie Ausspielung von Werbekampagnen auf den Plattformen von Meta. Hierbei können Cookies gesetzt und personenbezogene Daten, insbesondere IP-Adresse, Geräte- und Browserinformationen, besuchte Seiten, Interaktionsdaten, Ereignisdaten sowie Cookie- oder Gerätekennungen, an Meta übermittelt und von Meta zu Mess-, Analyse-, Werbe- und Profilingzwecken verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Meta Platforms, Inc. in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist.' +
            klarokratieGetTableHtml('Cookie:', '_fbp', 'Dauer:', '3 Monate') +
            klarokratieGetTableHtml('Cookie:', '_fbc', 'Dauer:', '3 Monate') +
            klarokratieGetTableHtml('Cookie:', 'fr', 'Dauer:', '3 Monate') +
            klarokratieGetTableHtml('Cookie:', 'datr', 'Dauer:', 'bis zu 400 Tage') +
            klarokratieGetTableHtml('Cookie:', 'sb', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'c_user / xs', 'Dauer:', 'bis zu 1 Jahr')
        },
      },
      onInit: ``,
      onAccept: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1687993089038081');
        fbq('track', 'PageView');

        // console.log('Facebook accepted! Thank you!');
      `,
      onDecline: `
        // console.log('Facebook denied! You are welcome!');
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
