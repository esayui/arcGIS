define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "描述"
    },
    errors:{
      createMap: "无法创建地图",
      general: "错误"
    }
  },
  tools:{
    tweets: {
    label: "推文",
    title: "推文",
    error: "未找到任何结果，请尝试其他搜索词或位置",
		search:{
			label: "搜索",
			title: "搜索 Twitter",
			placeholder: '要搜索的关键词'
		},
		clear:{
			label: "清除",
			title: "清除地图"
		},
		share:{
			label: "共享地图:",
			email:{
				title: "电子邮件",
				label: "电子邮件"
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