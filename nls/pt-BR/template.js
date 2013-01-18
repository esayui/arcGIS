define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Descrição"
    },
    errors:{
      createMap: "Não foi possível criar o mapa",
      general: "Erro"
    }
  },
  tools:{
    tweets: {
    label: "Tweets",
    title: "Tweets",
    error: "Nenhum resultado localizado, tente outro termo de pesquisa ou localização",
		search:{
			label: "Pesquisar",
			title: "Pesquisar no Twitter",
			placeholder: 'Palavras-chaves para pesquisar'
		},
		clear:{
			label: "Limpar",
			title: "Limpar Mapa"
		},
		share:{
			label: "Compartilhar Mapa:",
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