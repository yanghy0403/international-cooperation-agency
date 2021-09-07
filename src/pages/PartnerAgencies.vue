<template>
    <div class="exchangeCon">
        <div class="ex-left">
            <div class="ex-logo" @click="handleClose">
                <img src="../assets/images/国际人才/页面固定内容/logo.png" alt />
                <p>中国科学院国际合作</p>
                <p>数据汇交与分析平台</p>
            </div>
            <div class="exTitle">伙伴机构</div>
            <div class="ex-nav">
                <!-- <div class="navActive">
                    <router-link tag="li" to="/analysis">统计与分析</router-link>
                </div>
                <div>
                    <router-link tag="li" to="/inquire">论文查询</router-link>
                </div> -->

            </div>
            <div class="ex-btm" @click="lastPage">
                <div class="iconfontClose">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="closeName">返回上一页</div>
            </div>
        </div>
        <div class="ex-right" v-show="isSlide">
            <div class="fr-reel fr-reel-detail">
                <div class="fr-reel-left">
                    <div class="">
                        <div class="fr-reelHeader">
                            <div class="reel-tabs">
                                <!-- <p @click="mode=0" :class="{modeActive:mode==0}">自由模式</p>
                                <p @click="mode=1" :class="{modeActive:mode==1}">条件模式</p>
                                <div class="lock">
                                    <img v-if="mode==0" src="../assets/images/国际人才/自由模式示意符.png" alt />
                                    <img v-else style="width:12px;"
                                        src="../assets/images/国际人才/条件模式示意符.png" alt />
                                </div> -->
                            </div>
                            <div class="reel-filterCondition_0" v-show="mode==0">
                                <ul>
                                    <li>
                                        请选择大洲
                                        <i class="iconfont icon-iconfontjiantou"></i>
                                    </li>
                                    <li>
                                        请选择国家或地区
                                        <i class="iconfont icon-iconfontjiantou"></i>
                                    </li>
                                    <li>
                                        请选择城市（暂未开放）
                                        <i class="iconfont icon-iconfontjiantou"></i>
                                    </li>
                                </ul>
                            </div>
                            <div class="reel-filterCondition_1" v-show="mode==1">
                                <ul>
                                    <li class="reel-filterCondition_1_li">
                                        <el-select clearable v-model="continentSelected"
                                            placeholder="请选择大洲" @change="handleContinentChange">
                                            <el-option v-for="(item,index) in continentOptions"
                                                :key="index" :label="item" :value="item">
                                            </el-option>
                                        </el-select>
                                    </li>
                                    <li class="reel-filterCondition_1_li">
                                        <el-select clearable v-model="countrySelected" filterable
                                            placeholder="请选择国家或地区">
                                            <el-option v-for="(item,index) in countryOptions" :key="index"
                                                :label="item" :value="item">
                                            </el-option>
                                        </el-select>
                                        <!-- <el-cascader :options="areaoptions" v-model="globalArea"
                                            :show-all-levels="false" placeholder="请选择国家或地区" :props="areaProps">
                                        </el-cascader> -->
                                    </li>
                                    <li class="reel-filterCondition_1_li">
                                        <el-select clearable v-model="citySelected" disabled
                                            placeholder="请选择城市（暂未开放）">
                                            <!-- <el-option v-for="item in foreignOrgAll" :key="item.index"
                                                :label="item.value" :value="item.value">
                                            </el-option> -->
                                        </el-select>
                                    </li>
                                </ul>
                            </div>
                            <div class="reel-filterBtns" :class="searchBtnActive?'active':''"
                                @mouseenter="clickHover(1)" @mouseleave="clickHover(2)"
                                @click="secondarySearch">
                                筛选
                                <!-- <img :src="searchIcon" alt=""> -->
                            </div>
                            <div class="reel-emptys" @click="emptyParams" @mouseenter="clickHover(5)"
                                @mouseleave="clickHover(6)">
                                <img :src="emptyIcon" alt="">
                            </div>
                            <div class="reel-DownloadAlls reel-DownloadAllsDetail iconfont icon-xiazai" @click="handleMapDownloadClick">
                            </div>
                        </div>
                        <div class="cooperation-type">
                            <div class="cooperation-type-label">选择合作类别：</div>
                            <el-checkbox-group v-model="cooperationType" :disabled="mode==0">
                                <el-checkbox v-for="(item, index) in cooperationTypeList" :key="index"
                                    :label="item.value" :value="item.value">{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="fr-reelCenter newScrollbar">
                        <!-- <div class="reelCentent  ">
                            <div class="moduleDiv">
                                <TopicSubsidize :data="paperYearData" :mode="mode" visitType="出访"
                                    v-loading="loading" element-loading-text="加载中..." />
                            </div>
                            <div class="moduleDiv">
                                <TopicSubjectAreas :data="TopicSubject" :mode="mode"
                                    :visitType="visitType" :subjectSelect="params['subjectSelect']"
                                    v-loading="loading" element-loading-text="加载中..." />
                            </div>
                        </div>
                        <div class="reelBottom" style="margin-top: 10px;">
                            <personRanking :data="personRankingData" :visitType="visitType" :mode="mode"
                                v-loading="loading" element-loading-text="加载中..." />

                        </div>

                        <div class="reelBottom">
                            <IdentityGlobalMap :data="IdentityGlobalData"
                                :InstituteData="InstituteImportData" :mode="mode" :visitType="visitType"
                                v-loading="loading" element-loading-text="加载中..." />
                        </div> -->

                        <div class="result-box">
                            <div class="operating">
                                <div @click.stop="handleListIconClick" class="visualizationList iconDiv">
                                    <img :src="islistActived?icon3:icon4" alt />
                                </div>
                                <div @click.stop="handleMapIconClick" class="visualization iconDiv">
                                    <img :src="islistActived?icon5:icon6" alt />
                                </div>
                                <div @click.stop="handleMapDownloadClick" class="downloadNew iconDiv"></div>
                            </div>
                            <div class="map-box" ref="worldMap" :style="{height:tableHeight+'px'}"
                                element-loading-text="加载中..." v-show="!islistActived"></div>
                            <div class="list-box" v-show="islistActived">
                                <div class="search-result-table newScrollbar">
                                    <div style="" class="tableList" v-loading="loading"
                                        element-loading-text="加载中...">
                                        <!-- <Table :height="tableHeight" border :columns="columns1"
                                            row-key="id" :data="tableData"></Table> -->
                                        <el-table :data="tableData" style="width: 100%" row-key="id"
                                            default-expand-all
                                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                                            <el-table-column type="index" width="280" align="center"
                                                class-name="index-col" label="序号">
                                            </el-table-column>
                                            <el-table-column prop="area" label="地区名称"
                                                class-name="region-col" align="left   ">
                                            </el-table-column>
                                            <el-table-column prop="amount" label="机构数量" align="center">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <!-- <div class="paginationDiv">
                                    <div class="record-info">
                                        <img src="../assets/images/国际人才/页面固定内容/事业单位标志-内页统一样式版.png" alt />

                                        <span>中国科学院计算机网络信息中心</span>
                                        <span class="line">|</span>
                                        <span>备案编号:京ICP备0900008-26</span>
                                    </div>

                                    <div class="pagination">
                                        <Page :total="TopicpersonList.count"
                                            :current.sync="params2.offset" :page-size="params2.limit"
                                            @on-change="changePage" />
                                    </div>
                                </div> -->
                            </div>
                            <div class="slider-box">
                                <el-slider v-model="sliderValue" :marks="marks" range :min="1"
                                    :show-stops="false" :show-tooltip="false" :max="7">
                                </el-slider>
                                <div class="desc">选择参与合作类别数（区间）</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="fr-reel-center">
                    <div class="iconDiv" @click="handleShutdown">
                        <div class="left-icon iconfont icon-shuangjiantouzuo"></div>
                        <div class="text"> 收起统计区</div>
                    </div>
                </div>
                <div class="fr-reel-right">

                </div>
            </div>
        </div>

        <div class="ex-right2" >
            <div class="fr-reel-close">
                <div class="iconDiv" @click="handleOpenUp">
                    <div class="right-icon iconfont icon-shuangjiantouyou"></div>
                    <div class="text"> 查看统计图表</div>
                </div>
            </div>
            <div class="personList">
                <div class="breadCrumbs">
                    <ul>
                        <!-- <li>伙伴机构</li> -->
                        <!-- <li>/</li>
                        <li>统计与分析</li> -->
                        <li></li>
                    </ul>
                </div>
                <div class=" personHeaderNew" style="display: flex">
                    <h3 class="personTitleName">伙伴机构</h3>
                    <div>
                        <input class="personInput" v-model="orgName" placeholder="请输入要检索机构名称"
                            type="text" />
                        <div class="iconDiv" @click="handleSearchClick"><i class="el-icon-search"></i>
                        </div>
                    </div>
                    <Login />
                </div>
                <div class="personHeader">
                    <div class="personList-FilterCondition">
                        <ul>
                            <li class="reel-filterCondition_1_li">
                                <el-select clearable v-model="continentSelected" placeholder="请选择大洲"
                                    @change="handleContinentChange">
                                    <el-option v-for="(item,index) in continentOptions" :key="index"
                                        :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </li>
                            <li class="reel-filterCondition_1_li">
                                <el-select clearable v-model="countrySelected" placeholder="请选择国家或地区"
                                    filterable>
                                    <el-option v-for="(item,index) in countryOptions" :key="index"
                                        :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </li>
                            <li class="reel-filterCondition_1_li">
                                <el-select clearable v-model="citySelected" disabled
                                    placeholder="请选择城市（暂未开放）">
                                    <!-- <el-option v-for="item in foreignOrgAll" :key="item.index"
                                        :label="item.value" :value="item.value">
                                    </el-option> -->
                                </el-select>
                            </li>
                        </ul>
                    </div>
                    <div class="personSearch" :class="searchBtnActive?'active':''"
                        @mouseenter="clickHover(1)" @mouseleave="clickHover(2)" @click="threeLevelSearch">
                        <img :src="searchIcon" alt="">
                    </div>
                    <div class="personReast" @click="emptyParams2" @mouseenter="clickHover(5)"
                        @mouseleave="clickHover(6)">
                        <img :src="emptyIcon" alt="">
                    </div>
                    <div class="personDownload" @mouseenter="clickHover(3)" @mouseleave="clickHover(4)"
                        @click="handleCardTableExport">
                        <img :src="downloadIcon" alt="">
                    </div>

                </div>
                <div class="cooperation-type-card">
                    <div>选择合作类别：</div>
                    <el-checkbox-group v-model="cooperationType">
                        <el-checkbox v-for="(item, index) in cooperationTypeList" :key="index"
                            :label="item.value" :value="item.value">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="listTabs">
                    <!-- <el-select size="mini" value="综合排序" clearable placeholder="请选择院内机构">
                        <el-option label="综合排序" value="综合排序"> </el-option>
                        <el-option label="按照时间排序" value="按照时间排序"> </el-option>
                    </el-select> -->
                    <div class="operating-card">
                        <div @click.stop="handleListIconClick2" class="visualizationList iconDiv">
                            <img :src="islistActived2?listIcon2:imgIcon2" alt />
                        </div>
                        <div @click.stop="handleCardIconClick" class="visualization iconDiv">
                            <img :src="islistActived2?listIcon1:imgIcon1" alt />
                        </div>
                    </div>
                    <p class="personTotal">
                        检索到
                        <label>{{cardListCount}}条结果</label>
                    </p>

                </div>
                <div v-show="!islistActived2" class="arrayList card-list-box" v-loading="loading"
                    element-loading-text="加载中...">

                    <ul>
                        <li v-for="(item,i) in cardList" :key="i" >
                            <!-- 头像 -->
                            <div class="avatar" @click="toDetails(item.orgId)">
                                <img v-if="item.imgUrl" :src="url + item.imgUrl" alt />
                                <img v-else src="../assets/images/PartnerAgencies/机构默认头像无头像状态.png" alt />
                            </div>

                            <!--出访：  姓名、国籍、职称、学科领域、访问单位、工作单位 -->
                            <!-- 名字 -->
                            <!-- <div class="personName" @click="toPersonDetail(item.uniqueId)"> -->
                            <div class="personName" @click="toDetails(item.orgId)">
                                {{item.zhName==''?item.enName:item.zhName}}</div>
                            <!-- 国家或地区 -->
                            <div class="personCountry">{{item.country}}</div>
                            <div class="line"></div>
                            <!-- 职称、学科领域 -->
                            <!-- <div class="personSpecialty">{{item.personTitle}}·{{item.personSubject}}</div> -->

                            <!-- 访问单位 -->
                            <!-- <div class="CHunit">
                                <label>合作类型：</label>
                                <span v-for="(type, j) in item.cooperationType" :key="j">
                                    {{type}}
                                    <span v-show="j<item.cooperationType.length-1">、</span>
                                </span>
                            </div> -->
                            <div class="CHunit">
                                <label>英文名称：</label>
                                <span>{{item.enName}}</span>
                            </div>
                            <!-- 工作单位 -->
                            <!-- <div class="ENunit">
                                <label>工作单位：</label>
                                <span>{{item.instName}}</span>
                            </div> -->
                        </li>
                    </ul>
                </div>
                <div style="" v-show="islistActived2" class="card-table-box" v-loading="loading"
                    element-loading-text="加载中...">
                    <!-- <Table :height="tableHeight" border :columns="columns1"
                        :data="cardList"></Table> -->
                    <el-table :data="cardList" style="width: 100%" border :height="tableHeight">
                        <el-table-column type="index" width="80" align="center" label="序号">
                        </el-table-column>
                        <el-table-column prop="zhName" label="机构名称（中文）" align="center">
                            <template slot-scope="scope">
                                <span class="table-zh-name" @click="toDetails(scope.row.orgId)">
                                    {{scope.row.zhName}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="enName" label="机构名称（英文）" align="center">
                            <template slot-scope="scope">
                                <span class="table-zh-name" @click="toDetails(scope.row.orgId)">
                                    {{scope.row.enName}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="city" label="所属城市" align="center">
                        </el-table-column>
                        <el-table-column prop="country" label="所属国家或地区" align="center">
                        </el-table-column>
                        <el-table-column prop="continent" label="所属大洲" align="center">
                        </el-table-column>
                        <!-- <el-table-column prop="" label="机构类型" align="center">
                        </el-table-column> -->
                        <el-table-column prop="" label="合作类别" align="center">
                            <template slot-scope="scope">
                                <span v-for="(item, index) in scope.row.cooperationType" :key="index">
                                    <span>{{item}}</span>
                                    <span v-show="index<scope.row.cooperationType.length-1">、</span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="relativity" label="与中科院亲密度" align="center">
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div class="search-result-card">
                    <div style="" class="tableList" v-loading="loading" element-loading-text="加载中...">
                        <Table :height="tableHeight" border :columns="columns1"
                            :data="TopicpersonList.personList"></Table>
                    </div>
                </div> -->
                <div class="paginationDiv">
                    <div class="record-info">
                      <span>中国科学院国际合作局  版权所有</span>
                      <span class="line">|</span>
                      <span>技术支持：中国科学院计算机网络信息中心</span>
                    </div>

                    <div class="pagination">
                        <Page :total="cardListCount" :current.sync="currentPage" :page-size="pageSize"
                            @on-change="changePage" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
// import TopicSubsidize from "./modules/TopicSubsidize"; // 历年出访人数
// import TopicSubjectAreas from "./modules/SubjectAreas"; //
// import personRanking from "./modules/personRanking"; //
// import IdentityGlobalMap from "./modules/IdentityGlobalMap";  //地图


// import personRankingData from '@/assets/json/exchange/visitRanking.json'
// import IdentityGlobalData from '@/assets/json/exchange/map.json'
// import TopicpersonList from '@/assets/json/exchange/列表数据.json'


//引入js
import visitFun from '@/assets/js/visit.js'
import Axios from "axios";
export default {
  name:'PartnerAgencies',
      components: {
        // TopicSubsidize,
        // TopicSubjectAreas,
        // personRanking,
        // IdentityGlobalMap,
    },
    data () {
        return {
            timer: null,
            myChart: null,
            searchBtnActive: false,
            pageSize: 60,
            currentPage: 1,
            orgName: '',
            sliderValue: [1, 7],
            length: [1, 4],
            marks: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
            },
            continentOptions: [],
            countryOptions: [],
            continentSelected: '',
            countrySelected: '',
            citySelected: '',
            cardList: [],
            cardListCount: '',
            tableData: [],
            mapData: [],
            isCardShow: true,
            mapLoading: false,
            listLoading: false,
            cardLoading: false,
            cooperationTypeList: [
                { label: '交流', value: 'communication' }, { label: '项目', value: 'project' }, { label: '人才', value: 'talent' },
                { label: '平台', value: 'platform' }, { label: '协议', value: 'agreement' }, { label: '论文', value: 'paper' }, { label: '奖励', value: 'award' },
            ],
            cooperationType: [],
            islistActived: false,
            islistActived2: false,
            tableHeight: window.innerHeight - 350,
            mode: 1,
            isSlide: true,
            isListShow: true,
            visitType: '出访',
            source: 'internationalPerson',
            icon1: require("../assets/images/国际人才/index/图表选中.png"),
            icon2: require("../assets/images/国际人才/index/图标列表默认.png"),
            icon3: require("../assets/images/国际人才/index/图表列表选中.png"),
            icon4: require("../assets/images/国际人才/index/图标列表默认.png"),
            icon5: require("../assets/images/国际人才/index/图表默认.png"),
            icon6: require("../assets/images/国际人才/index/图表选中.png"),
            listIcon1: require("../assets/images/国际人才/index/默认矩阵.png"),
            listIcon2: require("../assets/images/国际人才/index/选中列表.png"),
            imgIcon1: require("../assets/images/国际人才/index/选中矩阵.png"),
            imgIcon2: require("../assets/images/国际人才/index/默认列表.png"),
            imgIcon3: require("../assets/images/国际人才/index/选中矩阵.png"),
            imgIcon4: require("../assets/images/国际人才/index/默认列表.png"),
            searchImg: require("../assets/images/exchange/筛选4.png"),
            searchIcon: require("../assets/images/exchange/筛选4.png"),
            searchImgHover: require("../assets/images/exchange/筛选3.png"),
            downloadImg: require("../assets/images/exchange/导出图标（默认）2.png"),
            downloadIcon: require("../assets/images/exchange/导出图标（默认）2.png"),
            downloadImgHover: require("../assets/images/exchange/导出图标（选中）2.png"),
            emptyIcon: require("../assets/images/exchange/clearDefault.png"),
            emptyIconDefault: require("../assets/images/exchange/clearDefault.png"),
            emptyIconSelect: require("../assets/images/exchange/clearSelected.png"),
            paperYearData: {},  //历年合作论文篇数
            params: {
                orgSelect: '',  //院内机构
                yearSelect: '', //年份
                continentSelect: '', //大洲
                countrySelect: '', //国家或地区
                citySelect: '', //城市
                foreignOrgSelect: '', //国外机构
                subjectSelect: '', //学科
            },
            params2: {
                orgSelect: '',  //院内机构
                yearSelect: '', //年份
                continentSelect: '', //大洲
                countrySelect: '', //国家或地区
                citySelect: '', //城市
                foreignOrgSelect: '', //国外机构
                subjectSelect: '', //学科
                limit: 60,
                offset: 1,
            },
            loading: false,
            TopicFounding: {
                countByYear: {},
                tableData: [],
            },
            TopicSubject: {},
            personRankingData: {},
            orgRankingData: {},
            IdentityGlobalData: {},  //人才世界地图数据数据
            InstituteImportData: {}, //院所分布数据
            TopicpersonList: {},
            tableTitle: [],

            orgAll: [],
            countriesAll: [],
            cityAll: [],
            foreignOrgAll: [
                {
                    value: '',
                    label: '',
                }, {
                    value: '',
                    label: '',
                },
            ],
            subjectAll: [],
            // 出访人员列表
            columns1: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '机构名称（中文）',
                    key: 'zhName'
                },
                {
                    title: '机构名称（英文）',
                    key: 'enName'
                },
                {
                    title: '所属城市',
                    key: 'city'
                },
                {
                    title: '所属国家或地区',
                    key: 'country'
                },
                {
                    title: '所属大洲',
                    key: 'continent'
                },
                {
                    title: '机构类型',
                    key: ''
                },
                {
                    title: '合作类别',
                    key: 'cooperationType'
                },
                {
                    title: '与中科院亲密度',
                    key: 'relativity'
                }
            ],
            globalArea: '',
            globalArea2: '',
            areaoptions: [
                {
                    value: '1-亚洲',
                    label: '亚洲',
                }, {
                    value: '1-非洲',
                    label: '非洲',
                }, {
                    value: '1-北美洲',
                    label: '北美洲',
                }, {
                    value: '1-南美洲',
                    label: '南美洲',
                }, {
                    value: '1-欧洲',
                    label: '欧洲',
                }, {
                    value: '1-南极洲',
                    label: '南极洲',
                }, {
                    value: '1-大洋洲',
                    label: '大洋洲',
                },
            ],
            areaProps: {
                lazy: true,
                checkStrictly: true,
                lazyLoad (node, resolve) {
                    let that = this
                    const { level } = node;
                    let nodeIndex = ((node.level))   //  第几级，1代表1一级，2代表第二级，以此类推
                    let label = ((node.label))
                    if (nodeIndex == 1) {
                        Axios.get("/index/country/autoTip", {
                            params: {
                                city: "",
                                continent: label,
                                countrySimpleZhName: "",
                                language: "",
                                source: "",
                            },
                        }).then((res) => {
                            if (res.data.code == 200) {
                                let data = res.data.data.name;
                                let newCountryData = []
                                data.forEach((item, index) => {
                                    newCountryData.push({
                                        value: `2-${item}`,
                                        label: item,
                                    })
                                })
                                resolve(newCountryData);
                            }
                        });
                    } else if (nodeIndex == 2) {
                        Axios.get("/index/city/autoTip", {
                            params: {
                                city: "",
                                continent: '',
                                country: label,
                                language: "",
                                source: "",
                            },
                        }).then((res) => {
                            if (res.data.code == 200) {
                                let data = res.data.data;
                                let newCountryData = []
                                data.forEach((item, index) => {
                                    newCountryData.push({
                                        value: `3-${item}`,
                                        label: item,
                                        leaf: level >= 2
                                    })
                                })
                                resolve(newCountryData);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成

                }
            },
        }
    },
    mounted () {
        visitFun.getInstitutionsInTheHospital(data => { this.orgAll = data })
        visitFun.handleSubject(data => { this.subjectAll = data })
        this.getAllFun()
        this.$nextTick(() => {
            this.searchBtnActive = false;
            this.clickHover(2);
        })
    },
    watch: {
        continentSelected: 'paramsChange',
        countrySelected: 'paramsChange',
        cooperationType: 'autoSearch',
        sliderValue: 'autoSearch'
    },
    methods: {
        /**
         * @author: jingyh
         * @description: 二级下载按钮
         * @param {*}
         */
        handleMapDownloadClick () {
            if (!this.islistActived) {// 地图导出图片
                if (this.myChart) {
                    var i = this.myChart.getDataURL({
                        type: "png",
                        backgroundColor: "#a4aec2",
                        pixelRatio: 2,
                        // 导出的图片分辨率比例，默认为 1。
                        //pixelRatio: number,
                    });
                    var $a = document.createElement("a");
                    $a.setAttribute("href", i);
                    $a.setAttribute("download", 'chart' + ".png");
                    $a.click();
                }
            } else {// 表格导出Excel
                let paramsUrl = ''
                let params = {
                    city: '',
                    continent: this.continentSelected,  //大洲
                    country: this.countrySelected.split('/')[0] || '',  //国家或地区
                    max: this.sliderValue[1],
                    min: this.sliderValue[0],
                    type: this.cooperationType
                }
                for (let it in params) {
                    if (Object.prototype.toString.call(params[it]) === '[object Array]') {
                        if (params[it].length) {// 判断数组是否为空
                            var arr = ''
                            params[it].forEach((item, index) => {
                                if (index < params[it].length - 1) {
                                    arr += "'" + item + "',"
                                } else {
                                    arr += "'" + item + "'"
                                }
                            })
                            paramsUrl += encodeURIComponent(it) + '=' + '[' + arr + ']' + '&'
                        } else {
                            paramsUrl += encodeURIComponent(it) + '=' + '&'
                        }

                    } else {
                        paramsUrl += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
                    }
                }
                // 删除最后一个&
                paramsUrl = paramsUrl.slice(0, paramsUrl.length - 1)
                var url = `/partner/mapDownload?${paramsUrl}`
                this.axios({
                    method: 'get',
                    url: url,
                    // url: '/paper/export?mq_authors.zhName=Quan%20Peiyu&sort_sort=date&page_offset=1&page_limit=10',
                    responseType: 'blob',
                }).then(res => {
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', `表格.xls`)
                    document.body.appendChild(link)
                    link.click()
                })
            }
        },
        /**
         * @author: jingyh
         * @description: 卡片表格导出
         * @param {*}
         */
        handleCardTableExport () {
            let paramsUrl = ''
            let params = {
                city: '',
                pageOffset: this.currentPage - 1,
                orgName: this.orgName,
                continent: this.continentSelected,  //大洲
                country: this.countrySelected.split('/')[0] || '',  //国家或地区
                max: this.sliderValue[1],
                min: this.sliderValue[0],
                type: this.cooperationType,
                totalSize: this.cardListCount
            }
            for (let it in params) {
                if (Object.prototype.toString.call(params[it]) === '[object Array]') {// 判断是否为数组对参数特殊处理
                    if (params[it].length) {// 判断数组是否为空
                        var arr = ''
                        params[it].forEach((item, index) => {
                            if (index < params[it].length - 1) {
                                arr += "'" + item + "',"
                            } else {
                                arr += "'" + item + "'"
                            }
                        })
                        paramsUrl += encodeURIComponent(it) + '=' + '[' + arr + ']' + '&'
                    } else {
                        paramsUrl += encodeURIComponent(it) + '=' + '&'
                    }
                } else {
                    paramsUrl += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
                }
            }
            // 删除最后一个&
            paramsUrl = paramsUrl.slice(0, paramsUrl.length - 1)
            var url = `/partner/listDownload?${paramsUrl}`
            this.axios({
                method: 'get',
                url: url,
                // url: '/paper/export?mq_authors.zhName=Quan%20Peiyu&sort_sort=date&page_offset=1&page_limit=10',
                responseType: 'blob',
            }).then(res => {
                let url = window.URL.createObjectURL(new Blob([res.data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', `表格.xls`)
                document.body.appendChild(link)
                link.click()
            })
        },
        /**
         * @author: jingyh
         * @description: 条件改变自动检索
         * @param {*}
         */
        autoSearch () {
            clearTimeout(this.timer);
            this.timer = null;
            this.timer = setTimeout(() => {
                this.secondLevelSearch();
            }, 500)
        },
        /**
         * @author: jingyh
         * @description: 参数改变筛选按钮样式
         * @param {*}
         */
        paramsChange () {
            this.searchBtnActive = true;
            this.clickHover(1)
        },
        getAllFun () {
            //二级
            this.secondLevelSearch()
            //三级
            this.getlistData()
            // 获取所有大洲
            this.getAllContinent()
            this.getCountry()
        },
        handleChange (val) {
            if (val == 1) {

            }
        },
        //鼠标滑入改变图标
        clickHover (val) {
            if (val == 1) {
                this.searchIcon = this.searchImgHover
            } else if (val == 2) {
                if (!this.searchBtnActive) {
                    this.searchIcon = this.searchImg
                }
            } else if (val == 3) {
                this.downloadIcon = this.downloadImgHover
            } else if (val == 4) {
                this.downloadIcon = this.downloadImg
            } else if (val == 5) {
                this.emptyIcon = this.emptyIconSelect
            } else if (val == 6) {
                this.emptyIcon = this.emptyIconDefault
            }
        },
        handleShutdown () {
            this.isSlide = false
        },
        handleOpenUp () {
            this.isSlide = true
        },
        // 列表切换
        listCur (val) {
            if (val != 1) {
                this.imgIcon1 = this.listIcon1;
                this.imgIcon2 = this.listIcon2;
                this.isListShow = false;
            } else {
                this.imgIcon1 = this.imgIcon3;
                this.imgIcon2 = this.imgIcon4;
                this.isListShow = true;
            }
        },
        //条件清空
        emptyParams () {
            this.orgName = '';
            this.continentSelected = '';
            this.countrySelected = '';
            this.sliderValue = [1, 7];
            this.cooperationType = [];
            this.secondarySearch()
        },
        //条件清空
        emptyParams2 () {
            this.orgName = '';
            this.continentSelected = '';
            this.countrySelected = '';
            this.sliderValue = [1, 7];
            this.cooperationType = [];
            this.threeLevelSearch()
        },
        //二级搜索
        secondarySearch () {
            if (this.globalArea != '') {
                this.params.continentSelect = ''
                this.params.countrySelect = ''
                this.params.citySelect = ''
                let length = this.globalArea.length
                if (length == 1) {
                    this.params.continentSelect = this.globalArea[length - 1].split('-')[1]
                } else if (length == 2) {
                    this.params.countrySelect = this.globalArea[length - 1].split('-')[1]
                } else if (length == 3) {
                    this.params.citySelect = this.globalArea[length - 1].split('-')[1]
                }
            }
            this.clickHover(2);
            this.searchBtnActive = false;
            this.secondLevelSearch()
        },

        //二级搜索
        secondLevelSearch () {
            this.currentPage = 1;
            this.getlistData()
            this.getMapData()
            this.getCardList()
        },

        //三级搜索
        threeLevelSearch () {
            this.currentPage = 1;
            this.getlistData()
            this.getMapData()
            this.getCardList()
            this.searchBtnActive = false;
        },

        changePage (val) {
            this.currentPage = val
            this.getCardList()
        },

        // 进入国才详情页
        toPersonDetail (val) {
            if (val) {
                this.$router.push({
                    path: "/domesticPersonnelInfor",
                    query: { id: val },
                });
            } else {
                alert('获取不到人员id，请检查数据是否完整！')
            }
            // if(val){
            //   this.$router.push({
            //     path: "/PersonDetails",
            //     query: { id: val },
            //   });
            // }else{
            //   alert('国内人员详情页正在开发中！')
            // }
        },

        // 返回首页
        handleClose () {
            visitFun.goHome()
        },
        lastPage () {
            visitFun.lastPage()
        },
        /**
         * @author: jingyh
         * @description: 点击图标切换展示类型
         * @param {type}
         */
        handleMapIconClick () {
            this.islistActived = false;
        },
        handleListIconClick () {
            this.islistActived = true;
        },
        handleListIconClick2 () {
            this.islistActived2 = true;
        },
        handleCardIconClick () {
            this.islistActived2 = false;
        },
        /**
         * @author: jingyh
         * @description: 获取表格数据
         * @param {*}
         */
        getlistData () {
            let that = this
            //根据globalArea2值来判断洲，国家或地区，城市的值
            if (this.globalArea2 != '') {
                this.params2.continentSelect = ''
                this.params2.countrySelect = ''
                this.params2.citySelect = ''
                let length = this.globalArea2.length
                if (length == 1) {
                    this.params2.continentSelect = this.globalArea2[length - 1].split('-')[1]
                } else if (length == 2) {
                    this.params2.countrySelect = this.globalArea2[length - 1].split('-')[1]
                } else if (length == 3) {
                    this.params2.citySelect = this.globalArea2[length - 1].split('-')[1]
                }
            }
            let typeParam = ''
            for (let it in this.cooperationType) {
                typeParam +=
                    'type=' + encodeURIComponent(this.cooperationType[it]) + '&'
            }
            typeParam = typeParam == '' ? 'type=' : typeParam;
            this.axios({
                method: 'POST',
                url: '/partner/listDetail',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [
                    function () {
                        let ret = ''
                        let params = {
                            city: '',
                            continent: that.continentSelected,  //大洲
                            country: that.countrySelected.split('/')[0] || '',  //国家或地区
                            max: that.sliderValue[1],
                            min: that.sliderValue[0],
                            type: that.cooperationType
                        }
                        for (let it in params) {
                            if (Object.prototype.toString.call(params[it]) === '[object Array]') {
                                var arr = ''
                                params[it].forEach((item, index) => {
                                    if (index < params[it].length - 1) {
                                        arr += "'" + item + "',"
                                    } else {
                                        arr += "'" + item + "'"
                                    }
                                })
                                ret +=
                                    encodeURIComponent(it) + '=' + '[' + arr + ']' + '&'
                            } else {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
                            }
                        }
                        return ret
                    }
                ]
            }).then((res) => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data
                }
            });

        },
        /**
         * @author: jingyh
         * @description: 获取卡片列表
         * @param {*}
         */
        getCardList () {
            this.cardLoading = true;
            let that = this
            let typeParam = ''
            for (let it in this.cooperationType) {
                typeParam +=
                    'type=' + encodeURIComponent(this.cooperationType[it]) + '&'
            }
            typeParam = typeParam == '' ? 'type=' : typeParam
            this.axios({
                method: 'POST',
                url: '/partner/orgList',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [
                    function () {
                        let ret = ''
                        let params = {
                            city: '',
                            pageSize: that.pageSize,
                            pageOffset: that.currentPage - 1,
                            orgName: that.orgName,
                            continent: that.continentSelected,  //大洲
                            country: that.countrySelected.split('/')[0] || '',  //国家或地区
                            max: that.sliderValue[1],
                            min: that.sliderValue[0],
                            type: that.cooperationType
                        }
                        for (let it in params) {
                            if (Object.prototype.toString.call(params[it]) === '[object Array]') {
                                var arr = ''
                                params[it].forEach((item, index) => {
                                    if (index < params[it].length - 1) {
                                        arr += "'" + item + "',"
                                    } else {
                                        arr += "'" + item + "'"
                                    }
                                })
                                ret +=
                                    encodeURIComponent(it) + '=' + '[' + arr + ']' + '&'
                            } else {
                                ret +=
                                    encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
                            }
                        }
                        return ret
                    }
                ]
            }).then((res) => {
                if (res.data.code == 200) {
                    this.cardListCount = res.data.data.count;
                    this.cardList = res.data.data.orgList;
                    this.cardLoading = false;
                }
            });
        },
        /**
         * @author: jingyh
         * @description: 获取地图数据
         * @param {type}
         */
        getMapData () {
            this.mapLoading = true;
            var that = this
            let typeParam = ''
            for (let it in this.cooperationType) {
                typeParam +=
                    'type=' + encodeURIComponent(this.cooperationType[it]) + '&'
            }
            typeParam = typeParam == '' ? 'type=' : typeParam
            this.axios({
                method: 'POST',
                url: '/partner/orgMap',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [
                    function () {
                        let ret = ''
                        let params = {
                            city: '',   //城市
                            continent: that.continentSelected,  //大洲
                            country: that.countrySelected.split('/')[0] || '',  //国家或地区
                            max: that.sliderValue[1],
                            min: that.sliderValue[0],
                            type: that.cooperationType
                        }
                        for (let it in params) {
                            if (Object.prototype.toString.call(params[it]) === '[object Array]') {
                                var arr = ''
                                params[it].forEach((item, index) => {
                                    if (index < params[it].length - 1) {
                                        arr += "'" + item + "',"
                                    } else {
                                        arr += "'" + item + "'"
                                    }
                                })
                                ret +=
                                    encodeURIComponent(it) + '=' + '[' + arr + ']' + '&'
                            } else {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
                            }
                        }
                        return ret
                    }
                ]
            }).then((res) => {
                if (res.data.code == 200) {
                    var max = 0
                    if (res.data.data.length) {
                        res.data.data[0].value
                    } else {
                        this.$message({
                            message: '暂无数据',
                            type: 'warning'
                        });
                    }
                    this.mapData = res.data.data.map(item => {
                        if (item.value > max) {
                            max = item.value
                        }
                        return {
                            name: item.country,
                            value: item.value
                        }
                    })
                    this.myChart = this.$echarts.init(this.$refs.worldMap)
                    var option = {
                        backgroundColor: "#a4aec2",
                        title: {
                            left: 'center',
                            top: 'top'
                        },
                        // tooltip: {},
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: "rgba(255,255,255,0)",
                            formatter: (params) => {
                                var value = isNaN(params.value) ? 0 : params.value
                                var tipHtml =
                                    '<div id="tooltipBarId" style="width:120px;height: 60px;line-height:60px;background:#48546d; opacity: 0.85;border-radius: 12px;text-align:center;">'
                                    + params.name + ' : ' + value + '</div>';
                                // '<div id="tooltipBarId" style="width:345px;height: 194px;background:#48546d; opacity: 0.85;border-radius: 12px;"></div>';

                                return tipHtml;
                            }
                        },
                        grid: {
                            x: 50,
                            y: 120,
                            x2: 50,
                            y2: 340
                        },
                        visualMap: {
                            min: 0,
                            max: max,
                            text: [max, '0'],
                            realtime: false,
                            calculable: true,
                            inRange: {
                                color: ['#C1B8C2', '#FF3C26', '#FF3C27']
                            },
                            left: '2%'
                        },
                        series: [
                            {
                                name: '',
                                type: 'map',
                                mapType: 'world_old',
                                roam: true,
                                coordinateSystem: "geo",
                                // data: convertData(data),
                                rippleEffect: {
                                    period: 4, //动画时间，值越小速度越快
                                    brushType: "stroke", //波纹绘制方式 stroke, fill
                                    scale: 3, //波纹圆环最大限制，值越大波纹越大
                                },
                                symbolSize: function (val) {
                                    return val[2] / 200;
                                },
                                label: {
                                    normal: {
                                        formatter: "{b}",
                                        position: "right",
                                        show: false,
                                    },
                                    emphasis: {
                                        show: true,
                                    },
                                },
                                zoom: 1.1,
                                label: {
                                    emphasis: {
                                        show: true,
                                    },
                                },
                                center: this.coordinate,
                                layoutCenter: ["50%", "50%"], //地图位置
                                layoutSize: this.layoutSize,
                                roam: true,
                                itemStyle: {
                                    normal: {
                                        areaColor: "#bcc3d1",
                                        borderColor: "#75808f",
                                    },
                                    emphasis: {
                                        areaColor: "#ff3a25",
                                        opacity: 0.5,
                                    },
                                },

                                regions: [{
                                    name: this.selectCountry,
                                    itemStyle: {
                                        areaColor: '#d27474',
                                        color: '#ff3a25'
                                    }
                                }],
                                data: this.mapData
                            }
                        ]
                    };
                    this.myChart.setOption(option, true);
                    this.mapLoading = false;
                }
            });

        },
        /**
         * @author: jingyh
         * @description: 获取所有大洲
         * @param {*}
         */
        getAllContinent () {
            this.axios.get("/international/topic/continentList").then((res) => {
                if (res.data.code == 200) {
                    this.continentOptions = res.data.data
                }
            });
        },
        /**
         * @author: jingyh
         * @description: 获取国家或地区
         * @param {*} val 大洲名称
         */
        getCountry (val) {
            this.axios.get("/index/country/autoTip", {
                params: {
                    city: "",
                    continent: val || '',
                    countrySimpleZhName: "",
                    language: "",
                    source: "",
                },
            }).then((res) => {
                if (res.data.code == 200) {
                    this.countryOptions = res.data.data.name
                }
            });
        },
        /**
         * @author: jingyh
         * @description: 选中大洲变化
         * @param {*}
         */
        handleContinentChange (val) {
            this.countrySelected = ''
            this.getCountry(val)
        },
        /**
         * @author: jingyh
         * @description: 点击机构名称的搜索
         * @param {*}
         */
        handleSearchClick () {
            this.currentPage = 1;
            this.getCardList()
        },
        /**
         * @author: jingyh
         * @description: 卡片点击
         * @param {*}
         */
        toDetails (val) {
          this.$router.push({name:'organizationEN',query:{id:val}})
        }
    },
}
</script>
<style lang="less" scoped>
@import "../assets/css/PartnerAgencies/index.less";
.listTabs {
    position: relative;
}
.operating {
    overflow: hidden;
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 20px;
    .iconDiv {
        float: right;
    }
    .visualizationList {
        margin-right: 12px;
        margin-bottom: 12px;
    }
    .downloadNew {
        width: 22px;
        height: 22px;
        background: url("../assets/images/exchange/导出按钮-默认状态.png")
            no-repeat;
        background-size: 22px 22px;
        cursor: pointer;
        margin-right: 4px;

        &:hover {
            background: url("../assets/images/exchange/导出按钮-选中状态.png")
                no-repeat;
            background-size: 22px 22px;
        }
    }
}
.operating-card {
    overflow: hidden;
    z-index: 2;
    right: 10px;
    top: 0px;
    .iconDiv {
        float: right;
    }
    .visualizationList {
        margin-right: 12px;
        margin-bottom: 12px;
    }
}
/deep/ .cooperation-type {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #333;
    z-index: 2;
    margin-top: 20px;
    font-size: 16px;
    &-label {
        color: #545963;
    }
    .el-checkbox {
        color: #545963;
    }
    .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #fe3a25;
        border-color: #fe3a25;
    }
    // .el-checkbox__input.is-focus{
    //     border-color: #fe3a25;
    // }
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #111;
    }
    .el-checkbox__input.is-checked {
        .el-checkbox__inner::after {
            // border: 2px solid #fe3a25;
            border-color: #fe3a25;
            border-width: 2px;
        }
    }
    .el-checkbox__inner {
        height: 16px;
        width: 16px;
        background-color: transparent;
        border-color: #545963;
    }
    .el-checkbox__inner:hover {
        border-color: #545963;
    }
    .el-checkbox__label {
        font-size: 16px;
    }
}
/deep/ .cooperation-type-card {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 40px;
    font-size: 16px;
    .el-checkbox__inner {
        border-color: #545963;
    }
    .el-checkbox__inner:hover {
        border-color: #fe3a25;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #fe3a25;
        border-color: #fe3a25;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #111;
    }
    .el-checkbox__inner {
        height: 16px;
        width: 16px;
    }
    .el-checkbox__label {
        font-size: 16px;
    }
}
/deep/ .list-box {
    padding-top: 80px;
    height: 82%;
    th,
    td {
        background: #e1e5ec;
        border-color: #d3d6dd;
    }
    .ivu-table-body {
        background: #e1e5ec;
    }
    .search-result-table {
        height: 100%;
        overflow-y: scroll;
        border-left: 1px solid #d3d6dd;
        border-bottom: 1px solid #d3d6dd;
        border-top: 1px solid #d3d6dd;
        .region-col {
            .cell {
                padding-left: 260px;
            }
        }
    }
}
/deep/ .result-box {
    height: 100%;
    position: relative;
    .map-box {
        height: 100% !important;
    }
    .slider-box {
        width: 280px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        color: #191919;
        .el-slider {
            margin-bottom: 20px;
        }
        .el-slider__bar {
            background: #ff3a27;
            height: 3px;
        }
        .el-slider__runway {
            background: #7c8898;
            height: 1px;
        }
        .el-slider__button {
            border-color: #ff3a27;
        }
        .el-slider__stop {
            display: none;
        }
        .el-slider__marks {
            position: absolute;
            width: 100%;
            left: 0;
            top: -50px;
        }
        .el-slider__marks-text {
            color: #191919;
        }
        .desc {
            text-align: center;
            font-size: 16px;
        }
        .el-slider__button-wrapper {
            background-image: url("../assets/images/PartnerAgencies/游标.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 40% 50%;
            top: -18px;
            .el-slider__button {
                display: none;
            }
        }
    }
    .ivu-table-body.ivu-table-overflowY::-webkit-scrollbar-track {
        background: #d3d6dd;
    }
    .ivu-table-body.ivu-table-overflowY::-webkit-scrollbar-thumb {
        background: #adbacd;
    }
    .ivu-table-body::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .el-loading-spinner .path {
        stroke: #ff3a25;
    }

    .el-loading-spinner .el-loading-text {
        color: #ff3a25;
    }
}
.fr-reelCenter {
    padding-left: 40px;
}
.fr-reelCenter.newScrollbar {
    overflow: hidden;
}
.card-list-box {
    position: relative;
}
/deep/ .card-table-box {
    .ivu-table {
        width: 100%;
    }
    .el-table__body-wrapper::-webkit-scrollbar {
        width: 6px !important;
        height: 5px !important;
        /**/
    }
    .el-table__body-wrapper::-webkit-scrollbar-track {
        background: #d3d6dd !important;
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background: #ff3925 !important;
        /*background: #cfd9e3;*/
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
        background: #ff3925 !important;
    }

    .el-table__body-wrapper::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0) !important;
    }
}
.el-select-dropdown__item.selected {
    color: #ff3a25;
}
</style>
