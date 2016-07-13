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
    })  //  Locations page
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

app.controller("SearchController", ["GoogleAPIService", "BookService", function(GoogleAPIService, BookService) {
  var vm = this;
  vm.page_title = "Search List";
  vm.params = {};
  vm.searchInput = "";
  vm.searchParameters = ["title", "author", "series"];
  vm.searchResults = GoogleAPIService.APIdata;

  vm.submitSearch = function() {
    var paramsInput = vm.searchInput.replace(/ /g, "+");
    console.log(paramsInput);
    GoogleAPIService.getAPIResults(paramsInput);
    vm.searchInput = "";
  };

  vm.addSearchToLibrary = function(book) {
    var convertedArray = [];
    vm.resultInfo = {};
    vm.resultInfo.table = "users_books";
    vm.resultInfo.title = book.title;
    vm.resultInfo.authors = book.authors.join(", ");

    if (!book.publishedDate) {
      vm.resultInfo.published_date = null;
    } else {
      vm.resultInfo.published_date = book.publishedDate;
    }
    if (!book.publisher) {
      vm.resultInfo.publisher = null;
    } else {
      vm.resultInfo.publisher = book.publisher;
    }
    if (!book.categories) {
      vm.resultInfo.categories = null;
    } else {
      vm.resultInfo.categories = book.categories;
    }
    if (!book.pageCount) {
      vm.resultInfo.page_count = null;
    } else {
      vm.resultInfo.page_count = book.pageCount;
    }
    if (!book.language) {
      vm.resultInfo.languages = null;
    } else {
      vm.resultInfo.languages = book.language;
    }
    if (!book.description) {
      vm.resultInfo.plot = null;
    } else {
      vm.resultInfo.plot = book.description;
    }
    if (!book.imageLinks) {
      vm.resultInfo.img_src = null;
    } else {
      vm.resultInfo.img_src = book.imageLinks.smallThumbnail;
    }
    if (!book.industryIdentifiers) {
      vm.resultInfo.isbn13 = null;
      vm.resultInfo.isbn10 = null;
    } else {
      for (var k = 0; k < book.industryIdentifiers.length; k++) {
        if (book.industryIdentifiers[k].type === "ISBN_10") {
          vm.resultInfo.isbn10 = book.industryIdentifiers[k].identifier;
        } else if (book.industryIdentifiers[k].type === "ISBN_13") {
          vm.resultInfo.isbn13 = book.industryIdentifiers[k].identifier;
        } else {
          vm.resultInfo.isbn13 = null;
          vm.resultInfo.isbn10 = null;
        }
      }
    } //  else

    BookService.addToUserLibrary(vm.resultInfo);
  };  //  addSearchToLibrary

  vm.addSearchToWishlist = function(book) {
    var convertedArray = [];
    vm.resultInfo = {};
    vm.resultInfo.table = "wishlist";
    vm.resultInfo.title = book.title;
    vm.resultInfo.authors = book.authors.join(", ");

    if (!book.publishedDate) {
      vm.resultInfo.published_date = null;
    } else {
      vm.resultInfo.published_date = book.publishedDate;
    }
    if (!book.publisher) {
      vm.resultInfo.publisher = null;
    } else {
      vm.resultInfo.publisher = book.publisher;
    }
    if (!book.categories) {
      vm.resultInfo.categories = null;
    } else {
      vm.resultInfo.categories = book.categories;
    }
    if (!book.pageCount) {
      vm.resultInfo.page_count = null;
    } else {
      vm.resultInfo.page_count = book.pageCount;
    }
    if (!book.language) {
      vm.resultInfo.languages = null;
    } else {
      vm.resultInfo.languages = book.language;
    }
    if (!book.description) {
      vm.resultInfo.plot = null;
    } else {
      vm.resultInfo.plot = book.description;
    }
    if (!book.imageLinks) {
      vm.resultInfo.img_src = null;
    } else {
      vm.resultInfo.img_src = book.imageLinks.smallThumbnail;
    }
    if (!book.industryIdentifiers) {
      vm.resultInfo.isbn13 = null;
      vm.resultInfo.isbn10 = null;
    } else {
      for (var k = 0; k < book.industryIdentifiers.length; k++) {
        if (book.industryIdentifiers[k].type === "ISBN_10") {
          vm.resultInfo.isbn10 = book.industryIdentifiers[k].identifier;
        } else if (book.industryIdentifiers[k].type === "ISBN_13") {
          vm.resultInfo.isbn13 = book.industryIdentifiers[k].identifier;
        } else {
          vm.resultInfo.isbn13 = null;
          vm.resultInfo.isbn10 = null;
        }
      }
    } //  else

    BookService.addToUserLibrary(vm.resultInfo);
  };  //  addSearchToLibrary
}]); //  SearchController

app.controller("LibraryController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "My Library";
  vm.displayLibrary = [];
  vm.libraryList = BookService.data;
  vm.bookInfo = {};

  BookService.getLibrary();

  vm.showHideDetails = function(book) {
    if (vm.expanded != book.book_id) {
      vm.expanded = book.book_id;
    } else {
      vm.expanded = null;
    }
  };

  vm.addOrRemoveFav = function(book, status) {
    vm.bookInfo = book;
    vm.bookInfo.change = status;
    BookService.changeStar(vm.bookInfo);
    console.log(book);
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
  vm.displayCurrentBorrowedBooks = [];
  vm.displayBorrowedHistory = [];
  vm.table_title = "Books I'm Borrowing";
  vm.history_title = "Borrowing History";
  vm.borrowingList = BookService.borrowLentData;

  BookService.getBorrowedList();

  vm.emailBookOwner = function(book) {
    console.log(book);
    console.log("owner ID", book.book_id, book.owner_id);
    // $event.stopPropagation();
  };

  vm.showHideDetails = function(book) {
    if (vm.expanded != book.book_id) {
      vm.expanded = book.book_id;
    } else {
      vm.expanded = null;
    }
  };

  vm.returnToOwner = function(book) {
    console.log(book);
    // $event.stopPropagation();
  };


}]); //  BorrowedController

