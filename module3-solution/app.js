(function()
{
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDown)
  .service('MenuSearch',MenuSearch)
  .directive('foundItems',foundItems);

  NarrowItDown.$inject = ['MenuSearch'];
  function NarrowItDown(MenuSearch)
  {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.search = function()
    {
      MenuSearch.getMatchedMenuItems(ctrl.searchTerm);
      ctrl.found = MenuSearch.getfoundItems();
    };

    ctrl.remove = function(index)
    {
      MenuSearch.removeFoundItem(index);
      if(ctrl.found.length === 0)
        ctrl.message = "List is Empty";
    }
  }

  foundItems.$inject = ['MenuSearch']
  function foundItems(MenuSearch)
  {
    var ddo = {
                templateUrl : 'foundList.html',
              };
    return ddo;
  }


  MenuSearch.$inject = ['$http'];
  function MenuSearch($http)
  {
    var service = this;
    service.foundItems = [];
    service.getMatchedMenuItems = function(searchTerm)
    {
      service.foundItems = [];
      if(searchTerm.length > 0){
      $http({
              method : "GET",
              url :  "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function sucess(response){
                                              response.data.menu_items.forEach(function(item){
                                                      if(item.description.includes(searchTerm))
                                                          service.foundItems.push(item);
                                            });
                    },function error(response){console.log("error in fetching Data");});
    };}
    service.getfoundItems = function()
    {
      return service.foundItems;
    };
    service.removeFoundItem = function(index)
    {
      service.foundItems.splice(index,1);
    };
    service.foundEmpty = function()
    {
      if(service.foundItems.length === 0)
        return true;
      else {
        return false;
      }
    }
  }
})();
