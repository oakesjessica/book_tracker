var app = angular.module("bookApp", ["ngRoute"]);

/////////////////////////////////////////////////
                /*Config*/
/////////////////////////////////////////////////
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "LoginController",
      controllerAs: "log"
    })
    .when("/register", {
      templateUrl: "views/register.html",
      controller: "RegisterController",
      controllerAs: "reg"
    })
    .when("/search", {
      templateUrl: "views/search.html",
      controller: "SearchController",
      controllerAs: "add"
    })  //  Search page
    .when("/library", {
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
app.controller("MainController", ["UserService", function(UserService) {
  var vm = this;

  vm.loginStatusData = UserService.data;
  console.log(vm.loginStatus);

}]);

app.controller("LoginController", ["UserService", function(UserService) {
  var vm = this;

  vm.logInfo = {};
  vm.login = function() {
    console.log(vm.logInfo);
    UserService.loginUser(vm.logInfo);
  };
}]); //  LoginController

app.controller("RegisterController", ["UserService", function(UserService) {
  var vm = this;

  vm.newUser = {};
  vm.regUser = function() {
    console.log(vm.newUser);
    UserService.registerNewUser(vm.newUser);
    vm.newUser = {};
  };
}]); //  RegisterController

app.controller("SearchController", function() {
  var vm = this;
  vm.page_title = "Search List";
}); //  SearchController

app.controller("LibraryController", function() {
  var vm = this;
  vm.page_title = "Library List";
}); //  LibraryController

app.controller("ShelvesController", function() {
  var vm = this;
  vm.page_title = "Shelf List";
}); //  ShelvesController

app.controller("LocationController", function() {
  var vm = this;
  vm.page_title = "Locations List";
}); //  LocationController

app.controller("BorrowController", function() {
  var vm = this;
  vm.page_title = "Books I've Borrowed";
}); //  BorrowedController

app.controller("LentController", function() {
  var vm = this;
  vm.page_title = "Books I've Lent Out";
}); //  LentController

app.controller("FavoriteController", function() {
  var vm = this;
  vm.page_title = "Favorites List";
}); //  FavoriteController

app.controller("WishController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Wish List";

  vm.wishlist = BookService.data;

  BookService.getWishlist();

  console.log(vm.wishlist);
}]); //  WishController

app.controller("FaqController", function() {
  var vm = this;
  vm.page_title = "FAQ List";
}); //  FAQController

/////////////////////////////////////////////////
                /*Factories*/
/////////////////////////////////////////////////
app.factory("UserService", ["$http", "$location", function($http, $location) {
  var userData = [];
  var data = {};

  registerNewUser = function(userInfo) {
    console.log("newuser", userInfo);
    $http.post("/register", userInfo).then(function(serverResponse) {
      console.log(serverResponse);
    });
  };  //  registerNewUser

  loginUser = function(userInfo) {
    console.log("logging in", userInfo);
    $http.post("/", userInfo).then(function(serverResponse) {
      console.log(serverResponse);
      if (serverResponse.status === 200) {
        data.login = true;
        $location.path("/search");
      } else {
        //  error message
        data.login = false;
      }
    });
  };  //  loginUser

  return {
    key : {title : "value"},
    userData : userData,
    registerNewUser : registerNewUser,
    loginUser : loginUser,
    data : data
  };

}]);  //  app.factory - UserService

app.factory("LoginService", ["$http", function($http) {

}]);  //  app.factory - LoginService

app.factory("BookService", ["$http", function($http) {

  var data = [];

  var getWishlist = function() {
    $http.get("/wishlist").then(function(serverResponse) {
      console.log(serverResponse);
      angular.copy(serverResponse, data);
      console.log(data);
    });
  };

  return {
    key : {title : "value"},
    getWishlist : getWishlist
  };
}]);
