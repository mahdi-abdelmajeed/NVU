<!DOCTYPE html>
<html lang="<?php echo app()->getLocale() ?>" ng-app="NVU">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="<?php echo csrf_token() ?>">

    <title>
        <?php if(Auth::guest()) echo config('app.name', 'STEC'); else echo Auth::user()->name; ?>
    </title>

    <!-- Styles -->
    <link rel = "stylesheet" href = "<?php echo asset('css/angular-material.min.css')?>">
    <link href="<?php echo asset('css/app.css') ?>" rel="stylesheet">
    <link href="<?php echo asset('css/style.css') ?>" rel="stylesheet">
    <!-- Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <!-- App -->
    <script src = "<?php echo  asset('app/lib/angular/angular.min.js') ?>"></script>
    <script src = "<?php echo  asset('app/lib/angular/angular-animate.min.js') ?>"></script>
    <script src = "<?php echo  asset('app/lib/angular/angular-aria.min.js') ?>"></script>
    <script src = "<?php echo  asset('app/lib/angular/angular-messages.min.js') ?>"></script>
    <script src = "<?php echo  asset('app/lib/angular/angular-material.min.js') ?>"></script>
    
</head>
<body class="bg-light">

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '264416200843699',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.1'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
</script>

<fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button>
    <div id="app" style="direction:ltr" class="text:left">
        <form action='/oauth/clients' method='post'>
            <?php echo csrf_field() ?>

            <!--<input type='hidden' name='user_id' value='<?php //echo Auth::user()->id ?>'>-->
            <input type='text' value="medo" placeholder='name' name='name'>
            <input type='text' value="http://localhost:8000/" placeholder='redirect' name='redirect'>
            <input type='submit' value="submit">

        </form>
        <script>
            var app = angular.module('NVU', []);
                app.config(function ($httpProvider) {
                    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
                    $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';
                });
                app.constant({'API_URL' : 'http://localhost:8000/api/v1/'});
                app.controller("LoginController", function($scope, $location, $window, $http, $timeout,API_URL) {
                $scope.errors = "";
                $scope.data= {email : "mahdi3abdelmajeed@gmail.com", password : "123456", remember_me : true}
                $scope.logout = function(event)  {
                    event.preventDefault()
                    $http({
                        method : "POST",
                        url : API_URL + "logout",
                        headers : {
                            'Authorization' : token_type + " " + access_token,
                        },
                    }).then(function Success(response) {
                        alert("تم تسجيل خروجك بنجاح");
                        console.log(response);
                        $scope.data5 = response.data.data;
                    }, function Error(response) {
                        console.log(response);
                        $scope.errors = response.data.data;
                    });
                };
                $scope.login = function(event) {
                    event.preventDefault()
                    data = $scope.data;
                    method = "POST";
                    $http({
                        method : "POST",
                        url : API_URL + "login",
                        data : data,
                        headers : {
                            'Access-Control-Allow-Headers':'*',
                            'Access-Control-Allow-Origin':'*',
                            'Access-Control-Allow-Methods':'GET, POST, OPTIONS'
                        }
                    }).then(function Success(response) {
                        alert("تم تسجيل دخولك بنجاح");
                        $scope.data5 = response.data.data;
                        expires_at = $scope.data5.expires_at;
                        access_token = $scope.data5.access_token;
                        token_type = $scope.data5.token_type;
                        document.cookie = "username=John Doe; expires=Thu, 18 Dec 2019 12:00:00 UTC";
                        document.cookie = "Authorization=" token_type + " " + access_token "; " + expires_at ;
                        console.log(document.cookie);
                        console.log(response);
                    }, function Error(response) {
                        console.log(response);
                        $scope.errors = response.data;
                    });
                }
            })
        </script>
        <div ng-app="NVU" ng-controller="LoginController">
                <a class="dropdown-item" href="javascript:void(0)" ng-click="logout($event)">
                        <i class="fa fa-user"></i> تسجيل خروج
                    </a>
                    <a class="dropdown-item" href="javascript:void(0)" ng-click="login($event)">
                        <i class="fa fa-user"></i> تسجيل دخول
                    </a>
            {{errors}}
            {{data5}}
        </div>
    </div>
    <!-- Scripts -->
    <script src="<?php echo  asset('js/script.js') ?>"></script>
</body>
</html>
