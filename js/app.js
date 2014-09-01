angular.module( 'engageApp', [
  'angular-loading-bar',
  'ui.bootstrap',
  'ngAnimate',
  'angular-growl',
  'angularFileUpload'
])

.run(function($rootScope) {
    $rootScope.fbRoot = {};
    $rootScope.fbData = {
      'title':'',
      'desc':''
    };
    $rootScope.otherData = {
      'twitterDesc':"",
      'emailSubject':"",
      'emailDesc':"",
      'smsDesc':""
    };
    $rootScope.adContent = {
      'display' :  {'saved':'No','banner':''},
      'facebook' : {'saved':'No','banner':'','title':'','description':''},
      'twitter' :  {'saved':'No','description':''},
      'email' :    {'saved':'No','subject':'','description':''},
      'sms' :      {'saved':'No','description':''}
    };
})

.config(['growlProvider', function(growlProvider) {
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive(3000);
}])

.controller('engageAppCtrl',
  [
    "$scope",
    "$rootScope",
    "growl",
    "FileUploader", 

  function($scope, $rootScope, growl,FileUploader) {

    $scope.ruleConditionData = [
      {"name":"Not Equal To"},
      {"name":"Equal To"},
      {"name":"Less Than"},
      {"name":"Less Than Or Equal To"},
      {"name":"Greater Than"},
      {"name":"Greater Than Or Equal To"}
    ];

    $scope.statementTelcoData = [
      {"name":"Customer Number"},
      {"name":"Customer Gender"},
      {"name":"Customer City"},
      {"name":"Customer Type"},
      {"name":"Manufacturer"},
      {"name":"Model Number"},
      {"name":"Plan Name"},
      {"name":"Plan MinRental"},
      {"name":"Plan PulseRate(Sec)"},
      {"name":"Roaming Enbaled"},
      {"name":"Call Duration"},
      {"name":"Number of Calls"},
      {"name":"Total Minutes"},
      {"name":"Total Roaming Minutes"},
      {"name":"Total Long Distance Minutes"},
      {"name":"Total Call Cost"},
      {"name":"Total Roaming Cost"},
      {"name":"Total Long Distance Cost"},
      {"name":"Feature type"},
      {"name":"Data Pack"},
      {"name":"Data Usage"},
      {"name":"Data Tariff"},
      {"name":"Free Data Usage"},
      {"name":"Prepaid Packs"},
      {"name":"Date Activated"},
      {"name":"Date LastUsed"}
    ];

    $scope.statementBankingData = [
      {"name":"Customer Id"},
      {"name":"Customer PhNo"},
      {"name":"Customer City"},
      {"name":"Customer Email"},
      {"name":"Customer AccType"},
      {"name":"Customer Age"},
      {"name":"Customer Limit"},
      {"name":"Customer Type"},
      {"name":"Customer Gender"},
      {"name":"Customer Balance"},
      {"name":"Customer LastUsage"},
      {"name":"Customer Loyal"},
      {"name":"Customer OnlineLogin"},
      {"name":"Customer Points"}
    ];

    $scope.skip = function(whom,index){
      $scope.adTabs[index + 1].active = true;
    }

    

    $scope.saved = function(whom,index){
      if(whom === 'display'){
        $rootScope.adContent[whom]['saved'] = 'Yes';
        $rootScope.adContent[whom]['banner'] = uploader.queue;
      }
      else if(whom === 'twitter'){
        this.twitterDesc;
        $rootScope.adContent[whom]['saved'] = 'Yes';
        $rootScope.adContent[whom]['description'] = this.twitterDesc;

        $rootScope.otherData['twitterDesc'] = this.twitterDesc;
      }
      else if(whom === 'email'){
        $rootScope.adContent[whom]['saved'] = 'Yes';
        $rootScope.adContent[whom]['subject'] = this.emailSubject;
        $rootScope.adContent[whom]['description'] = this.emailDesc;

        $rootScope.otherData['emailSubject'] = this.emailSubject;
        $rootScope.otherData['emailDesc'] = this.emailDesc;
      }
      else if(whom === 'sms'){
        $rootScope.adContent[whom]['saved'] = 'Yes';
        $rootScope.adContent[whom]['description'] = this.smsDesc;

        $rootScope.otherData['smsDesc'] = this.smsDesc;
      }
      $scope.adTabs[index + 1].active = true;
    }


    $scope.tabs = [
      {
        'name': "Summary Dashboard",
        route: "./views/tab1.html",
        active: true,
        icon:"images/icon_1.png",
        disabled: false
      },
      {
        'name': "Segmentations",
        route: "./views/tab2.html",
        active: false,
        icon:"images/icon_2.png",
        disabled: false
      },
      {
        'name': "Saved Segments",
        route: "./views/tab3.html",
        active: false,
        icon:"images/icon_3.png",
        disabled: false
      },
      {
        'name': "Engage Segments",
        route: "./views/tab4.html",
        active: false,
        icon:"images/icon_4.png",
        disabled: false
      },
      {
        'name': "Insights",
        route: "./views/tab5.html",
        active: false,
        icon:"images/icon_5.png",
        disabled: false
      }
    ];

  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Prepaid Balance < 5 Rupees',
      open: true,
      content: 'Reach all users whose balance is less than 5 Rupees and push ads about recharge'
    },
    {
      title: '2GUser_DateLast Used < Aug 1',
      open: false,
      content: 'Since customer is not using 2G for sometime now, give some data pack offer'
    },
    {
      title: 'PostPaid_ISD Plan ',
      open: false,
      content: 'User is heavy ISD user,  give 3G plans and cheaper ISD plans'
    },
    {
      title: 'Total Roaming Cost > 5000 Rupees',
      open: false,
      content: 'Provide cheaper options for some frequently travelling countries '
    },
    {
      title: 'Device User and Not Mobile User ',
      open: false,
      content: 'User has bought your device but mobile number of other player. Reach him to switch to your brand with better package of device and mobile'
    }
  ];

  $scope.displayTable = [
    {
      icon:'images/icon_6.png',
      key: 'Impressions',
      value: '5999391'
    },
    {
      key: 'Clicks',
      value: '17309'
    },
    {
      key: 'CTR',
      value: '0.29'
    },
    {
      key: 'Ad Spent',
      value: '139472'
    }    
  ];

  $scope.emailTable = [
    {
      icon:'images/icon_7.png',
      key: 'Sent',
      value: '3500'
    },
    {
      key: 'Opened',
      value: '2500'
    },
    {
      key: 'Saved',
      value: '1000'
    },
    {
      key: 'Clicked',
      value: '3800'
    }    
  ];

  $scope.smsTable = [
    {
      icon:'images/icon_8.png',
      key: 'Sent',
      value: '170873'
    },
    {
      key: 'Delivered',
      value: '140560'
    },
    {
      key: 'Career',
      value: '1105'
    },
    {
      key: 'Bounced',
      value: '2113'
    }    
  ];

  $scope.telcoTables=[
    {
      values: $scope.displayTable,
      className: "tableDisplay",
      id: "areachart",
      headingClass: "headingDisplay",
      heading:"Display",
      active: true
    },
    {
      values: $scope.emailTable,
      className: "tableEmail",
      id: "piechart",
      headingClass: "headingEmail",
      heading:"Email",
      active: false
    },
    {
      values: $scope.smsTable,
      className: "tableSms",
      id: "stackchart",
      headingClass: "headingSms",
      heading:"SMS",
      active: false
    }
  ];

  $scope.showTable = function(index){
    var activeValue = $scope.telcoTables[index].active;
    if(activeValue === false){
      if(index === 0){
        $scope.telcoTables[0].active = true;
        $scope.telcoTables[1].active = false;
        $scope.telcoTables[2].active = false;
      }
      else if(index === 1){
        $scope.telcoTables[1].active = true;
        $scope.telcoTables[0].active = false;
        $scope.telcoTables[2].active = false;
      }
      else if(index === 2){
        $scope.telcoTables[2].active = true;
        $scope.telcoTables[0].active = false;
        $scope.telcoTables[1].active = false;
      }
    }
  }

  $scope.engagedSegment = "Segment Name";

  $scope.engageSegment = function(segment){
    $scope.engagedSegment = segment;
    $scope.tabs[3].active = true;
  }

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

    $scope.adTabs = [
      {
        'name': "Display",
        route: "./views/adtab1.html",
        active: true,
        disabled: false
      },
      {
        'name': "Facebook",
        route: "./views/adtab2.html",
        active: false,
        disabled: false
      },
      {
        'name': "Twitter",
        route: "./views/adtab3.html",
        active: false,
        disabled: false
      },
      {
        'name': "Email",
        route: "./views/adtab4.html",
        active: false,
        disabled: false
      },
      {
        'name': "SMS",
        route: "./views/adtab5.html",
        active: false,
        disabled: false
      },
      {
        'name': "Summary",
        route: "./views/adtab6.html",
        active: false,
        disabled: false
      }
    ];

    $scope.rules = [
    ];

    var id = 0;

    $scope.options = [{ name: "AND", id: 1 }, { name: "OR", id: 2 }];
    $scope.selectedOption = $scope.options[0];
  

    $scope.addRule = function(value){
      id++;
      var rule = { 'id': id, 'operator': 'and'};
      $scope.rules.splice(value+1,0,rule);
    };

    $scope.tickRule = function(value){
      $scope.decreaseMetrics();
    };

    $scope.removeRule = function(value){
      $scope.rules[value]['removed'] = true;
      $scope.rules.splice(value,1);
      $scope.increaseMetrics();
    };

    $scope.changeCondition = function(option,index){
    }

    $scope.defaultMetrics = [5588935,4709350,3753420,2010167,1075890,5388453];

    $scope.metrics = [
      {
        'name':"Total Users",
        'value':"5588935",
        'type':'success'
      },
      {
        'name':"Desktop & Mobile",
        'value':"4709350",
        'type':'primary'
      },
      {
        'name':"Mobile",
        'value':"3753420",
        'type':'primary'
      },
      {
        'name':"Desktop",
        'value':"2010167",
        'type':'primary'
      },
      {
        'name':"Facebook",
        'value':"1075890",
        'type':'primary'
      },
      {
        'name':"Total Reach",
        'value':"5388453",
        'type':'warning'
      }
    ];



    $scope.doOperation = function(condition){
      if(condition === 'AND'){
        for(var i=0; i<$scope.metrics.length; i++){
          $scope.metrics[i]['value'] = decreaseValue($scope.metrics[i]['value'],25);
          $scope.metrics[i]['formattedValue'] = numberWithCommas($scope.metrics[i]['value']);
        }
      }
      else if(condition === 'OR'){
        for(var i=0; i<$scope.metrics.length; i++){
          $scope.metrics[i]['value'] = decreaseValue($scope.metrics[i]['value'],10);
          $scope.metrics[i]['formattedValue'] = numberWithCommas($scope.metrics[i]['value']);
        }  
      }
    }

    $scope.decreaseMetrics = function(){
      for(var i=1; i<$scope.metrics.length; i++){
        $scope.metrics[i]['value'] = decreaseValue($scope.metrics[i]['value'],5);
        $scope.metrics[i]['formattedValue'] = numberWithCommas($scope.metrics[i]['value']);
      } 
    }

    $scope.increaseMetrics = function(){
      for(var i=1; i<$scope.metrics.length; i++){
        $scope.metrics[i]['value'] = increaseValue($scope.metrics[i]['value'],5);
        $scope.metrics[i]['formattedValue'] = numberWithCommas($scope.metrics[i]['value']);
      } 
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function decreaseValue(value,by){
      return Math.ceil(value - (value * (by/100)));
    }

    function increaseValue(value,by){
      return Math.ceil(value + (value * (by/100)));
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }


    for(var i=0; i<$scope.metrics.length; i++){
      $scope.metrics[i]['per'] = Math.ceil(($scope.metrics[i]['value'] / $scope.metrics[0]['value']) * 100);
    }

    for(var i=0; i<$scope.metrics.length; i++){
      $scope.metrics[i]['formattedValue'] = numberWithCommas($scope.metrics[i]['value']);
    }

    $scope.savedSegments = [
      {
        name: "Segment 1",
        reach: "5388453"
      },
      {
        name: "Segment 2",
        reach: "2178021"
      },
      {
        name: "Segment 3",
        reach: "3300913"
      },
      {
        name: "Segment 4",
        reach: "1338100"
      }
    ];

    for(var i=0; i<$scope.savedSegments.length; i++){
      $scope.savedSegments[i]['formattedValue'] = numberWithCommas($scope.savedSegments[i]['reach']);
    }

    for(var i=0; i<$scope.savedSegments.length; i++){
      $scope.savedSegments[i]['maxValue'] = $scope.metrics[0].value;
    }

    $scope.segmentValue = {
      segmentName : '',
      segmentDesc : ''
    };

    $scope.save = function(){
      if(!$scope.segmentValue.segmentName || $scope.segmentValue.segmentName === ''
        ||!$scope.segmentValue.segmentDesc || $scope.segmentValue.segmentDesc === ''){
        growl.addErrorMessage("Please add a name and description to save your Segment");
      }
      else{
        var segmentToSave = {
          name: $scope.segmentValue.segmentName,
          maxValue : $scope.metrics[0].value,
          formattedValue : numberWithCommas($scope.metrics[$scope.metrics.length - 1].value),
          reach: $scope.metrics[$scope.metrics.length - 1].value
        };
        $scope.savedSegments.unshift(segmentToSave);
        growl.addSuccessMessage("Your segment "+$scope.segmentValue.segmentName.toUpperCase()+" has been saved.");
      } 
    };

    $scope.summaryActivate = function(){
      growl.addSuccessMessage("Your segment has been activated.");
      flushRootscopeData();
    };

    $scope.summaryEdit = function(){
      $scope.adTabs[0].active = true;
    };

    $scope.summaryCancel = function(){
      growl.addWarnMessage("Segment activation process has been cancelled.");
      flushRootscopeData();
      $scope.adTabs[0].active = true;
    };

    function flushRootscopeData(){
      $rootScope.fbRoot = {};
      $rootScope.fbData = {
        'title':'',
        'desc':''
      };
      $rootScope.otherData = {
        'twitterDesc':"",
        'emailSubject':"",
        'emailDesc':"",
        'smsDesc':""
      };
      $rootScope.adContent = {
        'display' :  {'saved':'No','banner':''},
        'facebook' : {'saved':'No','banner':'','title':'','description':''},
        'twitter' :  {'saved':'No','description':''},
        'email' :    {'saved':'No','subject':'','description':''},
        'sms' :      {'saved':'No','description':''}
      };
    }

    $scope.cancel = function(){
      $scope.rules.splice(0,$scope.rules.length);
      for(var i=0; i<$scope.metrics.length; i++){
        $scope.metrics[i]['value'] = $scope.defaultMetrics[i];
        $scope.metrics[i]['formattedValue'] = numberWithCommas($scope.metrics[i]['value']);
      }  
      growl.addWarnMessage("Default values have been restored");
    };

    $scope.display ={};
    var uploader = $scope.display.uploader = new FileUploader({
            url: 'upload.php'
        });


        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

}])


