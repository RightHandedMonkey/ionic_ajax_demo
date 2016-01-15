// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller('AjaxCtrl', function($scope, $http) {

        $scope.url = "http://espn.go.com";

        var clearMessages = function() {
            $scope.message = "";
            $scope.error_msg = "";
        }

        $scope.makeNetworkGetCall = function() {
            console.log("Network GET call");
            http_get($scope, $http, $scope.url);
        };

        $scope.makeNetworkPostCall = function() {
            console.log("Network POST call");
            console.log($scope.url);
            http_post($scope, $http, $scope.url, {
                "data1": "bitter",
                "data2": "sweet"
            });
        };

        var http_get = function($scope, $http, url) {
            clearMessages();
            $http.get(url)
                .success(function(data, status, headers, config) {
                    $scope.message = data;
                    console.log("Successful call to " + url);
                }).error(function(data, status, headers, config) {
                    showConnectionError();
                    logall(data, status, headers, config);
                });

        };

        var http_post = function($scope, $http, url, postdata) {
            clearMessages();
            $http({
                url: url,
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: postdata
            }).success(function(data, status, headers, config) {
                $scope.message = data;
                console.log("Successful call to " + url);
            }).error(function(data, status, headers, config) {
                showConnectionError();
                logall(data, status, headers, config);
            });
        };

        var logall = function(data, status, headers, config) {
            console.log("data: " + data);
            console.log("status: " + status);
            console.log("headers: " + headers);
            console.log("config: ");
            console.log(config);
            console.log("error: " + status);
        }

        var showConnectionError = function() {
            $scope.error_msg = "Could not connect to server - check for missing 'http' in URL.  Check console for Cross-Origin Request Blocked message.";

        }

    })
