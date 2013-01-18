define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Descrizione"
    },
    errors:{
      createMap: "Impossibile creare la mappa",
      general: "Errore"
    }
  },
  tools:{
    tweets: {
    label: "Tweet",
    title: "Tweet",
    error: "Nessun risultato trovato. Provare con un altro termine o con un\'altra posizione da cercare",
		search:{
			label: "Ricerca",
			title: "Cerca in Twitter",
			placeholder: 'Parole chiave da cercare'
		},
		clear:{
			label: "Cancella",
			title: "Cancella mappa"
		},
		share:{
			label: "Condividi mappa:",
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