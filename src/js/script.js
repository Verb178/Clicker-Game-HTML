(function () {

    var app = angular.module("MainApp", ['timer', 'firebase']);

    var MainController = function ($scope, $timeout, $firebaseArray) {

        var refclick = new Firebase("https://click-e3a1e.firebaseio.com/info");

      $scope.click = $firebaseArray(refclick);

        var points = 0;
        var pointsUpgraded = 1;
        var switchButtonNumber = 0;
        $scope.notEnoughPointsOne = true;
        $scope.notEnoughPointsTwo = true;
        $scope.notEnoughPointsThree = true;
        $scope.notEnoughPointsFour = true;
        var pointer1 = "far fa-hand-point-up"
        var pointer2 = "far fa-hand-pointer"
        var pointer3 = "fas fa-mouse-pointer"

        // Setting upgrade items
        var onePrice = 25;
        $scope.onePrice = onePrice
        var twoPrice = 200;
        $scope.twoPrice = twoPrice
        var threePrice = 500;
        $scope.threePrice = threePrice
        var fourPrice = 1250;
        $scope.fourPrice = fourPrice

        $scope.info = {
            points: 0,
            pointsUpgraded: 0,
            name: ""
        };


        $scope.buttonClicked = function () {
            makeButtonsWork();
            checkAfford();
        }

        $scope.buttonClickedProperly = function () {
            makeButtonsWork();
            checkAfford();
        }

        function makeButtonsWork() {
            points += pointsUpgraded
            $scope.info.points = points
            $scope.info.pointsUpgraded = pointsUpgraded
            $scope.points = points
            $scope.pointsUpgraded = pointsUpgraded
            _timeOutComment(1500);
        }

        $scope.switchBetweenButtons = function () {
            if (switchButtonNumber === 0) {
                $scope.hoverOrClick = true;
                switchButtonNumber = 1;
            } else if (switchButtonNumber === 1) {
                $scope.hoverOrClick = false;
                switchButtonNumber = 0;
            }
        }

        $scope.upgradeOne = function () {
            if (points >= onePrice) {
                pointsUpgraded += 1
                points -= onePrice
                onePrice = onePrice + onePrice
                $scope.onePrice = onePrice
                checkAfford();
            } else if (points < 25) {

            }
        }

        $scope.upgradeTwo = function () {
            if (points >= twoPrice) {
                pointsUpgraded += 3
                points -= twoPrice
                twoPrice = twoPrice + twoPrice
                $scope.twoPrice = twoPrice
                checkAfford();
            } else if (points < 25) {

            }
        }

        $scope.upgradeThree = function () {
            if (points >= threePrice) {
                pointsUpgraded += 5
                points -= threePrice
                threePrice = threePrice + threePrice
                $scope.threePrice = threePrice
                checkAfford();
            } else if (points < 25) {

            }
        }

        $scope.upgradeFour = function () {
            if (points >= fourPrice) {
                pointsUpgraded += 10
                points -= fourPrice
                fourPrice = fourPrice + fourPrice
                $scope.fourPrice = fourPrice
                checkAfford();
            } else if (points < 25) {

            }
        }

        function checkAfford() {
            if (points >= onePrice) {
                $scope.notEnoughPointsOne = false;
            } if (points >= twoPrice) {
                $scope.notEnoughPointsTwo = false;
            } if (points >= threePrice) {
                $scope.notEnoughPointsThree = false;
            } if (points >= fourPrice) {
                $scope.notEnoughPointsFour = false;
            }

            if (points <= onePrice) {
                $scope.notEnoughPointsOne = true;
            } if (points <= twoPrice) {
                $scope.notEnoughPointsTwo = true;
            } if (points <= threePrice) {
                $scope.notEnoughPointsThree = true;
            } if (points <= fourPrice) {
                $scope.notEnoughPointsFour = true;
            }
        }

        $scope.clickLogo1 = function () {
            $scope.clickLogoFinal = pointer1
        }

        $scope.clickLogo2 = function () {
            $scope.clickLogoFinal = pointer2
        }

        $scope.clickLogo3 = function () {
            $scope.clickLogoFinal = pointer3
        }

     
        $scope.points = points
        
   
        var _timeOutComment = function(time) {
            var apppenComment = function() {
                $scope.message = "";
            }
            $timeout(apppenComment, time);
        };

        var _showHide = function(id, action) {
            var a = action == "show" ? "inline" : "none";
            document.querySelector("#" + id).style.display = a;
        };

        $scope.jeuJouer = function() {
            _showHide("jouer", "hide");
            _showHide("click", "show");
            _showHide("scored", "hide")
            _showHide("ranking", "hide")
            $scope.timerRunning = true;
            $scope.$broadcast('timer-start');

        };
        

        $scope.$on('timer-stopped', function(event, data) {
            
            _showHide("rejouer", "show");
            _showHide("click", "hide");
            _showHide("yourName", "show")
            _showHide("scored", "show")
            
        });

        $scope.saveUser = function(name) {
            $scope.info.name = name;
                $scope.click.$add({
                    info: $scope.info
                });

                _showHide("jouer", "hide")
                _showHide("yourName", "hide")
                _showHide("rejouer", "show")

        }

        $scope.scores = function() {
            _showHide("ranking", "show")
        }

        _showHide("ranking", "hide")

    }


    


    app.controller("MainController", MainController)

}())