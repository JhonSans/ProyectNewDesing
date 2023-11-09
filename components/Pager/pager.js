angular
    .module("MainApp")
    .component("pager", {
        controller: "PagerController",
        controllerAs: "pager",
        templateUrl: "components/Pager/index.html",
        bindings: {
            totalItems: "=",
            displayItems: "=",
            pagingSize: "=",
            itemsPerPage: "=",
        },
    })
    .controller("PagerController", function () {

        var vm = this;

        vm.params = {};
        vm.pagingSize = vm.pagingSize;
        vm.itemsPerPage = vm.itemsPerPage;
        vm.currentPage = 1;
        vm.displayItems = [];

        vm.$onInit = function () {
            vm.setPage(vm.currentPage);
        };

        vm.setPage = function (currentPage) {

            if (currentPage < 1 || currentPage > vm.params.totalPages) return;

            vm.setPager(vm.totalItems.length, currentPage, vm.itemsPerPage);

            vm.displayItems = vm.totalItems.slice(vm.params.startIndex, vm.params.endIndex + 1);

            // console.log(vm.displayItems);
        };

        vm.setPager = function (itemCount, currentPage, itemsPerPage) {

            var startPage, endPage;
            var totalPages = Math.ceil(itemCount / itemsPerPage);

            if (totalPages <= vm.pagingSize) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if (currentPage + 1 >= totalPages) {
                    startPage = totalPages - (vm.pagingSize - 1);
                    endPage = totalPages;
                } else {
                    startPage = currentPage - parseInt(vm.pagingSize / 2);
                    startPage = startPage <= 0 ? 1 : startPage;
                    endPage =
                        startPage + vm.pagingSize - 1 <= totalPages
                            ? startPage + vm.pagingSize - 1
                            : totalPages;
                    if (totalPages === endPage) {
                        startPage = endPage - vm.pagingSize + 1;
                    }
                }
            }

            var startIndex = (currentPage - 1) * itemsPerPage;
            var endIndex = startIndex + itemsPerPage - 1;

            var index = startPage;
            var pages = [];

            for (index; index < endPage + 1; index++)
                pages.push(index);

            vm.params.currentPage = currentPage;
            vm.params.totalPages = totalPages;
            vm.params.startPage = startPage;
            vm.params.endPage = endPage;
            vm.params.startIndex = startIndex;
            vm.params.endIndex = endIndex;
            vm.params.pages = pages;
        };
    });

    // https://embed.plnkr.co/plunk/uoH6A4
    // https://codepen.io/arefeh_htmi/pen/ExKewzW