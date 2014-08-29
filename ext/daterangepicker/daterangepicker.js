angular.module( 'ext.dateRangePicker', [
  'ui.bootstrap.position',
  'ext.dateutil'
])

.controller('DateRangePickerCtrl', ['$scope', function($scope) {

  this.isIncluded = function(date) {

  };

}])

.directive('dateRangePicker', ['dateFilter', function(dateFilter) {

  var dateFormat = 'EEE, dd MMM yy';

  function linkFn(scope, ele, attr, ctrls) {
    var isOpen = false
      , rangePickerCtrl = ctrls[0]
      , ngModelCtrl = ctrls[1]
      , today = new Date()
      , oneDay = 24 * 60 * 60 * 1000;
    var yesterday = new Date(today.getTime() - oneDay);

    yesterday.setHours(0,0,0,0); // will set the time to 00:00:00.000

    scope.rangeDisplayView = "Select Date Range";

    scope.opts = {
      from: {
        minDate: new Date(yesterday.getTime() - (89 * oneDay)), //90 days
        maxDate: yesterday
      },
      to: {
        minDate: new Date(yesterday.getTime() - (89 * oneDay)), //90 days,
        maxDate: yesterday
      }
    };

    function updateRangeDisplay(r) {
      scope.rangeDisplayView = [
        dateFilter(r.from, dateFormat),
        dateFilter(r.to, dateFormat)
      ].join(' to ');
    }

    scope.localRange = {};

    angular.extend(scope.localRange, scope.range);

    updateRangeDisplay(scope.range);

    scope.$watch(
      function () {
        return (
          scope.range.from.toISOString() +
          scope.range.to.toISOString()
        );

      },
      function (val, oldVal) {
        if(val === oldVal) { return; }
        scope.localRange.from = scope.range.from;
        scope.localRange.to = scope.range.to;
        updateRangeDisplay(scope.localRange);
      }
    );

    scope.customRange = {
      yesterday: function() {
        scope.localRange.from = yesterday;
        scope.localRange.to = yesterday;
        scope.fromDtChanged(scope.localRange.from);
      },
      thisWeek: function() {
        scope.localRange.from = new Date(yesterday.getTime() - (yesterday.getDay() * oneDay));
        scope.localRange.to = yesterday;
        scope.fromDtChanged(scope.localRange.from);
      },
      last7Days: function() {
        scope.localRange.from = new Date(yesterday.getTime() - (6 * oneDay));
        scope.localRange.to = yesterday;
        scope.fromDtChanged(scope.localRange.from);
      },
      thisMonth: function() {
        scope.localRange.from = new Date(yesterday.getTime() - ((yesterday.getDate() - 1) * oneDay));
        scope.localRange.to = yesterday;
        scope.fromDtChanged(scope.localRange.from);
      },
      last30Days: function() {
        scope.localRange.from = new Date(yesterday.getTime() - (29 * oneDay));
        scope.localRange.to = yesterday;
        scope.fromDtChanged(scope.localRange.from);
      },
      last3Months: function() {
        scope.localRange.from = new Date(yesterday.getTime() - (3 * 30 * oneDay - oneDay));
        scope.localRange.to = yesterday;
        scope.fromDtChanged(scope.localRange.from);
      }
    };

    scope.fromDtChanged = function(fromDt) {
      if(fromDt.valueOf() > scope.localRange.to.valueOf()) {
        scope.localRange.to = scope.localRange.from;
      }
      scope.opts.to.minDate = fromDt;
    };

    scope.toggleOpen = function() {
      isOpen = !isOpen;
    };

    scope.applyRange = function () {
      updateRangeDisplay(scope.localRange);
      scope.range.from = scope.localRange.from;
      scope.range.to = scope.localRange.to;
      if(scope.onApply) {
        scope.onApply({range: scope.range});
      }
      isOpen = !isOpen;
    };

    scope.isOpen = function() {
      return isOpen;
    };

  }

  return {
    restrict: 'EAC',
    replace: true,
    scope: {
      range: '=ngModel',
      onApply: '&'
    },
    require: ['dateRangePicker', 'ngModel'],
    templateUrl: 'ext/daterangepicker/daterangepicker.html',
    controller: 'DateRangePickerCtrl',
    link: linkFn
  };
}])

