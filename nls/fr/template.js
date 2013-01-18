define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Description"
    },
    errors:{
      createMap: "Impossible de créer la carte",
      general: "Erreur"
    }
  },
  tools:{
    tweets: {
    label: "Tweets",
    title: "Tweets",
    error: "Aucune résultat trouvé, essayez un autre terme de recherche ou emplacement",
		search:{
			label: "Rechercher",
			title: "Rechercher dans Twitter",
			placeholder: 'Mots-clés à rechercher'
		},
		clear:{
			label: "Effacer",
			title: "Effacer la carte"
		},
		share:{
			label: "Partager la carte :",
			email:{
				title: "Adresse électronique",
				label: "Adresse électronique"
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