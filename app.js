'use strict';

(function () {
    var app = angular.module('app', []);

    app.filter('invoiceNameOrIdFilter', function () {
        return function (value) {
            return value.filter((invoice) => invoice.patientName.toLowerCase().indexOf('lana') !== -1);

        };
    });

    app.directive('invoiceNote', function () {
        return {
            restrict: 'E',
            templateUrl: 'invoice-note.html',
            scope: {
                invoice: '='
            }
        };
    });

    app.controller('InvoiceController', ['$scope', 'InvoiceService', function ($scope, InvoiceService) {
        $scope.yourName = "Gonzalo";
        $scope.errorMessage = '';
        $scope.searchBySelected = "Name";
        $scope.invoiceStatusSelected = "Outstanding";
        $scope.searchText = "";


        InvoiceService.getInvoices()
            .then(function (response) {
                $scope.invoices = response.data;
            })
            .catch(function (error) {
                $scope.errorMessage = "Someting wrong !!";
                console.log(error);
            });


    }]);

    app.factory('InvoiceService', ['$http', function InvoiceServiceFactory($http) {
        return {
            getInvoices: function () {
                return $http({
                    method: 'GET',
                    url: '/api/invoices/invoices.json'
                });
            }
        };
    }]);

})();