.controller('facebookCtrl', function($scope,$rootScope, growl,FileUploader) {
  $scope.fb = {};
  $scope.fbTitle = '';
  $scope.fbDesc = '';


   $scope.skip = function(whom,index){
      $scope.adTabs[index + 1].active = true;
    }

   

    $scope.saved = function(whom,index){
      if(whom === 'facebook'){
        $rootScope.adContent[whom]['saved'] = 'Yes';
        $rootScope.adContent[whom]['banner'] = $scope.fb.uploader.queue;
        $rootScope.adContent[whom]['title'] = $scope.fbTitle;
        $rootScope.adContent[whom]['description'] = $scope.fbDesc;

        $rootScope.fbData['title'] = $scope.fbTitle;
        $rootScope.fbData['desc'] = $scope.fbDesc;
      }
      $scope.adTabs[index + 1].active = true;
    }

  var uploader = $scope.fb.uploader = $rootScope.fbRoot.uploader = new FileUploader({
            url: 'upload.php'
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
})


.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    if(params.height && params.height === 235){
                      if(this.width < 350 && this.height < 235){
                        width = this.width;
                        height = this.height;
                      }
                      if(width > 350){
                        width = 350;
                        height = (this.height * 350) / this.width;
                      }
                    }
                    else if(params.height && params.height === 135){
                      if(this.width < 158 && this.height < 135){
                        width = this.width;
                        height = this.height;
                      }
                      if(width > 158){
                        width = 158;
                        height = (this.height * 158) / this.width;
                      }
                    }
                   
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
}])





;
