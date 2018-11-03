if(Auth.check()) {
  drct('student', 'index');
}
else {
  drct('student', 'login', 'user');
  app.directive("auth", function() {
    return {
      template:'<div class="position-absolute" style="left: 20px">'+
        '<md-button ng-controller="DemoLoginCtrl as Ctrl" ng-click="Ctrl.openDialog($event)" class="md-raised" aria-label="Ctrl.name" ng-if="!checkToken()" ng-bind="Ctrl.name"></md-button>'+
        '<md-button ng-controller="DemoRegisterCtrl as Ctrl" ng-click="Ctrl.openDialog($event)" class="md-raised" aria-label="Ctrl.name" ng-if="!checkToken()" ng-bind="Ctrl.name"></md-button>'+
        '<md-button ng-controller="LogoutController as Ctrl" ng-click="logout($event)" class="md-raised" ng-if="checkToken()" aria-label="Ctrl.name" ng-bind="Ctrl.name"></md-button>'+
      '</div>',
      replace: true,
    };
  });
}
/*

<md-button ng-controller="loginController" class="md-icon-button test-tooltip" ng-click="openDialog($event)" aria-label="name" ng-if="!checkToken">
  <md-tooltip md-direction="button">تسجيل دخول</md-tooltip>
  <md-icon
    md-svg-src="img/icons/login.svg">
  </md-icon>
</md-button>
<md-button ng-controller="logoutController as Ctrl" ng-click="logout($event)" class="md-icon-button test-tooltip text-white"  ng-if="checkToken" aria-label="Ctrl.name">
  <md-tooltip md-direction="button">تسجيل خروج</md-tooltip>
  <md-icon
    md-svg-src="img/icons/exit.svg">
  </md-icon>
</md-button>
<md-button ng-controller="DemoRegisterCtrl as Ctrl" ng-click="Ctrl.openDialog($event)" class="md-icon-button"  aria-label="Ctrl.name" ng-if="!checkToken">
    <md-tooltip md-direction="button">تسجل</md-tooltip>
    <img ng-src="img/register.png" style="width:24px;height: 24;">
  </md-button>
*/