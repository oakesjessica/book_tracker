var app = angular.module("bookApp", ["ngRoute"]);

/////////////////////////////////////////////////
                /*Config*/
/////////////////////////////////////////////////
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/search", {
      templateUrl: "views/search.html",
      controller: "SearchController",
      controllerAs: "add"
    })  //  Search page
    .when("/", {
      templateUrl: "views/library.html",
      controller: "LibraryController",
      controllerAs: "lib"
    })  //  Library Page
    .when("/shelves", {
      templateUrl: "views/shelves.html",
      controller: "ShelvesController",
      controllerAs: "shelf"
    })  //  Shelves page
    .when("/locations", {
      templateUrl: "views/locations.html",
      controller: "LocationController",
      controllerAs: "loc"
    })  //  Shelves page
    .when("/borrowed", {
      templateUrl: "views/borrowed.html",
      controller: "BorrowController",
      controllerAs: "brw"
    })  //  Borrowed page
    .when("/lent", {
      templateUrl: "views/lent.html",
      controller: "LentController",
      controllerAs: "lent"
    })  //  Lent page
    .when("/favorites", {
      templateUrl: "views/favorites.html",
      controller: "FavoriteController",
      controllerAs: "fav"
    })  //  Favorites page
    .when("/wishlist", {
      templateUrl: "views/wishlist.html",
      controller: "WishController",
      controllerAs: "wish"
    }) //  Wishlist page
    .when("/faq", {
      templateUrl: "views/faq.html",
      controller: "FaqController",
      controllerAs: "faq"
    });

  $locationProvider.html5Mode(true);

}]);

/////////////////////////////////////////////////
                /*Controllers*/
/////////////////////////////////////////////////
app.controller("SearchController", function() {
  var vm = this;
  vm.searchTypes = ["Title", "Author", "ISBN"];
  vm.message = "Search List";

  vm.search = {};
  vm.Search = function() {
    console.log(vm.search);
    vm.search = {};
  };
}); //  SearchController

app.controller("LibraryController", function() {
  var vm = this;

  vm.message = "Library List";
}); //  LibraryController

app.controller("ShelvesController", function() {
  var vm = this;
  vm.message = "Shelf List";
}); //  ShelvesController

app.controller("LocationController", function() {
  var vm = this;
  vm.message = "Locations List";
}); //  LocationController

app.controller("BorrowController", function() {
  var vm = this;
  vm.message = "Borrowed List";
}); //  BorrowedController

app.controller("LentController", ["FetchLentBooks", function(FetchLentBooks) {
  var vm = this;

  vm.message = "Lent List";
}]); //  LentController

app.controller("FavoriteController", function() {
  var vm = this;
  vm.message = "Favorites List";
}); //  FavoriteController

app.controller("WishController", function() {
  var vm = this;
  vm.message = "Wish List";
}); //  WishController

app.controller("FaqController", function() {
  var vm = this;
  vm.message = "FAQ List";
}); //  FAQController
