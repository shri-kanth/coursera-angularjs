(function()
{
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuy)
  .controller('AlreadyBoughtController',Bought)
  .service('CheckOffService',ShoppingListCheckOffService);

  ToBuy.$inject = ['CheckOffService'];
  function ToBuy(CheckOffService)
  {
    var toBuy = this;
    toBuy.items = CheckOffService.getToBuyItems();
    toBuy.buy = function(item)
    {
      CheckOffService.buy(item);
    }
    toBuy.complete = function(){return CheckOffService.getComplete();};
  }

  Bought.$inject = ['CheckOffService'];
  function Bought(CheckOffService)
  {
    var bought = this;
    bought.items = CheckOffService.getBoughtItems();
    bought.start = function() { return CheckOffService.getStart();};
  }

  function ShoppingListCheckOffService()
  {
    var service = this;
    service.complete = false;
    service.start = false;
    service.toBuyItems = [{name:'cookies',quantity : 10}, {name:'sugar',quantity : 5},
                       {name:'coffee',quantity : 1}, {name:'choclate',quantity : 12},
                       {name:'milk',quantity : 3}, {name:'Ice cream',quantity : 42}];
    service.BoughtItems = [];
    service.buy = function(itemBought)
    {
      for(var i = 0; i < service.toBuyItems.length; i++)
      {
        if(service.toBuyItems[i] === itemBought)
          {
            service.BoughtItems.push(itemBought);
            service.toBuyItems.splice(i,1);
          }
      }

      if(service.toBuyItems.length === 0)
        service.complete = true;
      else
        service.complete = false;

      if(service.BoughtItems.length === 0)
        service.start = false;
      else
        service.start = true;
    };

    service.getToBuyItems = function()
    {
      return service.toBuyItems;
    };

    service.getBoughtItems = function()
    {
      return service.BoughtItems;
    };

    service.getComplete = function()
    {
      return service.complete;
    };

    service.getStart = function()
    {
      return service.start;
    };
  }


})();
