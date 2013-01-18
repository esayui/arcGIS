define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Beschreibung"
    },
    errors:{
      createMap: "Karte kann nicht erstellt werden",
      general: "Fehler"
    }
  },
  tools:{
    tweets: {
    label: "Tweets",
    title: "Tweets",
    error: "Es wurden keine Ergebnisse gefunden. Versuchen Sie es mit einem anderen Suchbegriff oder einer anderen Position",
		search:{
			label: "Suchen",
			title: "Twitter durchsuchen",
			placeholder: 'Schlagwörter für die Suche'
		},
		clear:{
			label: "Löschen",
			title: "Karte löschen"
		},
		share:{
			label: "Karte freigeben:",
			email:{
				title: "E-Mail",
				label: "E-Mail"
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