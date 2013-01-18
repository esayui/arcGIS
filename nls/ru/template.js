define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "Описание"
    },
    errors:{
      createMap: "Не удалось создать карту",
      general: "Ошибка"
    }
  },
  tools:{
    tweets: {
    label: "Записи в Twitter",
    title: "Записи в Twitter",
    error: "Результаты не найдены, попробуйте другой термин или местоположение для поиска",
		search:{
			label: "Поиск",
			title: "Поиск в Twitter",
			placeholder: 'Ключевые слова для поиска'
		},
		clear:{
			label: "Очистить",
			title: "Очистить карту"
		},
		share:{
			label: "Общий доступ к карте:",
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