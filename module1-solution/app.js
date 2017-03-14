(function()
{
  'use strict';
  angular.module('LunchChecker',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope)
  {
    $scope.lunchMenu = "";
    $scope.message = "";
    $scope.checkLunch = function()
    {
      if($scope.lunchMenu.length == 0)
      {
        $scope.message = "Please enter data first";
        $scope.valid = false;
        return;
      }
      var okay = itemCounter($scope.lunchMenu);
      if(okay)
        $scope.message = "Enjoy!";
      else
        $scope.message = "Too Much!";
      $scope.valid = true;
    };
  }

  function itemCounter(string)
  {
    var count = 0;
    var itemArray = string.split(',');
    count = itemArray.length;
    for(var i = 0; i < itemArray.length; i++)
    {
      if(itemArray[i] === "")
        count--;
    }
    if(count > 3)
      return false;
    else
      return true;
  }
}
)();