.controller('MinimalDatepickerCtrl', ['$scope', '$attrs', 'dateFilter', 'dates', function($scope, $attrs, dateFilter, dates) {
  var format = {
    day:        'dd',
    month:      'MMMM',
    year:       'yyyy',
    dayHeader:  'EEE',
    dayTitle:   'MMMM yyyy',
    monthTitle: 'yyyy'
  },
  startingDay = 0,
  yearRange =   20;

  this.minDate = null;
  this.maxDate = null;

  function getDaysInMonth( year, month ) {
    return new Date(year, month, 0).getDate();
  }

  function getDates(startDate, n) {
    var dates = new Array(n);
    var current = startDate, i = 0;
    while (i < n) {
      dates[i++] = new Date(current);
      current.setDate( current.getDate() + 1 );
    }
    return dates;
  }

  function makeDate(date, format, isSelected, isSecondary) {
    return { date: date, label: dateFilter(date, format), selected: !!isSelected, secondary: !!isSecondary };
  }

  this.dayMode = {
    name: 'day',
    getVisibleDates: function(date, selected) {
      var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
      var difference = startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth), numDates = 0;

      if ( numDisplayedFromPreviousMonth > 0 ) {
        firstDate.setDate( - numDisplayedFromPreviousMonth + 1 );
        numDates += numDisplayedFromPreviousMonth; // Previous
      }
      numDates += getDaysInMonth(year, month + 1); // Current
      numDates += (7 - numDates % 7) % 7; // Next

      var days = getDates(firstDate, numDates), labels = new Array(7);
      for (var i = 0; i < numDates; i ++) {
        var dt = new Date(days[i]);
        days[i] = makeDate(dt, format.day, (selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear()), dt.getMonth() !== month);
      }
      for (var j = 0; j < 7; j++) {
        labels[j] = dateFilter(days[j].date, format.dayHeader);
      }
      return { objects: days, title: dateFilter(date, format.dayTitle), labels: labels };
    },
    compare: function(date1, date2) {
      return (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) - new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) );
    },
    split: 7,
    step: { months: 1 }
  };

  this.isDisabled = function(date) {
    var currentMode = this.dayMode;
    return ((this.minDate && currentMode.compare(date, this.minDate) < 0) || (this.maxDate && currentMode.compare(date, this.maxDate) > 0) || ($scope.dateDisabled && $scope.dateDisabled({date: date, mode: currentMode.name})));
  };

  this.isIncluded = function(date) {
    return dates.inRange(date, $scope.$parent.localRange.from, $scope.$parent.localRange.to);
  };
}])

.directive( 'minimalDatepicker', ['$rootScope', 'dateFilter', '$parse', '$log', function ($rootScope, dateFilter, $parse, $log) {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'ext/daterangepicker/minimaldatepicker.html',
    scope: {
      dateDisabled: '&',
      onSelected: '&'
    },
    require: ['minimalDatepicker', '?^ngModel'],
    controller: 'MinimalDatepickerCtrl',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModel = ctrls[1];

      if (!ngModel) {
        return; // do nothing if no ng-model
      }

      // Configuration parameters
      var mode = 0, selected = new Date(), showWeeks = false;

      if (attrs.min) {
        scope.$parent.$watch($parse(attrs.min), function(value) {
          datepickerCtrl.minDate = value ? new Date(value) : null;
          refill();
        });
      }
      if (attrs.max) {
        scope.$parent.$watch($parse(attrs.max), function(value) {
          datepickerCtrl.maxDate = value ? new Date(value) : null;
          refill();
        });
      }

      // Split array into smaller arrays
      function split(arr, size) {
        var arrays = [];
        while (arr.length > 0) {
          arrays.push(arr.splice(0, size));
        }
        return arrays;
      }

      function refill( updateSelected ) {
        var date = null, valid = true;

        if ( ngModel.$modelValue ) {
          date = new Date( ngModel.$modelValue );

          if ( isNaN(date) ) {
            valid = false;
            $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
          } else if ( updateSelected ) {
            selected = date;
          }
        }
        ngModel.$setValidity('date', valid);

        var currentMode = datepickerCtrl.dayMode, data = currentMode.getVisibleDates(selected, date);
        angular.forEach(data.objects, function(obj) {
          obj.disabled = datepickerCtrl.isDisabled(obj.date);
          obj.included = datepickerCtrl.isIncluded(obj.date);
        });

        ngModel.$setValidity('date-disabled', (!date || !datepickerCtrl.isDisabled(date)));

        scope.rows = split(data.objects, currentMode.split);
        scope.labels = data.labels || [];
        scope.title = data.title;
      }

      ngModel.$render = function() {
        refill( true );
      };

      scope.$on('rangePickerRefill', refill);

      scope.select = function( date ) {
        var dt = new Date( ngModel.$modelValue );
        dt.setFullYear( date.getFullYear(), date.getMonth(), date.getDate() );
        ngModel.$setViewValue( dt );
        if(scope.onSelected) {
          scope.onSelected({date: dt});
        }
        refill( true );
        $rootScope.$broadcast('rangePickerRefill');
      };
      scope.move = function(direction) {
        var step = datepickerCtrl.dayMode.step;
        selected.setMonth( selected.getMonth() + direction * (step.months || 0) );
        selected.setFullYear( selected.getFullYear() + direction * (step.years || 0) );
        refill();
      };
    }
  };
}])


;

