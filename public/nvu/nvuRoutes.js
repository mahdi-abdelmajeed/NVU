routes = [{
    name : "الرئيسية",
    type : "local",
    group : "primary",
    children : [{
        name : "جامعة وادي النيل",
        url : "/",
        tmp : "main",
    },{
        name : "عن الجامعة",
        url : "",
    },{
        name : "الموؤسسات",
        url : "",
    },{
        name : "تاريخ",
        url : "",
    },{
        name : "اتصل بنا",
        url : "",
    }]
},{
    name : "خدمات الطلاب",
    type : "local",
    children : [{
        name : "منصة الطلاب",
        url : "student",
        type : "non-local",
    },{
        name : "الموؤسسات",
        url : "",
    },{
        name : "تاريخ",
        url : "",
    },{
        name : "اتصل بنا",
        url : "",
    }]
},{
    name : "الكليات",
    type : "local",
    children : [{
        name : "كلية العلوم والتقانة",
        url : "stec",
    },{
        name : "كلية الهندسة والتقنية",
        url : "",
    },{
        name : "كلية الطب",
        url : "",
    },{
        name : "كلية التربية",
        url : "",
    },{
        name : "كلية تجارة",
        url : "",
    }]
}] //end sections