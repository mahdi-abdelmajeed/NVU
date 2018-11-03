//progress controller
app.controller('progressCtrl',progress);
app.controller("toolsCtrl", tools);
app.controller("logoutCtrl", logout);
app.controller("loginCtrl", login);
app.controller("studentCtrl", student);
app.controller("addressCtrl",address);
app.controller('sidenavCtrl', sidenav);
app.controller('veiwCtrl', veiw);
app.controller('mainCtrl', main);
app.controller('themeCtrl', theme);


function progress($scope,$rootScope, $interval) {
  $scope.activated = true;
  $scope.determinateValue = $rootScope.progressval;
  $interval(function() {
    $scope.determinateValue += 1;
    if ($scope.determinateValue > 100) $scope.determinateValue = 5;
  }, 100, 0, true);
}
   
function tools() {
}

function logout($scope, $http, $window) {
    this.name = "تسجيل خروج";
    $scope.logout = async function(event) {
        event.preventDefault()
        let response = await http($http,"POST","logout");
        if(response.success) {
            Auth.unSetToken();
            $window.location.href = '/';
        }
    }
}

function login($scope, $http, $window, $mdDialog) {
    $scope.openDialog = function($event) {
        $mdDialog.show({
          templateUrl: '/nvu/tmp/user/login.html',
          controller:dialogCtrl,
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true
        });
      };
    $scope.user= {email : "mahdi3abdelmajeed@gmail.com", password : "123456", remember_me : true};
    $scope.name = "تسجيل دخول";
    this.login = {
        required : "هاذا الجقل مطلوب",
        email:{
            name : "بريدك الإلكتروني" ,
            unvalid: "يجب أن يكون بريدك الإلكتروني بين 10 و 100 حرفًا ويبدو وكأنه عنوان بريد إلكتروني."
        },
        password : {
            name: "كلمة المرور",
            min : min(60),
        },
        remember_me : {
            name : "تزكرني",
        },
        submit : {
            name : "دخول"
        }        
    };
    $scope.login = async function(event) {
        event.preventDefault()
        data = $scope.user;
        
        try {
            let resolve = await http($http,"POST","login", data, false);

            if(resolve.success) {
                data = resolve.data
                access_token = data.access_token;
                token_type = data.token_type;
                expires_at = data.expires_at;
                Auth.setToken(token_type, access_token, expires_at);
                $window.location.reload();
            }
        }
        catch(err) {
            console.log(err)
            $scope.error = err.data;
        }
    }
};


async function student($http, $scope) {
    try {
        let resolve = await http($http,"GET","user");
        $scope.user = resolve.data;
    }
    catch(err) {
        $scope.userError = err;
    }
}


async function address($http) {
    self = this;
    try {
        let resolve = await http($http,"GET","address");
        self.address = resolve.data;

    }
    catch(err) {
        self.error = err;
    }
}

  
function sidenav($scope, $timeout, $mdSidenav, $log) {
  var self = this;
  self.sections = routes;
  self.isOpen = false;
  self.toggle = function() {
    self.isOpen = !self.isOpen
  }
  $scope.toggleRight = buildToggler('right');
  function debounce(func, wait) {
    var timer;
    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
        .then(function () {
        $log.debug("close RIGHT is done");
        });
    }
};


function main($scope) {
  var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];

  this.colorTiles = (function() {
    var tiles = [];
    for (var i = 0; i < 46; i++) {
      tiles.push({
        color: randomColor(),
        colspan: randomSpan(),
        rowspan: randomSpan()
      });
    }
    return tiles;
  })();

  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function randomSpan() {
    var r = Math.random();
    if (r < 0.8) {
      return 1;
    } else if (r < 0.9) {
      return 2;
    } else {
      return 3;
    }
  }
};

function veiw($scope, $interval) {
  var contant = angular.element(document.querySelector('#veiw')).bind('scroll', function(){

  $scope.top= function() {
    $interval(function() {
      contant[0].scrollTop -= 50;
    }, 1, contant[0].scrollTop/50);
  }

  if(contant[0].scrollTop > 0)
    $("#scrolling").addClass("scrolling");
  else
    $("#scrolling").removeClass("scrolling");
  });
};


function http(http,method,url,data=null,bool=true) {
  return new Promise((resolve, reject)=>{
      if((bool && Auth.check()) || (!bool && !Auth.check())) {
        headers = {};
        if(bool && Auth.check()) {
          headers = {'Authorization' : Auth.getToken()};
        }
        http({
          method : method,
          url : API + url,
          data : data,
          headers : headers
        })
        .then(function Success(response) {
          data = response.data;
          resolve(data)
        }, function Error(response) {
          reject(response.data);
        });
      }
      else {
        reject(null);
      }
  })
}

function dialogCtrl ($mdDialog, $scope) {
  var self = this;
  $scope.cancel = function($event) {
      $mdDialog.cancel();
  };
  $scope.finish = function($event) {
    $mdDialog.hide();
  };
}

function theme($scope, $rootScope, $mdBottomSheet, $mdTheming) {
  Cookie.getCookie('dynamicTheme')? 
  $rootScope.dynamicTheme = Cookie.getCookie('dynamicTheme'):$rootScope.dynamicTheme = "default";
  function changeTheme(theme) {
    $rootScope.dynamicTheme = theme;
    Cookie.setCookie('dynamicTheme', theme);
    
    var removeFunction = $mdTheming.setBrowserColor({
      theme: $rootScope.dynamicTheme, // Default is 'default'
      palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '800' // Default is '800'
    });

    $scope.$on('$destroy', function () {
      removeFunction(); // COMPLETELY removes the browser color
    });
  }
  
  $scope.theme = function() {
    $mdBottomSheet.show({
      templateUrl: TMP + 'theme.html',
      controller: 'themeCtrl',
    }).then(function(clickedItem) {
      changeTheme(clickedItem['val']);
      $rootScope.toast('تم اختيار: ' + clickedItem['name']);
    }).catch(function(error) {
      // User clicked outside or hit escape
    });
  };

  $scope.items = [
    { name: 'السمة الافتراضي',val: 'default'},
    { name: 'السمة الاولى',val: 'altTheme1'},
    { name: 'السمة الثانية',val: 'altTheme2'},
    { name: 'السمة الثالثة',val: 'altTheme3'},
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
};