define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "설명"
    },
    errors:{
      createMap: "맵을 만들 수 없습니다.",
      general: "오류"
    }
  },
  tools:{
    tweets: {
    label: "트윗",
    title: "트윗",
    error: "결과가 없습니다. 다른 검색어 또는 위치를 시도하세요.",
		search:{
			label: "검색",
			title: "Twitter 검색",
			placeholder: '검색 키워드'
		},
		clear:{
			label: "지우기",
			title: "맵 지우기"
		},
		share:{
			label: "맵 공유:",
			email:{
				title: "이메일",
				label: "이메일"
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