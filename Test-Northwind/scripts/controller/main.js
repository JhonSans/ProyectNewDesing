mainApp.controller("mainController", function ($scope) {

    // $scope.headerExpand = true;
    // $scope.statusEye = true;
    // $scope.imgMove = true;
    // $scope.imgNext = null;
    // $scope.imgNext2 = null;
    // $scope.imgNext3 = null;

    // $scope.config = {
    //     startSlide: 0,
    //     speed: 0,
    //     auto: 2000,
    //     draggable: true,
    //     continuous: true,
    //     autoRestart: true,
    //     disableScroll: false,
    //     stopPropagation: false,
    //     callback: function(index, elem) {},
    //     transitionEnd: function(index, elem) {}
    // }

    // $scope.seleccionar = function (item) {
    //     $scope.imgNext = !$scope.imgNext ? angular.copy(item) : null;
    // }
    // $scope.seleccionar2 = function (item) {
    //     $scope.imgNext2 = !$scope.imgNext2 ? angular.copy(item) : null;
    // }
    // $scope.seleccionar3 = function (item) {
    //     $scope.imgNext3 = !$scope.imgNext3 ? angular.copy(item) : null;
    // }

    $scope.toggleMenu = "Default";
    $scope.toggle = false;

    $scope.news = [
        { Picture: "content/back-1.jpg", Name: "First" },
        { Picture: "content/back-2.jpg", Name: "Second" },
        { Picture: "content/back-3.jpg", Name: "Third" },
        { Picture: "content/back-4.jpg", Name: "Fourth" }
    ];

    $scope.toggleMenuAction = function () {

        if ($scope.toggleMenu == "Default") {
            $scope.toggleMenu = "In"
            $scope.toggle = !$scope.toggle
        }
        else if ($scope.toggleMenu == "In") {
            $scope.toggleMenu = "Down"
            $scope.toggle = !$scope.toggle
        }
        else {
            $scope.toggleMenu = "Default"
            $scope.toggleMenuAction();
        }
    }
});