appName = "منصة الطلاب";

app.controller('DemoCtrl', DemoCtrl);

function DemoCtrl ($log, $http, $rootScope) {
  var self = this;

  self.isDisabled    = false;
  self.noCache = false;
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;

  self.newState = newState;

  function newState(state) {
    alert("Sorry! You'll need to create a Constitution for " + state + " first!");
  }

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  async function querySearch (query) {
    /**
   * Build `states` list of key/value pairs
   */
    let ajax = await http($http,"GET",`user/search?search=${query}`);
    self.states = ajax.data;
    if(query) var results = self.states.filter( createFilterFor(query) );
    else var results = self.states;
    console.log(results)
    return results;
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $rootScope.toast('الاسم: '+item.name+', المعرف: '+item.id);
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = query.toLowerCase();

    return function filterFn(state) {
      return (state.name.indexOf(lowercaseQuery) === 0);
    };
  }
}