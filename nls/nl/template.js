define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Beschrijving"
    },
    errors:{
      createMap: "Kan kaart niet maken",
      general: "Fout"
    }
  },
  tools:{
    tweets: {
    label: "Tweets",
    title: "Tweets",
    error: "Geen resultaten gevonden. Probeer een andere zoekterm of locatie",
		search:{
			label: "Zoeken",
			title: "Zoeken op Twitter",
			placeholder: 'Te zoeken trefwoorden'
		},
		clear:{
			label: "Wissen",
			title: "Kaart wissen"
		},
		share:{
			label: "Kaart delen:",
			email:{
				title: "E-mail",
				label: "E-mail"
			},
			twitter:{
				title: "Twitter",
				label: "Twitter"
			},
			facebook:{
				title: "Facebook",
				label: "Facebook"
			}
		}
	 }
   }
 })
);