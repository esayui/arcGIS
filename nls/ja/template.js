define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "説明"
    },
    errors:{
      createMap: "マップを作成できません",
      general: "エラー"
    }
  },
  tools:{
    tweets: {
    label: "ツイート",
    title: "ツイート",
    error: "結果が見つかりませんでした。別の検索用語または位置を試してください。",
		search:{
			label: "検索",
			title: "Twitter を検索",
			placeholder: '検索キーワード'
		},
		clear:{
			label: "消去",
			title: "マップの消去"
		},
		share:{
			label: "マップの共有:",
			email:{
				title: "電子メール",
				label: "電子メール"
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