define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Descriere"
    },
    errors:{
      createMap: "Imposibil de creat harta",
      general: "Eroare"
    }
  },
  tools:{
    tweets: {
    label: "Tweets",
    title: "Tweets",
    error: "Nu a fost găsit niciun rezultat, încercaţi alt termen sau altă locaţie de căutare",
		search:{
			label: "Căutare",
			title: "Căutare pe Twitter",
			placeholder: 'Cuvinte cheie de căutat'
		},
		clear:{
			label: "Golire",
			title: "Golire hartă"
		},
		share:{
			label: "Partajare hartă:",
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