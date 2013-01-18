define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Opis"
    },
    errors:{
      createMap: "Nie można utworzyć mapy",
      general: "Błąd"
    }
  },
  tools:{
    tweets: {
    label: "Wpisy",
    title: "Wpisy",
    error: "Nie znaleziono wyników, zmień wyszukiwane słowa lub lokalizację",
		search:{
			label: "Wyszukaj",
			title: "Przeszukaj serwis Twitter",
			placeholder: 'Słowa klucze do wyszukania'
		},
		clear:{
			label: "Wyczyść",
			title: "Wyczyść mapę"
		},
		share:{
			label: "Udostępnij mapę:",
			email:{
				title: "Email",
				label: "Email"
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