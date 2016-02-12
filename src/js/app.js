var app = angular.module('app', ['angularFileUpload'])

angular.element(document).ready(function() {
	angular.bootstrap(document, ['app'])
})

app.controller('mainCtrl', function($scope, $http, $timeout, $interval, FileUploader) {
	$scope.options = [
		{ name: 'Still Life Assessment',     value: '01_Still Life Assessment' },
		{ name: 'Professional Development',  value: '02_Professional Development' },
		{ name: 'Research Assessment',       value: '03_Research Assessment' },
		{ name: 'Specialization Assessment', value: '04_Specialization Assessment' },
		{ name: 'Production 1 Assessment',   value: '05_Production 01 Assessment' },
		{ name: 'Production 2 Assessment',   value: '06_Production 02 Assessment' },
		{ name: 'Demoreel Assessment',       value: '07_Demoreel Assessment' }
	]
	
	$scope.selected = undefined
	
	window.scope = $scope
	
	$scope.now = new Date()

	$interval(function() {
		$scope.now = new Date()
	}, 500)
	
	$scope.save = function() {
		// strip hashkeys out
		$scope.uploads.forEach(function(item) {
			delete item.$$hashkey
		})
		
		// stringify and store
		localStorage.uploads = JSON.stringify($scope.uploads)
	}
	
	$scope.restore = function() {
		return localStorage.uploads ? JSON.parse(localStorage.uploads) : []
	}
	
	
	$scope.uploader = new FileUploader()
	$scope.uploads = $scope.restore()
	
	$scope.uploader.onAfterAddingFile = function(item) {
		console.log('file added')
		item.url = '/upload'
		
		if($scope.selected) {
			
			if(confirm('Are you sure you want to upload ')) {
				item.formData = {
					folder: $scope.selected
				}
				
				item.upload()
			
				item.onComplete = function(res) {
					$scope.uploads.push({
						date: new Date().valueOf(),
						name: res
					})
					
					$scope.save()
				}
			}
		} else {
			alert('You need to choose an assessment')
		}
	}
})