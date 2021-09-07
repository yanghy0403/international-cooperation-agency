// 引入axios
import axios from "axios";
import html2canvas from 'html2canvas'
import router from '@/router'

export default {
  setUrl: 'http://10.0.90.42/static/',   //头像前缀url

  /*接口传输类型为formData形式时，设置传参
   *@param：  type:接口的类型，post或get等 ；   address 接口的请求地址 ；   params  接口的参数
   *@return  返回接口的默认传参
  */
  settingParameters(type,address,params){
    return {
      method: type,
      url: address,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [
        function () {
          let ret = ''
          for (let it in params) {
            ret +=
              encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
          }
          return ret
        }
      ]
    }
  },
  //收藏
  favoritesFun:function (userId,type,content) {
    let params = `content=${content}&userId=${userId}&type=${type}`
    axios.get(`/manage/create?${params}`).then((res) => {
        if (res.data.code == 200) {
          alert('收藏成功！')
        }else{
          alert(res.data.msg)
        }
      });
  },

  //所有机构
  getAllOrg:function (callback) {
    axios.get("/index/org/autoTip").then((res) => {
        if (res.data.code == 200) {
          callback(res.data.data.zh || [])
        }
      });
  },
  // 院内机构
  getInstitutionsInTheHospital:function (callback) {
    axios.get("/index/org/autoTip?source=true", {
    // axios.get("/index/org/autoTipDetail", {
        params: { query_name: '' },
      }).then((res) => {
        if (res.data.code == 200) {
          callback(res.data.data.zh || [])
        }
      });
  },
  // 院外机构
  getInstitutionsInTheHospitalOut:function (callback) {
    axios.get("/index/org/autoTip?source=false", {
        params: { query_name: '' },
      }).then((res) => {
        if (res.data.code == 200) {
          callback(res.data.data.zh || [])
        }
      });
  },

  // 国家
  handleCountry:function (callback) {
    axios.get("/index/country/autoTip", {
      params: {
        city: "",
        continent: "",
        countrySimpleZhName: "",
        language: "",
        source: "",
      },
    }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data.name;
          let countriesAll = data.map((item) => {
            return {
              value: item,
              label: item,
            };
          });
          callback(countriesAll || [])
        }
      });
  },

  // 城市
  handleCity:function (callback) {
    axios.get("/index/city/autoTip").then((res) => {
        if (res.data.code == 200) {
          var data = res.data.data;
          let cityAll = data.map((item) => {
            return {
              value: item,
              label: item,
            };
          });
          callback(cityAll || [])
        }
      });
  },

  // 学科
  handleSubject:function (callback) {
    axios.get("/index/subject/autoTip", {
      params: { query_EQ_subject_name: '' },
    }).then((res) => {
        if (res.data.code == 200) {
          var data = res.data.data.name;
          let subjectAll = data.map((item) => {
            return {
              value: item,
              label: item,
            };
          });
          callback(subjectAll || [])
        }
      });
  },
  // 项目类别
  handleProjectClass: function(callback) {
    axios.get("/cooperativeProject/internationalPartners/projectClass/searching").then(res=> {
      if(res.data.code == 200) {
        callback(res.data.data || [])
      }
    })
  },

  goHome(){
    router.push({ path: "/" });
  },
  lastPage(){
    router.go(-1);
  },
  //下载
  downloadImg(refs,imgName,multiple) {
    let self = this;
    if(multiple){

    }
    let _canvas = null
    let canvas2 = null
    canvas2 = document.createElement("canvas");
    _canvas = refs;
    let w = parseInt(window.getComputedStyle(_canvas).width);
    let h = parseInt(window.getComputedStyle(_canvas).height);
    //放大canvas画布，然后放在较小的容器内，像素会升高
    canvas2.width = multiple?w*multiple:w*2;
    canvas2.height = multiple?h*multiple:h*2;
    canvas2.style.width = w+"px";
    canvas2.style.height = h+"px";
    let context = canvas2.getContext("2d");
    context.scale(2,2);
    html2canvas(refs,{
      canvas:canvas2
    }).then(function (canvas) {
      let fileName = imgName + ".png"
      let imgUri = canvas.toDataURL("image/jpeg",2); // 获取生成的图片的url
      // console.log(imgUri)
      let $a = document.createElement("a");
      $a.setAttribute("href", imgUri);
      $a.setAttribute("download", fileName);
      $a.click();
      // canvas2.parentNode.removeChild(canvas2);
    });
  },

  //下载
  newdownloadImg(refs,imgName,multiple) {
    html2canvas(refs, {
      foreignObjectRendering: true, // 最主要是这句话，官方给出解释是否在浏览器支持的情况下使用ForeignObject渲染，
      async: false, // 同步执行
      x: 0, //裁剪画布x坐标 (导出的时候位置不太对，使用这个属性完美解决)
      y: 0,
      useCORS: true, // 设置 useCORS 为 true，即可开启图片跨域
      background: '#FFFFFF', // 默认为黑色，将 background 为其他颜色
    }).then(function (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let imgWidth = 555.28
      // 一页pdf显示html页面生成的canvas高度;
      let pageHeight = contentWidth / imgWidth * 841.89
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight
      // 页面偏移
      let position = 0
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高

      let imgHeight = imgWidth / contentWidth * contentHeight

      let imgUri = canvas.toDataURL('image/jpeg', 1.0)
      let fileName = imgName + ".png"
      let $a = document.createElement("a");
      $a.setAttribute("href", imgUri);
      $a.setAttribute("download", fileName);
      $a.click();
    })
  },

  getImgBase64:function(refs){
    return new Promise((resolve,reject)=>{
      let self = this;
      let _canvas = null
      let canvas2 = null
      canvas2 = document.createElement("canvas");
      _canvas = refs;
      let w = parseInt(window.getComputedStyle(_canvas).width);
      let h = parseInt(window.getComputedStyle(_canvas).height);
      //放大canvas画布，然后放在较小的容器内，像素会升高
      console.log(w)
      console.log(h)
      canvas2.width = w*2;
      canvas2.height = h*2;
      canvas2.style.width = w+"px";
      canvas2.style.height = h+"px";
      let context = canvas2.getContext("2d");
      context.scale(2,2);
      html2canvas(refs,{
        canvas:canvas2,
        allowTaint: true,
        useCORS: true
      }).then(function (canvas) {
        let imgUri = canvas.toDataURL("image/jpeg",2); // 获取生成的图片的url
        resolve(imgUri)
      });
    })
  },
  newgetImgBase64:function(refs){
    return new Promise((resolve,reject)=>{
      html2canvas(refs, {
        foreignObjectRendering: true, // 最主要是这句话，官方给出解释是否在浏览器支持的情况下使用ForeignObject渲染，
        async: false, // 同步执行
        x: 0, //裁剪画布x坐标 (导出的时候位置不太对，使用这个属性完美解决)
        y: 0,
        useCORS: true, // 设置 useCORS 为 true，即可开启图片跨域
        background: '#FFFFFF', // 默认为黑色，将 background 为其他颜色
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let imgWidth = 555.28
        // 一页pdf显示html页面生成的canvas高度;
        let pageHeight = contentWidth / imgWidth * 841.89
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // 页面偏移
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高

        let imgHeight = imgWidth / contentWidth * contentHeight

        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        resolve(pageData,1.0)
      })
      // html2canvas(refs,{
      //   width:710,
      //   height:390,
      //   useCORS:true,allowTaint:false
      // }).then(function (canvas) {
      //   let imgUri = canvas.toDataURL("image/jpeg",2); // 获取生成的图片的url
      //   resolve(imgUri,1.0)
      // });
    })
  },


  downloadImg2(refs,imgName) {
      let self = this;
      // event.preventDefault();
      let _canvas = null
      let canvas2 = null
      canvas2 = document.createElement("canvas");
      _canvas = refs;
      //console.log(window.getComputedStyle(_canvas).width)
      //console.log(window.getComputedStyle(_canvas).height)
      let w = parseInt(window.getComputedStyle(_canvas).width);
      let h = parseInt(window.getComputedStyle(_canvas).height);
      //放大canvas画布，然后放在较小的容器内，像素会升高
      canvas2.width = w*2;
      canvas2.height = h*2;
      canvas2.style.width = w+"px";
      canvas2.style.height = h+"px";
      let context = canvas2.getContext("2d");
      context.scale(2,2);
      html2canvas(refs,{
        canvas:canvas2
      }).then(function (canvas) {
        let fileName = imgName + ".png"
        let imgUri = canvas.toDataURL("image/jpeg",2); // 获取生成的图片的url
        // console.log(imgUri)
        let $a = document.createElement("a");
        $a.setAttribute("href", imgUri);
        $a.setAttribute("download", fileName);
        $a.click();
        // canvas2.parentNode.removeChild(canvas2);
      });
  },

  getRangeType(val){
    let range = 0
    let maxAll= Number(val)
    let max = Number(maxAll/5)
    let singalNum = Number(String(max).substring(0,1))
    let subNum = Number(String(max).substring(1,1))
    if(0 < max  && max <9){
      if(subNum <5){
        range = (singalNum)*1
      }else{
        range = (singalNum+1)*1
      }
    }else if(max == 10){
      range = 10
    }else if(11<max&& max <99){
      if(subNum <5){
        range = (singalNum)*10
      }else{
        range = (singalNum+1)*10
      }
    }else if(max == 100){
      range = 100
    }else if(101<max&& max < 999){
      if(subNum <5){
        range = (singalNum)*100
      }else{
        range = (singalNum+1)*100
      }
    }else if(max == 1000){
      range = 1000
    }else if(1001<max&& max < 9999){
      if(subNum <5){
        range = (singalNum)*1000
      }else{
        range = (singalNum+1)*1000
      }
    }else if(max == 10000){
      range = 10000
    }else if(10001<max&& max < 99999){
      if(subNum <5){
        range = (singalNum)*10000
      }else{
        range = (singalNum+1)*10000
      }
    }else if(max == 100000){
      range = 100000
    }else if(100001<max&& max < 999999){
      if(subNum <5){
        range = (singalNum)*100000
      }else{
        range = (singalNum+1)*100000
      }
    }else if(max == 1000000){
      range = 1000000
    }else if(1000001<max&& max<9999999){
      if(subNum <5){
        range = (singalNum)*1000000
      }else{
        range = (singalNum+1)*1000000
      }
    }else if(max == 10000000){
      range = 10000000
    }else if(10000001<max&& max<99999999){
      if(subNum <5){
        range = (singalNum)*10000000
      }else{
        range = (singalNum+1)*10000000
      }
    }else if(max == 100000000){
      range = 100000000
    }
    let rankRange = []
    for(let i = 0;i<7;i++){
      rankRange.push(range*(i))
    }
    return rankRange
  },

  correctLocation(val){
    // ["355.16644", "50.223146"]
    // ["298.76", "15.2"]
  // else if(item == '中国台湾'){
  //     val[item][1] = Number(val[item][1]) + 2
  //   }

    for(let item in val){
       if(item == '密克罗尼西亚联邦'){
        val[item][0] = Number(val[item][0]) + 360
      }else if(item == '萨摩亚'){
        val[item][0] = Number(val[item][0]) + 360
      }else if(item == '汤加'){
        val[item][0] = Number(val[item][0]) + 360
      }else if(item == '法属波利尼西亚'){
        val[item][0] = Number(val[item][0]) + 360
      }else if(item == '库克群岛'){
        val[item][0] = Number(val[item][0]) + 360
      }else if(item == '格鲁吉亚'){
        val[item][0] = Number(val[item][0]) + 126
        val[item][1] = Number(val[item][1]) + 9.4
      }else if(item == '蒙特塞拉特'){
        val[item][0] = '297.56'
        val[item][1] = '17.0'
      }
    }
    return val
  },



  exportTable:[
    {
      title: "年度",
      key: "year",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.year !== "") {
          return h("span", params.row.year);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "项目编号",
      key: "projectNumber",
      width: 250,
      align: "center",
      render: (h, params) => {
        if (params.row.projectNumber !== "") {
          return h("span", params.row.projectNumber);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "来访人姓名",
      key: "name",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.name !== "") {
          return h("span", params.row.name);
        } else {
          return h("span", "-");
        }
      },
    },         {
      title: "性别",
      key: "sex",
      width: 120,
      align: "center",
      render: (h, params) => {
        if (params.row.sex !== "") {
          return h("span", params.row.sex);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "出生日期",
      key: "dateOfBirth",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.dateOfBirth !== "") {
          return h("span", params.row.dateOfBirth);
        } else {
          return h("span", "-");
        }
      },
    },      {
      title: "到访机构",
      key: "instName",
      width: 250,
      align: "center",
      render: (h, params) => {
        if (params.row.instName !== "") {
          return h("span", params.row.instName);
        } else {
          return h("span", "-");
        }
      },
    },      {
      title: "邀请人姓名",
      key: "inviterName",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.inviterName !== "") {
          return h("span", params.row.inviterName);
        } else {
          return h("span", "-");
        }
      },
    },     {
      title: "团组名称",
      key: "teamName",
      width: 400,
      align: "center",
      render: (h, params) => {
        if (params.row.teamName !== "") {
          return h("span", params.row.teamName);
        } else {
          return h("span", "-");
        }
      },
    },    {
      title: "学科类别",
      key: "personSubject",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.personSubject !== "") {
          return h("span", params.row.personSubject);
        } else {
          return h("span", "-");
        }
      },
    },     {
      title: "交流形式",
      key: "formsOfCommunication",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.formsOfCommunication !== "") {
          return h("span", params.row.formsOfCommunication);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "来访团组所属国别",
      key: "teamState",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.teamState !== "") {
          return h("span", params.row.teamState);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "团长姓名",
      key: "tzName",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.tzName !== "") {
          return h("span", params.row.tzName);
        } else {
          return h("span", "-");
        }
      },
    }, {
      title: "团组人数",
      key: "teamNum",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.teamNum !== "") {
          return h("span", params.row.teamNum);
        } else {
          return h("span", "-");
        }
      },
    }, {
      title: "拟在中科院访问日期",
      key: "visitDate",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.visitDate !== "") {
          return h("span", params.row.visitDate);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "操作",
      key: "操作",
      width: 150,
      align: "center",
      fixed: "right",
      render: (h, params) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "text",
                size: "small",
              },
              style: {
                width: "90px",
                height: "22px",
                background: "#e2e6ed",
                borderRadius: "11px",
                color: "#727272",
                fontSize: "12px",
              },
              on: {
                click: () => {
                  if(params.row.uniqueId){
                    router.push({
                      path: "/PersonDetails",
                      query: { id: params.row.uniqueId },
                    });
                  }else{
                    alert('获取不到人员id，请检查数据是否完整！')
                  }
                },
              },
            },
            "访问主页"
          ),
        ]);
      },
    },
  ],
  importTable:[
    {
      title: "申请编号",
      key: "applicantNumber",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.applicantNumber !== "") {
          return h("span", params.row.applicantNumber);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "项目名称",
      key: "projectName",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.projectName !== "") {
          return h("span", params.row.projectName);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "项目英文名称",
      key: "projectNameEn",
      width: 400,
      align: "center",
      render: (h, params) => {
        if (params.row.projectNameEn !== "") {
          return h("span", params.row.projectNameEn);
        } else {
          return h("span", "-");
        }
      },
    },         {
      title: "申请单位",
      key: "applicantUnit",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.applicantUnit !== "") {
          return h("span", params.row.applicantUnit);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "出访人员姓名",
      key: "visitName",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.visitName !== "") {
          return h("span", params.row.visitName);
        } else {
          return h("span", "-");
        }
      },
    },      {
      title: "职务",
      key: "duty",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.duty !== "") {
          return h("span", params.row.duty);
        } else {
          return h("span", "-");
        }
      },
    },      {
      title: "对外身份",
      key: "foreignIdentity",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.foreignIdentity !== "") {
          return h("span", params.row.foreignIdentity);
        } else {
          return h("span", "-");
        }
      },
    },     {
      title: "出访国家或地区",
      key: "visitCountry",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.visitCountry !== "") {
          return h("span", params.row.visitCountry);
        } else {
          return h("span", "-");
        }
      },
    },    {
      title: "访问天数",
      key: "visitDays",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.visitDays !== "") {
          return h("span", params.row.visitDays);
        } else {
          return h("span", "-");
        }
      },
    },    {
      title: "交流形式",
      key: "formsOfCommunication",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.formsOfCommunication !== "") {
          return h("span", params.row.formsOfCommunication);
        } else {
          return h("span", "-");
        }
      },
    },   {
      title: "所属领域",
      key: "domain",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.domain !== "") {
          return h("span", params.row.domain);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "所属学科",
      key: "personSubject",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.personSubject !== "") {
          return h("span", params.row.personSubject);
        } else {
          return h("span", "-");
        }
      },
    }, {
      title: "离境日期",
      key: "departureDate",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.departureDate !== "") {
          return h("span", params.row.departureDate);
        } else {
          return h("span", "-");
        }
      },
    }, {
      title: "抵境日期",
      key: "entryDate",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.entryDate !== "") {
          return h("span", params.row.entryDate);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "主要接待单位",
      key: "receptionUnit",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.receptionUnit !== "") {
          return h("span", params.row.receptionUnit);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "国外邀请人姓名",
      key: "foreignInviterName",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.foreignInviterName !== "") {
          return h("span", params.row.foreignInviterName);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "填写申请日期",
      key: "applicantDate",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.applicantDate !== "") {
          return h("span", params.row.applicantDate);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "团组人数",
      key: "teamNum",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.teamNum !== "") {
          return h("span", params.row.teamNum);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "操作",
      key: "操作",
      width: 150,
      align: "center",
      fixed: "right",
      render: (h, params) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "text",
                size: "small",
              },
              style: {
                width: "90px",
                height: "22px",
                background: "#e2e6ed",
                borderRadius: "11px",
                color: "#727272",
                fontSize: "12px",
              },
              on: {
                click: () => {
                  if(params.row.uniqueId){
                   router.push({
                      path: "/domesticPersonnelInfor",
                      query: { id: params.row.uniqueId },
                    });
                  }else{
                    alert('数据没有提供人员id，跳转失败！')
                  }

                },
              },
            },
            "访问主页"
          ),
        ]);
      },
    },
  ],
  mutualVisitTable:[
    {
      title: "交流类型",
      key: "type",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.type !== "") {
          return h("span", params.row.type);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "年度",
      key: "year",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.year !== "") {
          return h("span", params.row.year);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "访问人员姓名",
      key: "name",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.name !== "") {
          return h("span", params.row.name);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "职称",
      key: "title",
      width: 120,
      align: "center",
      render: (h, params) => {
        if (params.row.title !== "") {
          return h("span", params.row.title);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "学科领域",
      key: "subject",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.subject !== "") {
          return h("span", params.row.subject);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "访问人员所在机构",
      key: "unit",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.unit !== "") {
          return h("span", params.row.unit);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "出/来访问国家",
      key: "visitCountry",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.visitCountry !== "") {
          return h("span", params.row.visitCountry);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "出/来访项目名称",
      key: "projectName",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.projectName !== "") {
          return h("span", params.row.projectName);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "访问机构",
      key: "visitUnit",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.visitUnit !== "") {
          return h("span", params.row.visitUnit);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "邀请人姓名",
      key: "inviterName",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.inviterName !== "") {
          return h("span", params.row.inviterName);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "交流形式",
      key: "formsOfCommunication",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.formsOfCommunication !== "") {
          return h("span", params.row.formsOfCommunication);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "访问天数",
      key: "visitDays",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.visitDays !== "") {
          return h("span", params.row.visitDays);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "访问开始时间",
      key: "beginDate",
      width: 180,
      align: "center",
      render: (h, params) => {
        if (params.row.beginDate !== "") {
          return h("span", params.row.beginDate);
        } else {
          return h("span", "-");
        }
      },
    },
    {
      title: "访问结束时间",
      key: "endDate",
      width: 180,
      align: "center",
      render: (h, params) => {
        if (params.row.endDate !== "") {
          return h("span", params.row.endDate);
        } else {
          return h("span", "-");
        }
      },
    },         {
      title: "操作",
      key: "操作",
      width: 150,
      align: "center",
      fixed: "right",
      render: (h, params) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "text",
                size: "small",
              },
              style: {
                width: "90px",
                height: "22px",
                background: "#e2e6ed",
                borderRadius: "11px",
                color: "#727272",
                fontSize: "12px",
              },
              on: {
                click: () => {
                  alert('数据不完整，跳转失败！')
                  // if(params.row.uniqueId){
                  //   this.$router.push({
                  //     path: "/PersonDetails",
                  //     query: { id: params.row.uniqueId },
                  //   });
                  // }else{
                  //   alert('数据没有提供人员id，跳转失败！')
                  // }

                },
              },
            },
            "访问主页"
          ),
        ]);
      },
    },
  ],

  //合作论文查询
  inpuireTable:[
    {
      title: " 论文名称",
      key: "title",
      width: 600,
      align: "center",
      render: (h, params) => {
        if (params.row.title !== "") {
          return h("span", params.row.title);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "作者",
      key: "autherTotal",
      align: "center",
      width: 600,
      render: (h, params) => {
        if (params.row.autherTotal !== "") {
          return h("span", params.row.autherTotal);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "期刊",
      key: "source",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.source !== "") {
          return h("span", params.row.source);
        } else {
          return h("span", "-");
        }
      },
    },         {
      title: "发表时间 ",
      key: "date",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.date !== "") {
          return h("span", params.row.date);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "被引用次数",
      key: "timesCited",
      align: "center",
      width: 150,
      render: (h, params) => {
        if (params.row.timesCited !== "") {
          return h("span", params.row.timesCited);
        } else {
          return h("span", "-");
        }
      },
    },   {
      title: "操作",
      key: "操作",
      width: 150,
      align: "center",
      fixed: "right",
      render: (h, params) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "text",
                size: "small",
              },
              style: {
                width: "90px",
                height: "22px",
                background: "#e2e6ed",
                borderRadius: "11px",
                color: "#727272",
                fontSize: "12px",
              },
              on: {
                click: () => {
                  router.push({
                    path: "/paperDetails",
                    query: { id: params.row.pGuid },
                  });

                },
              },
            },
            "访问主页"
          ),
        ]);
      },
    },
  ],
  analysisTable:[
    {
      title: " 论文名称",
      key: "applicantNumber",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.applicantNumber !== "") {
          return h("span", params.row.applicantNumber);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "作者",
      key: "projectName",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.projectName !== "") {
          return h("span", params.row.projectName);
        } else {
          return h("span", "-");
        }
      },
    },          {
      title: "期刊",
      key: "projectNameEn",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.projectNameEn !== "") {
          return h("span", params.row.projectNameEn);
        } else {
          return h("span", "-");
        }
      },
    },         {
      title: "发表时间 ",
      key: "applicantUnit",
      width: 120,
      align: "center",
      render: (h, params) => {
        if (params.row.applicantUnit !== "") {
          return h("span", params.row.applicantUnit);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "被引用次数",
      key: "visitName",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.visitName !== "") {
          return h("span", params.row.visitName);
        } else {
          return h("span", "-");
        }
      },
    },      {
      title: "职务",
      key: "duty",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.duty !== "") {
          return h("span", params.row.duty);
        } else {
          return h("span", "-");
        }
      },
    },      {
      title: "对外身份",
      key: "foreignIdentity",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.foreignIdentity !== "") {
          return h("span", params.row.foreignIdentity);
        } else {
          return h("span", "-");
        }
      },
    },     {
      title: "出访国家或地区",
      key: "visitCountry",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.visitCountry !== "") {
          return h("span", params.row.visitCountry);
        } else {
          return h("span", "-");
        }
      },
    },    {
      title: "访问天数",
      key: "visitDays",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.visitDays !== "") {
          return h("span", params.row.visitDays);
        } else {
          return h("span", "-");
        }
      },
    },    {
      title: "交流形式",
      key: "formsOfCommunication",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.formsOfCommunication !== "") {
          return h("span", params.row.formsOfCommunication);
        } else {
          return h("span", "-");
        }
      },
    },   {
      title: "所属领域",
      key: "domain",
      width: 200,
      align: "center",
      render: (h, params) => {
        if (params.row.domain !== "") {
          return h("span", params.row.domain);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "所属学科",
      key: "personSubject",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.personSubject !== "") {
          return h("span", params.row.personSubject);
        } else {
          return h("span", "-");
        }
      },
    }, {
      title: "离境日期",
      key: "departureDate",
      width: 100,
      align: "center",
      render: (h, params) => {
        if (params.row.departureDate !== "") {
          return h("span", params.row.departureDate);
        } else {
          return h("span", "-");
        }
      },
    }, {
      title: "抵境日期",
      key: "entryDate",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.entryDate !== "") {
          return h("span", params.row.entryDate);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "主要接待单位",
      key: "receptionUnit",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.receptionUnit !== "") {
          return h("span", params.row.receptionUnit);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "国外邀请人姓名",
      key: "foreignInviterName",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.foreignInviterName !== "") {
          return h("span", params.row.foreignInviterName);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "填写申请日期",
      key: "applicantDate",
      width: 300,
      align: "center",
      render: (h, params) => {
        if (params.row.applicantDate !== "") {
          return h("span", params.row.applicantDate);
        } else {
          return h("span", "-");
        }
      },
    },  {
      title: "团组人数",
      key: "teamNum",
      width: 150,
      align: "center",
      render: (h, params) => {
        if (params.row.teamNum !== "") {
          return h("span", params.row.teamNum);
        } else {
          return h("span", "-");
        }
      },
    },        {
      title: "操作",
      key: "操作",
      width: 150,
      align: "center",
      fixed: "right",
      render: (h, params) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "text",
                size: "small",
              },
              style: {
                width: "90px",
                height: "22px",
                background: "#e2e6ed",
                borderRadius: "11px",
                color: "#727272",
                fontSize: "12px",
              },
              on: {
                click: () => {
                  router.push({
                    path: "/paperDetails",
                  });

                },
              },
            },
            "访问主页"
          ),
        ]);
      },
    },
  ],
}
