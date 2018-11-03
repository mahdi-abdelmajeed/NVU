API = '/api/v1/';
TMP = '/nvu/tmp/'
appName = 'جامعة وادي النيل';
Cookie = {
  setCookie:function(cname, cvalue=null, expires=null, cpath='/', day=false) {
      if(expires != null) {
          if(day) {
              var d = new Date();
              d.setTime(d.getTime() + (expires*24*60*60*1000));
          }
          else {
              var d = new Date(expires);
          }
          expires = d.toUTCString();
          expires = "expires="+ expires;
      }
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + cpath;
  },
  getCookie:function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  },
  getRemove : function(cname) {
      document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
Auth = {
  getToken : function() {
      return Cookie.getCookie('Authorization');
  },
  unSetToken: function() {
      Cookie.getRemove("Authorization");
  },
  setToken : function(token_type, access_token, expires_at) {
      token = token_type + " " + access_token;
      Cookie.setCookie('Authorization', token, expires_at);
      return true;
  },
  check : function() {
      if(Cookie.getCookie("Authorization")) {
          return true;
      }
      else {
          return false;
      }
  }
}

function min(lenth) {return "يجب أن تكون كلمة المرور أقل من " + lenth + " حرفًا."}

var app = angular.module('nvu', ['ngRoute','ngMaterial','ngMessages']);

app.config(function ($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    /*
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    */
});


app.config(['$mdIconProvider', function($mdIconProvider) {
  $mdIconProvider
    .iconSet('brands', 'fontawesome-free-5.3.1-web/sprites/brands.svg', 24)
    .iconSet('regular', 'fontawesome-free-5.3.1-web/sprites/regular.svg', 24)
    .defaultIconSet('fontawesome-free-5.3.1-web/sprites/solid.svg', 24);
}]);

app.run(function($templateRequest) {

  var urls = [
    'fontawesome-free-5.3.1-web/sprites/brands.svg',
    'fontawesome-free-5.3.1-web/sprites/regular.svg',
    'fontawesome-free-5.3.1-web/sprites/solid.svg'
  ];

  // Pre-fetch icons sources by URL and cache in the $templateCache...
  // subsequent $templateRequest calls will look there first.

  angular.forEach(urls, function(url) {
    $templateRequest(url);
  });

})


app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Adding 'self' to the whitelist, will allow requests from the current origin.
    'self',
    // Using double asterisks here, will allow all URLs to load.
    // We recommend to only specify the given domain you want to allow.
    //'**'
  ]);
});


app.config(function($mdThemingProvider) {
  $mdThemingProvider.alwaysWatchTheme(true);
  $mdThemingProvider.theme('altTheme1')
    .primaryPalette('purple')
    .accentPalette('blue');
  $mdThemingProvider.theme('altTheme2')
    .primaryPalette('teal')
    .accentPalette('orange');
  $mdThemingProvider.theme('altTheme3')
    .primaryPalette('brown')
    .accentPalette('blue-grey');
});

app.config(function($routeProvider) {

  function router(url="/", tmp=null, grp=null) {
    if(tmp == null)
      var tmp = url;
    if(grp != null)
      var tmp = "nvu/tmp/" + grp + "/" + tmp + ".html";
    else
      var tmp = "nvu/tmp/" + tmp + ".html";
    var url =  "/" + url;
    $routeProvider.when(url, {
      templateUrl : tmp,
    })
    return true;
  }

  angular.forEach(routes, function(route) {
    let type = route.type.toLowerCase();
    if(type == "local") {
      angular.forEach(route.children,function(child) {
        type = route.type.toLowerCase();
        let grp = null;
        if(route.group)
          grp = route.group.toLowerCase()
        if(child.type)
          type = child.type.toLowerCase();
        if(child.url && type == "local") {
          var url = child.url;
          if(url.charAt(0) == "/")
            var url = url.substr(1).toLowerCase();
          var tmp = null
          if(child.tmp)
            var tmp = child.tmp.toLowerCase();
          router(url, tmp, grp);
        }
      });
    }
  });

  $routeProvider.otherwise({
    templateUrl : "nvu/tmp/notfound.html",
  });
});

app.run(function($rootScope,$mdToast) {
  if(Auth.check()) {
    $rootScope.checkToken = true;
  }
  else {
    $rootScope.checkToken = false;
  }
  $rootScope.appName = appName;
  $rootScope.progressval = 30;
  $rootScope.toast = function(str) {
    var isDlgOpen;
    $mdToast.show({
      hideDelay   : 3000,
      position    : 'top right',
      controller  : function($scope) {
        $scope.str = str;
        $scope.closeToast = function() {
        }
        $scope.closeToast = function() {
          if (isDlgOpen) return;
  
          $mdToast
            .hide()
            .then(function() {
              isDlgOpen = false;
            });
        };
      },
      templateUrl : 'nvu/tmp/toast.html'
    });
  }
});