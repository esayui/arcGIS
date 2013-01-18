define(
({
  viewer:{
    main:{
      scaleBarUnits: "metric" //"english (for miles) or "metric" (for km) - don't translate.
    },
   sidePanel:{
   	label: "الوصف"
    },
    errors:{
      createMap: "يتعذر إنشاء الخريطة",
      general: "خطأ"
    }
  },
  tools:{
    tweets: {
    label: "تغريدات",
    title: "تغريدات",
    error: "لم يتم العثور على أية نتائج، استخدم مصطلح آخر للبحث أو موقع آخر",
		search:{
			label: "بحث",
			title: "البحث في تويتر",
			placeholder: 'المفاتيح الأساسية للبحث'
		},
		clear:{
			label: "مسح",
			title: "مسح الخريطة"
		},
		share:{
			label: "مشاركة الخريطة:",
			email:{
				title: "البريد الإلكتروني",
				label: "البريد الإلكتروني"
			},
			twitter:{
				title: "تويتر",
				label: "تويتر"
			},
			facebook:{
				title: "فيس بوك",
				label: "فيس بوك"
			}
		}
	 }
   }
 })
);