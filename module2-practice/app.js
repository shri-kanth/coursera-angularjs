(function()
  {
    'use strict';

    angular.module('ShoppingList',[])
    .controller('ShopListAddController',ShoppingListAdd)
    .controller('ShopListShowController',ShoppingListShow)
    .service('ListAdmin',ListAdmin);

    ShoppingListAdd.$inject = ['ListAdmin'];
    function ShoppingListAdd (ListAdmin)
    {
      var itemAdder = this;
      itemAdder.itemName = "";
      itemAdder.itemQuantity = "";

      itemAdder.addItem = function()
      {
        ListAdmin.addItem(itemAdder.itemName,itemAdder.itemQuantity);
      }
    }
    ShoppingListShow.$inject = ['ListAdmin'];
    function ShoppingListShow(ListAdmin)
    {
      var showList = this;
      showList.items = ListAdmin.getItems();
    }

    function ListAdmin()
    {
      var service = this;
      var items = [];
      service.addItem = function(itemName,quantity)
                        {
                          var item = {
                                      name : itemName,
                                      quantity : quantity
                                    };
                          items.push(item);
                        };
      service.getItems = function()  {
                                        return items;
                                      };
    }
  }
)();
