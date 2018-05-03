'use strict';

/**
 * @ngdoc function
 * @name imageTaggingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imageTaggingApp
 */
 angular.module('ngImgMapDemo', ['ngImgMap']);

         app.controller('DemoCtrl', function($scope) {

             // ================= 必须配置 =================

             // 最基础的数据格式如下, description为自定义属性
             $scope.img = {
                 "pic_url": "images/demo-400x300.png",
                 "maps": [
                     {"coords":[45, 52, 160, 216], "description": "I am batman", "link_url": "https://www.baidu.com/s?ie=utf-8&fr=bks0000&wd=BATMAN"},
                     {"coords":[242, 19, 343,169], "description": "I am superman", "link_url": "https://www.baidu.com/s?ie=utf-8&fr=bks0000&wd=SUPERMAN"}
                 ]
             };



             // ================= 必须配置 =================

             // 配置方法集
             $scope.mapFns = {
                 // 获取画布尺寸
                 getCanSize: function() {
                     return [950, 1000];
                 },
                 // 获取图像尺寸
                 getImgSize: function(img) {
                     return _getImgSize(img.pic_url) || [950, 500];
                 }
             };

             // 获取图片宽高
             function _getImgSize(url) {
                 var reg = new RegExp('(\\d+)x(\\d+)\.');
                 result = reg.exec(url);
                 if (result && result.length > 1) {
                     return result.slice(1);
                 } else {
                     return false;
                 }
             }

             // 添加锚点
             $scope.addArea = function(img) {
                 if (!img || !img.maps || !angular.isArray(img.maps)) {
                     img = angular.isObject(img) ? img : {};
                     img.maps = [];
                 };
                 var calculation = img.getCalculation(),
                     lastImg = img.maps.slice(-1)[0],
                     lastImgLeft = lastImg ? lastImg.coords[0] : 0,
                     lastImgTop = lastImg ? lastImg.coords[1] : 0,
                     newImgCoords = [lastImgLeft + 30, lastImgTop + 30, lastImgLeft + 100, lastImgTop + 100];

                 if (calculation) {
                     img.maps.push({coords: calculation.checkCoords(newImgCoords) });
                 } else {
                     img.maps.push({coords: newImgCoords });
                 }
             };

             // =================== 优化功能 ===================

             // 编辑link时，激活对应选区
             $scope.catchArea = function(area){area.isDraging = true;};

             // 离开编辑link时，反激活对应选区
             $scope.releaseArea = function(area){
                 if (area.hasOwnProperty('isDraging')) {
                     delete area.isDraging
                 };
             };

             // ================== imgJson ===================
             $scope.$watch('img', function(nVal, oVal){
                 $scope.imgJson = angular.toJson(nVal, true);
             }, true);

         });

     })
