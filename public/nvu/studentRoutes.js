routes = [{
    name : "الرئيسية",
    type : "local",
    group : "user",
    children : [{
        name : "الملف الشخصي",
        url : "/",
        tmp :"profile"
    },{
        name : "الكارت",
        url : "card",
    },{  
        name : "الاختبار",
        url : "test",
    },{
        name : "الصفحة الرئيسية",
        url : "/",
        type : "non-local",
    }] // end children
},{
    name : "النتائج",
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