define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Beskrivning"
    },
    errors:{
      createMap: "Det går inte att skapa kartan",
      general: "Fel"
    }
  },
  tools:{
    tweets: {
    label: "Tweets",
    title: "Tweets",
    error: "Inga resultat hittades, testa med en annan sökterm eller plats",
		search:{
			label: "Sök",
			title: "Sök på Twitter",
			placeholder: 'Sökord'
		},
		clear:{
			label: "Rensa",
			title: "Rensa karta"
		},
		share:{
			label: "Dela karta:",
			email:{
				title: "E-post",
				label: "E-post"
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