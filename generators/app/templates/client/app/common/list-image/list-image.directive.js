(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.listImage', ['<%= scriptAppName %>.lodash'])
		.factory('AlphabetColor', AlphabetColor)
		.directive('listImage', listImage);

	AlphabetColor.$inject = ['_'];

	function AlphabetColor(_) {
		var colors = [
			'#f9a43e',
			'#59a2be',
			'#67bf74',
			'#f58559',
			'#e4c62e',
			'#f16364',
			'#2093cd',
			'#ad62a7'
		];
		var numberOfColors = colors.length;

		return getColor;

		function hashCode(str) {
			var hash = 0,
				length = str.length,
				i, chr;

			if (length === 0) {
				return hash;
			}

			for (i = 0; i < length; i++) {
				chr = str.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0; // Convert to 32bit integer
			}

			return hash;
		}

		function getColor(string) {
			var color = Math.abs(hashCode(string.charAt(0))) % numberOfColors;
			return colors[color];
		}
	}

	listImage.$inject = ['$mdTheming', 'AlphabetColor'];

	function listImage($mdTheming, AlphabetColor) {
		var templateString = [
			'<div ng-style="{background: bgColor}">',
			'<span>{{::firstLetter}}</span>',
			'</div>'].join('');

		return {
			restrict: 'E',

			template: templateString,

			link: function ($scope, element, attrs) {
				$mdTheming(element);
				$scope.firstLetter = attrs.string.charAt(0);
				$scope.bgColor = AlphabetColor($scope.firstLetter);
			}
		};
	}

})();
