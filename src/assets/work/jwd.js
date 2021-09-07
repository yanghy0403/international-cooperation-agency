let fs = require("fs");
// fs.readFile("./my.json", "utf-8", function(err, data){
//     var obj = JSON.parse(data);
//     console.log(obj);
// });
let components = []
// const filesNameArr = fs.readdirSync('./countries')
// const filesNameArr = fs.readdirSync('./dist/world.json')
// console.log(filesNameArr);

fs.readFile("./world.json", "utf-8", async function (err, data) {

  let content = JSON.parse(data)
  // console.log(content);   item.properties.id === 'FR'   || item.properties.id === 'GB'
  await content.features.forEach(item => {
    if (item.properties.id === 'GL' || item.properties.id === 'CA' || item.properties.id === 'UM' || item.properties.id === 'MX' || item.properties.id === 'GT' || item.properties.id === 'BZ' || item.properties.id === 'SV' || item.properties.id === 'HN' || item.properties.id === 'NI' || item.properties.id === 'CR' || item.properties.id === 'PA' || item.properties.id === 'EC' || item.properties.id === 'CO' || item.properties.id === 'VE' || item.properties.id === 'PE' || item.properties.id === 'BR' || item.properties.id === 'GY' || item.properties.id === 'SR' || item.properties.id === 'BO' || item.properties.id === 'PY' || item.properties.id === 'CL' || item.properties.id === 'AR' || item.properties.id === 'UY' || item.properties.id === 'CU' || item.properties.id === 'UY' || item.properties.id === 'BS' || item.properties.id === 'JM' || item.properties.id === 'HT' || item.properties.id === 'DM' || item.properties.id === 'PR' || item.properties.id === 'VI' || item.properties.id === 'KN' || item.properties.id === 'AG' || item.properties.id === 'LC' || item.properties.id === 'VC' || item.properties.id === 'BB' || item.properties.id === 'GD' || item.properties.id === 'TT' || item.properties.id === 'US' || item.properties.id === 'DO') {
      item.geometry.coordinates.forEach(item => {
        // console.log(item);
        item.forEach(item => {
          if (typeof item[0] === 'number') {
            item[0] = item[0] + 90 * 119
          } else {
            item.forEach(item => {
              item[0] = item[0] + 90 * 119
            });
          }
        });
      });
    }

  });

  await content.features.forEach(item => {

    item.geometry.coordinates.forEach(item => {
      let add = 90 * 100
      // console.log(item);
      item.forEach(item => {
        if (typeof item[0] === 'number') {
          item[0] = item[0] - add
          item[1] = item[1] - add
        } else {
          item.forEach(item => {
            item[0] = item[0] - add
            item[1] = item[1] - add
          });
        }
      });
    });


  });
  let str = `(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }echarts.registerMap('world',` + JSON.stringify(content) + `)}));`
  await fs.writeFile("../js/world.js", str, function (err, data) {
    if (err) {
      //console.error(" 转换失敗！");
      // console.error(err);
    } else {
      //console.log("转换成功！");
    }
  })


})
