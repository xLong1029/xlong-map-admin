import { handleResponse } from "./../mock-handle.js";

const utilList =[
  {
    title: "常用工具",
    children: [
      {
        component: "MeasurePanel",
        classStyles: "iconfont icon-celianggongju",
        utilName: "量算",
        utilActive: false,
        eventSuffix: "Measure",
        panelID: null,
        enable2D: true,
        enable3D: true,
        fullScreen: false,
      },
      {
        component: "DrawPanel",
        classStyles: "iconfont icon-huizhi",
        utilName: "绘制",
        utilActive: false,
        eventSuffix: "Draw",
        panelID: "drawPanel",
        enable2D: true,
        enable3D: true,
        fullScreen: false,
      },
      {
        component: "ScreenshotPanel",
        classStyles: "iconfont icon-jietu",
        utilName: "截图",
        utilActive: false,
        eventSuffix: "ScreenShot",
        panelID: null,
        enable2D: true,
        enable3D: true,
        fullScreen: false,
      },
      {
        component: "LocatePanel",
        classStyles: "iconfont icon-locate",
        utilName: "定位",
        utilActive: false,
        eventSuffix: "Locate",
        panelID: "locatePanel",
        enable2D: true,
        enable3D: true,
        fullScreen: false,
      },
    ],
  },
  {
    title: "三维工具",
    children: [
      {
        component: "LineOfSightPanel",
        classStyles: "iconfont icon-yanjing",
        utilName: "视线",
        utilActive: false,
        eventSuffix: "LineOfSight",
        panelID: "lineOfSightPanel",
        enable2D: false,
        enable3D: true,
        fullScreen: false,
      },
      {
        component: "SlicePanel",
        classStyles: "iconfont icon-poumianfenxi",
        utilName: "剖切",
        utilActive: false,
        eventSuffix: "Slice",
        panelID: "slicePanel",
        enable2D: false,
        enable3D: true,
        fullScreen: false,
      },
      {
        component: "ElevationProfilePanel",
        classStyles: "iconfont icon-poumianfenxi1",
        utilName: "高程剖面",
        utilActive: false,
        eventSuffix: "ElevationProfile",
        panelID: "elevationProfilePanel",
        enable2D: false,
        enable3D: true,
        fullScreen: false,
      },
      {
        component: "DayLightPanel",
        classStyles: "iconfont icon-rizhao",
        utilName: "日照",
        utilActive: false,
        eventSuffix: "DayLight",
        panelID: "dayLightPanel",
        enable2D: false,
        enable3D: true,
        fullScreen: false,
      },
    ],
  },
  {
    title: "其他",
    children: [
      {
        component: "SwipePanel",
        classStyles: "iconfont icon-swipe",
        utilName: "卷帘",
        utilActive: false,
        eventSuffix: "Swipe",
        panelID: "swipePanel",
        enable2D: true,
        enable3D: true,
        fullScreen: true,
      },
      {
        component: "SplitScreen",
        classStyles: "iconfont icon-split",
        utilName: "分屏",
        utilActive: false,
        eventSuffix: null,
        panelID: null,
        enable2D: true,
        enable3D: true,
        fullScreen: true,
      },
      {
        component: "BookmarksPanel",
        classStyles: "iconfont icon-bookmark",
        utilName: "书签",
        eventSuffix: "Bookmarks",
        panelID: "bookmarksPanel",
        enable2D: true,
        enable3D: true,
        fullScreen: false,
      },
    ],
  },
]

export default [
  {
    url: "/api/map/util-list",
    method: "get",
    response: () => handleResponse(200, "success", utilList)
  },
];
