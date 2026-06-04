(function () {
  "use strict";

  // ⚠️ IMPORTANT: replace `wa` with the real WhatsApp number (country + area, no +, no spaces).
  // Example for Argentina mobile: 54 9 11 1234 5678  ->  "5491112345678"
  var WA = "5491155675969"; // +54 11 5567 5969 (con el 9 que pide WhatsApp para celulares AR)
  var IG = "estetica_mira_";
  var ADDRESS = "Arturo Jauretche 1060, B1686 Hurlingham, Provincia de Buenos Aires";

  function wa(msg) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg || "Hola MIRÁ, me gustaría reservar un turno.");
  }

  window.__BRAND__ = {
    name: "MIRÁ",
    fullName: "MIRÁ Estética",
    tagline: "Bienestar de pies a cabeza",
    waNumber: WA,
    instagram: IG,
    instagramUrl: "https://instagram.com/" + IG,
    address: ADDRESS,
    mapsEmbed: "https://www.google.com/maps?q=" + encodeURIComponent("Arturo Jauretche 1060 Hurlingham Buenos Aires") + "&output=embed",
    mapsDir: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("Arturo Jauretche 1060 Hurlingham Buenos Aires Argentina"),
    wa: wa,
    waBook: wa("Hola MIRÁ, me gustaría reservar un turno."),

    pillars: [
      { t: "Belleza", d: "Manos, pies y mirada cuidadas con detalle y materiales de primera." },
      { t: "Bienestar", d: "Masajes y rituales para soltar tensiones y volver a tu centro." },
      { t: "Confianza", d: "Atención personalizada en un espacio cálido, limpio y tuyo." }
    ],

    services: [
      {
        id: "manicuria",
        name: "Manicuría",
        desc: "Esmaltado semipermanente, kapping, soft gel y esculpidas. Diseño a tu gusto.",
        icon: "hand"
      },
      {
        id: "podologia",
        name: "Podología",
        desc: "Pedicuría, reflexología y cuidado especializado, incluido pie diabético.",
        icon: "foot"
      },
      {
        id: "masajes",
        name: "Masajes",
        desc: "Descontracturantes, relajantes y con piedras calientes. Cuerpo completo o espalda.",
        icon: "stone"
      },
      {
        id: "lifting",
        name: "Lifting de pestañas",
        desc: "Realzá tu mirada con un efecto natural, duradero y sin maquillaje.",
        icon: "eye"
      }
    ],

    priceGroups: [
      {
        title: "Manicuría",
        items: [
          { n: "Semi liso", p: "18.000" },
          { n: "Semi + diseño", p: "20.000" },
          { n: "Kapping", p: "22.000" },
          { n: "Kapping + diseño", p: "23.000" },
          { n: "Soft gel", p: "25.000" },
          { n: "Soft gel + diseño", p: "28.000" },
          { n: "Esculpidas cortas", p: "28.000" },
          { n: "Esculpidas cortas + diseño", p: "30.000" },
          { n: "Esculpidas largas", p: "30.000" },
          { n: "Esculpidas largas + diseño", p: "32.000" }
        ]
      },
      {
        title: "Extras",
        items: [
          { n: "Retiro", p: "5.000" },
          { n: "Diseño extra", p: "1.500", note: "c/u" },
          { n: "Semi pies", p: "18.000" },
          { n: "Tradicional", p: "15.000" }
        ]
      },
      {
        title: "Masajes corporales",
        items: [
          { n: "Solo espalda · relajante / descontracturante", p: "25.000" },
          { n: "Cuerpo completo · relajante / descontracturante", p: "30.000" },
          { n: "Piedras calientes", p: "35.000" }
        ]
      },
      {
        title: "Podología",
        items: [
          { n: "Reflexología · 4 sesiones", p: "30.000" },
          { n: "Cada sesión", p: "10.000" },
          { n: "Pedicuría", p: "20.000" },
          { n: "Pie diabético", p: "22.000" }
        ]
      }
    ]
  };
})();
