import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'

// 人才
import TopicIndex from "../components/person/topicIndex"
import IdentityIndex from "../components/person/IdentityIndex"
import PersonDetails from "../components/person/PersonDetails"

// 人员交流
import exchange from '../components/exchange/index'
import mutualVisits from '../components/exchange/mutualVisits'
import importVisit from '../components/exchange/importVisit'
import exportVisit from '../components/exchange/exportVisit'
import domesticPersonnelInfor from '../components/exchange/domesticPersonnelInfor'

//合作论文
import paperDetails from '../components/paper/paperDetails'
import analysis from '../components/paper/analysis'
import inquire from '../components/paper/inquire'

// 合作项目
import Partner from '../components/project/Partner'
import CooperationProjects from '../components/project/projects'
import IntelligenceProject from '../components/project/intelligenceProject'


// 应用助手
import SituationalBriefing from '../components/appAsst/briefing'
import DataSummary from '../components/appAsst/summary'
import CooperationStatistics from '../components/appAsst/statistics'
import StatisticalYearbook from '../components/appAsst/yearbook'
import StatisticalBulletin from '../components/appAsst/bulletin'

// 合作网络
// import CooperationNetwork from '../components/decision/cooperationNetwork'

// 机构主页
import organizationZH from '../components/org/orgDetailsZH'
import organizationEN from '../components/org/orgDetailsEN'

//团队紧密度
import decision from '../components/decision/decision'
// 伙伴机构
const PartnerAgencies = ()=>import("../pages/PartnerAgencies.vue")


// 首页搜索页
const searchPage = ()=>import("../components/searchPage")

// 系统管理

// 用户权限管理
import authorityManagement from '../components/administration/system/authority-management'
// 用户权限分配
import permissionAssignment from '../components/administration/system/permission-assignment'

// 用户数据管理
import dataManagement from '../components/administration/system/data-management'


// 个人中心
import favorites from '../components/personalCenter/favorites'

//  安全审计
import auditManagement from '../components/administration/audit/audit-management';
import systemEnvironment  from '../components/administration/audit/system-environment';




Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'Main',
    component: Main,

  },
  // 按专题
  {
    path: "/topicIndex",
    name: "topicIndex",
    component: TopicIndex,
  },
  // 按身份
  {
    path: "/identityIndex",
    name: "identityIndex",
    component: IdentityIndex,
  },
  // 国际人才详情
  {
    path: '/personDetails',
    name: 'PersonDetails',
    component: PersonDetails,
  },
  //
  {
    path: '/exchange',
    name: 'exchange',
    component: exchange,
  },
  // 总计
   {
    path: '/mutualVisits',
    name: 'mutualVisits',
    component: mutualVisits,
  },
  // 出访
  {
    path: '/importVisit',
    name: 'importVisit',
    component: importVisit,
  },
  // 来访
  {
    path: '/exportVisit',
    name: 'exportVisit',
    component: exportVisit,
  },
  // 人员交流详情
  {
    path: '/domesticPersonnelInfor',
    name: 'domesticPersonnelInfor',
    component: domesticPersonnelInfor,
  },
  // 论文详情
  {
    path: '/paperDetails',
    name: 'paperDetails',
    component: paperDetails,
  },
  //论文统计与分析
  {
    path: '/analysis',
    name: 'analysis',
    component: analysis,
  },
  // 论文查询
  {
    path: '/inquire',
    name: 'inquire',
    component: inquire,
  },
  //  应用助手-态势简报
  {
    path: '/briefing',
    name: 'situationalBriefing',
    component: SituationalBriefing,
  },
  // 应用助手-数据摘要
  {
    path: '/summary',
    name: 'dataSummary',
    component: DataSummary,
  },
  // 应用助手-统计手册
  {
    path: '/statistics',
    name: 'cooperationStatistics',
    component: CooperationStatistics,
  },
  // 应用助手-统计年鉴
  {
    path: '/yearbook',
    name: 'statisticalYearbook',
    component: StatisticalYearbook,
  },
  // 应用助手-统计公报
  {
    path: "/bulletin",
    name: "statisticalBulletin",
    component: StatisticalBulletin
  },
  // 合作项目-国际伙伴计划
  {
    path: "/partner",
    name: "Partner",
    component: Partner,
  },
  // 合作项目-科技部国际合作项目
  {
    path: "/projects",
    name: "CooperationProjects",
    component: CooperationProjects,
  },
  // 合作项目-外专局引智项目
  {
    path: "/intelligenceProject",
    name: "IntelligenceProject",
    component: IntelligenceProject,
  },
  //伙伴机构
  {
    path: "/PartnerAgencies",
    name: "PartnerAgencies",
    component: PartnerAgencies,
  },
  // 综合查询详情
  {
    path: "/searchPage",
    name: "searchPage",
    component: searchPage
  },
  // 国内机构详情
  {
    path: "/organizationZH",
    name: "organizationZH",
    component: organizationZH
  },
  //  国外机构详情
  {
    path: "/organizationEN",
    name: "organizationEN",
    component: organizationEN
  },
  // 决策支撑
  {
    path: "/decision",
    name: "decision",
    component: decision
  },
  // 系统管理-用户权限管理
  {
    path: "/authority-management",
    name: "authority-management",
    component: authorityManagement
  },
  // 系统管理-用户权限管理
  {
    path: "/permission-assignment",
    name: "permission-assignment",
    component: permissionAssignment
  },
  // 系统管理-数据管理
  {
    path: "/system-environment",
    name: "system-environment",
    component: dataManagement
  },
  // 个人中心
  {
    path: "/favorites",
    name: "favorites",
    component: favorites
  },
  // 环境配置
  {
    path: "/system-environment",
    name: "system-environment",
    component: systemEnvironment
  },
  // 系统日志
  {
    path: "/audit-management",
    name: "audit-management",
    component: auditManagement
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