app.controller("LentController", ["BookService", function(BookService) {
  var vm = this;
  vm.table_title = "Books I'm Lending Out";
  vm.history_title = "Books I've Lent Out";
  vm.displayCurrentLentBooks = [];
  vm.displayLentHistory = [];
  vm.lendingList = BookService.borrowLentData;

  BookService.getLentList();

  vm.reminder = function(book) {
    console.log(book);
    console.log(book.book_id, book.borrower_id);
  };

  vm.emailBookBorrower = function(book) {
    console.log(book);
    // $event.stopPropagation();
  };

  vm.showHideDetails = function(book) {
    if (vm.expanded != book.book_id) {
      vm.expanded = book.book_id;
    } else {
      vm.expanded = null;
    }
  };

  vm.returnedFromBorrower = function(book) {
    console.log(book);
    // $event.stopPropagation();
  };

}]); //  LentController

app.controller("FavoriteController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Favorites List";
  vm.displayFavorites = [];
  vm.favoritesList = BookService.data;

  BookService.getFavoritesList();

  vm.showHideDetails = function(book) {
    if (vm.expanded != book.book_id) {
      vm.expanded = book.book_id;
    } else {
      vm.expanded = null;
    }
  };

  vm.removeFavStar = function(book) {
    bootbox.confirm("Remove from favorites?", function(result) {
      if (result === true) {
        BookService.removeFav(book.book_id);
      }
    });
  };  //  vm.removeFav
}]); //  FavoriteController

app.controller("WishController", ["BookService", function(BookService) {
  var vm = this;
  vm.page_title = "Wish List";
  vm.displayWishlist = [];
  vm.wishList = BookService.data;

  BookService.getWishlist();

  vm.removeWishHeart = function(book) {
    bootbox.confirm("Remove from wishlist?", function(result) {
      if (result === true) {
        BookService.removeWish(book.book_id);
      }
    });
  };  //  removeWishHeart

  vm.addToLibrary = function(book) {
    bootbox.confirm({
      title: "Add book to My Library",
      message: "Add <i>" + book.title + "</i> to your library?",
      buttons: {
        cancel: {
          label: "No",
          className: "btn btn-sm btn-default"
        },
        confirm: {
          label: "Yes",
          className: "btn btn-sm btn-primary"
        }
      },
      callback: function(result) {
        if (result === true) {
          bootbox.dialog({
            title: "Add book to My Library",
            message:
              "<h3>You got the book!</h3>" + "<br/>" + "<br/>" +
              "<strong>Title:</strong> " + book.title + "<br/>" +
              "<strong>Author:</strong> " + book.author + "<br/>" +
              "<strong>Series:</strong> " + book.series + "<br/>" +
              "<strong>Published:</strong> " + moment(book.published).format("MMM DD, YYYY") + "<br/>" +
              "<strong>Plot:</strong> Plot goes here",
            buttons: {
              cancel: {
                label: "Actually, nevermind",
                className: "btn btn-md btn-default",
              },
              add: {
                label: "Yes! Add to Library!",
                className: "btn btn-md btn-success",
                callback: function() {
                  console.log("yes");
                  BookService.addToUserLibrary(book);
                }
              }
            } //  buttons
          });
        } //  if
      } //  callback
    }); //  bootbox
  };  //  vm.addToLibrary

  vm.showHideDetails = function(book) {
    if (vm.expanded != book.book_id) {
      vm.expanded = book.book_id;
    } else {
      vm.expanded = null;
    }
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
      $location.path("/login");
    });
  };  //  registerNewUser

  loginUser = function(userInfo) {
    console.log("logging in", userInfo);
    $http.post("/", userInfo).then(function(serverResponse) {
      console.log(serverResponse);
      if (serverResponse.status === 200) {
        data.login = true;
        $location.path("/library");
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
    $http.put("/favorites/" + bookID).then(function(serverResponse) {
      getFavoritesList();
    });
  };

  var changeStar = function(book) {
    console.log(book);
    $http.put("/library/fav/", book).then(function(serverResponse) {
      getLibrary();
    });
  };

  var removeWish = function(bookID) {
    $http.delete("/wishlist/" + bookID).then(function(serverResponse) {
      getWishlist();
    });
  };

  var addToUserLibrary = function(info) {
    console.log("adding", info);
    $http.post("/search", info).then(function(serverResponse) {
      console.log(serverResponse);
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
    changeStar : changeStar,
    removeWish : removeWish,
    addToUserLibrary : addToUserLibrary,
    data : data,
    borrowLentData : borrowLentData
  };
}]);

app.factory("GoogleAPIService", ["$http", function($http) {

  var APIdata = [];
  var getAPIResults = function(params) {
    var config = {
      q: params,
      printType: "books",
      startIndex: 0,
      maxResults: 15,
      callback: JSON,
      key: "AIzaSyDSxeiYZwfKcwxfPkUiVLpKHKJEEfvjwWA"  //   // register your own key at https://developers.google.com/
    };
    // console.log(config);

    $http.get("https://www.googleapis.com/books/v1/volumes?q=" + params + "&printType=books&startIndex="+config.startIndex+"&maxResults="+config.maxResults+"&key="+config.key).then(function(serverResponse){
      APIdata.val = serverResponse.data;
      console.log(APIdata.val);
    });
  };

  return {
    getAPIResults : getAPIResults,
    APIdata : APIdata
  };

}]);
