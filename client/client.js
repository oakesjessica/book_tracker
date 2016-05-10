var app = angular.module("bookApp", ["ngRoute", "smart-table"]);

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

app.controller("LibraryController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "My Library";
  vm.displayLibrary = [];
  vm.libraryList = BookService.data;

  BookService.getLibrary();

  console.log("lib", vm.libraryList);

  vm.showInfo = function(book) {
    console.log(book.book_id, book.user_id);
  };
}]); //  LibraryController

app.controller("ShelvesController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Book Shelves";
  vm.displayShelves = [];
  vm.shelvesList = BookService.data;

  BookService.getByShelves();
}]); //  ShelvesController

app.controller("LocationController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Book Locations";
  vm.locationsList = BookService.data;

  BookService.getByLocations();
}]); //  LocationController

app.controller("BorrowController", ["BookService", function(BookService) {
  var vm = this;
  vm.displayBorrowed = [];
  vm.page_title = "Books I'm Borrowing";
  vm.borrowingList = BookService.borrowLentData;

  BookService.getBorrowedList();

  vm.emailBookOwner = function(book) {
    console.log(book);
    console.log("owner ID", book.book_id, book.owner_id);
  };


}]); //  BorrowedController

app.controller("LentController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Books I've Lent Out";
  vm.lendingList = BookService.borrowLentData;

  BookService.getLentList();

  vm.reminder = function(book) {
    console.log(book);
    console.log(book.book_id, book.borrower_id);
  };

}]); //  LentController

app.controller("FavoriteController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Favorites List";
  vm.displayFavorites = [];
  vm.favoritesList = BookService.data;

  BookService.getFavoritesList();

  vm.removeFavStar = function(book) {
    BookService.removeFav(book.book_id);
  };  //  vm.removeFav
}]); //  FavoriteController

app.controller("WishController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Wish List";
  vm.displayWishlist = [];
  vm.wishList = BookService.data;

  BookService.getWishlist();

  vm.removeWishHeart = function(book) {
    console.log(book.book_id);
    BookService.removeWish(book.book_id);
  };
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
        $location.path("/borrowed");
      } else {
        //  error message
        data.login = false;
        $location.path("/login");
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

app.factory("BookService", ["$http", function($http) {
  var data = [];
  var borrowLentData = [];

  function filterAndSort(arr, comparing) {
    var newObj = {};

    for (var i = 0; i < arr.length; i++) {
      var curr = arr[i][comparing];
      if (newObj[curr]) {
        newObj[curr].push(arr[i]);
      } else {
        newObj[arr[i][comparing]] = [arr[i]];
      }
    }
    return newObj;
  }

  var getLibrary = function() {
    $http.get("/library").then(function(serverResponse) {
      angular.copy(serverResponse.data, data);
    });
  };  //  getLibrary

  var getWishlist = function() {
    $http.get("/wishlist").then(function(serverResponse) {
      angular.copy(serverResponse.data, data);
    });
  };  //  getWishlist

  var getFavoritesList = function() {
    $http.get("/favorites").then(function(serverResponse) {
      angular.copy(serverResponse.data, data);
    });
  };  //  getFavoritesList

  var getBorrowedList = function() {
    $http.get("/borrowed").then(function(serverResponse) {
      borrowLentData.curr = serverResponse.data.filter(function(media) {
        return media.status === true;
      });

      borrowLentData.past = serverResponse.data.filter(function(media) {
        return media.status === false;
      });
    });
  };  //  getBorrowedList

  var getLentList = function() {
    $http.get("/lent").then(function(serverResponse) {
      borrowLentData.curr = serverResponse.data.filter(function(media) {
        return media.status === true;
      });

      borrowLentData.past = serverResponse.data.filter(function(media) {
        return media.status === false;
      });
    });
  }; //  getLentList

  var getByShelves = function() {
    $http.get("/shelves").then(function(serverResponse) {
      data.allShelves = filterAndSort(serverResponse.data, "shelf_name");
      console.log(data.allShelves);
    });
  };

  var getByLocations = function() {
    $http.get("/locations").then(function(serverResponse) {
      data.allLocations = filterAndSort(serverResponse.data, "locations");
    });
  };

  var removeFav = function(bookID) {
    $http.delete("/favorites/" + bookID).then(function(serverResponse) {
      getFavoritesList();
    });
  };

  var removeWish = function(bookID) {
    $http.delete("/wishlist/" + bookID).then(function(serverResponse) {
      getWishlist();
    });
  };


  return {
    key : {title : "value"},
    getLibrary : getLibrary,
    getWishlist : getWishlist,
    getBorrowedList : getBorrowedList,
    getLentList : getLentList,
    getFavoritesList : getFavoritesList,
    getByShelves : getByShelves,
    getByLocations : getByLocations,
    removeFav : removeFav,
    removeWish : removeWish,
    data : data,
    borrowLentData : borrowLentData
  };
}]);
