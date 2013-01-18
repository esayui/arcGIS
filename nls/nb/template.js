define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Beskrivelse"
    },
    errors:{
      createMap: "Kan ikke opprette kart",
      general: "Feil"
    }
  },
  tools:{
    tweets: {
    label: "Twittermeldinger",
    title: "Twittermeldinger",
    error: "Fant ingen resultater, prøv et annet søkeord eller lokasjon",
		search:{
			label: "Søk",
			title: "Søk på Twitter",
			placeholder: 'Nøkkelord å søke etter'
		},
		clear:{
			label: "Fjern",
			title: "Fjern kart"
		},
		share:{
			label: "Del kart:",
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