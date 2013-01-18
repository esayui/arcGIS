define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Descripción"
    },
    errors:{
      createMap: "No se puede crear el mapa",
      general: "Error"
    }
  },
  tools:{
    tweets: {
    label: "Publicaciones en Twitter",
    title: "Publicaciones en Twitter",
    error: "Ningún resultado encontrado, intente buscar con otro término o ubicación",
		search:{
			label: "Buscar",
			title: "Buscar en Twitter",
			placeholder: 'Palabras clave para buscar'
		},
		clear:{
			label: "Borrar",
			title: "Borrar mapa"
		},
		share:{
			label: "Compartir mapa:",
			email:{
				title: "Correo electrónico",
				label: "Correo electrónico"
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