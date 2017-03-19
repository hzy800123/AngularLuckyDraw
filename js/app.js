angular.module('lottery', []).
	controller('ctrl_lottery', ['$scope', '$timeout',
		function($scope, $timeout){
			//Initial prize Data
			$scope.items = [
				{ id:1, name:'Euro Travel', status:0 },
				{ id:2, name:'Mac PC', status:0 },				
				{ id:3, name:'iPhone 6', status:0 },
				{ id:4, name:'Bicycle', status:0 },
				{ id:5, name:'LCD TV', status:0 },
				{ id:6, name:'500 RMB Card', status:0 },								
			];

			$scope.result='';
			$scope.$$=function(id){
				return document.getElementById(id);
			}
			$scope.showhide=function(pre, nex){
				pre = 'step' + pre;
				nex = 'step' + nex;
				$scope.$$(pre).style.display = 'none';
				$scope.$$(nex).style.display = 'block';
			}

			$scope.edit = function(){
				var currentStep = 'step1';
				if($scope.$$(currentStep).style.display != 'none'){
					// Switch from Step 1 to Step 4
					$scope.showhide(1, 4);
				}else{
					// Switch from Step 3 to Step 4
					$scope.showhide(3, 4);
				}
			}
			//The method binding when start the lucky draw
			$scope.start=function(){
				$scope.stopFlag = false;
				$scope.showhide(1, 2);
				// var circle = 5;
				// var selkey = Math.floor(Math.random() * $scope.items.length);
				var next = function(key){
					
					$scope.items[key].status = true;

					if((key - 1) >= 0)
						$scope.items[key - 1].status = false;
					if(key == 0)
						$scope.items[$scope.items.length - 1].status = false;

					var timer = $timeout(function(){
						// Show the prize when circle is zero and selkey is equal to key
						// if( circle <= 0 && selkey == key ) {
						// When the Stop button is pressed, stop the looping and display the prize
						if( $scope.stopFlag == true ) {
							$scope.showhide(2, 3);
							$scope.result = $scope.items[key].name;
							// $scope.items[key].status = false;
							return;
						};
						// circle minus 1 after looping one round
						if( $scope.items.length == key + 1 ) {
							// circle--;
							next(0);
						} else {
							next(key + 1);
						}
						// if( $scope.items[key + 1] ){
						// 	next(key + 1);
						// }else{
						// 	next(0);
						// }
					}, 200);
				}
				next(0);
			}

			// The method to stop the looping in Lucky Draw
			$scope.stop = function(){
				$scope.stopFlag = true;
			}

			//The method binding when display the prize
			$scope.reset = function(){
				$scope.showhide(3, 1);
				// Reset the previous selected prize status as false
				angular.forEach($scope.items, function(value, key){
					if( $scope.items[key].status == true ) {
						$scope.items[key].status = false;
					}
				})							
			}


			// The method binding when edit the prize
			$scope.add = function(){
				var last_id = lastid();
				$scope.items.push({ id:last_id, name:$scope.name, status:0 });
				$scope.name = '';		// Clear the input field after adding one prize
			}
			$scope.del = function(id){
				angular.forEach($scope.items, function(value, key){
					if( id == value.id ) {
						$scope.items.splice(key, 1);
					}
				})
			}
			$scope.return = function(){
				$scope.showhide(4, 3);
			}

			// Internal Method. It retrieve the ID of final data item
			function lastid(){
				var id = 0;
				angular.forEach( $scope.items, function(value, key){
					if(id < value.id)
						id = value.id;
				})
				return ++id;
			}
		}]);