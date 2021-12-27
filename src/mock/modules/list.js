export const jobList = [
  {
    id: 1,
    name: "管理",
  },
  {
    id: 2,
    name: "设计",
  },
  {
    id: 3,
    name: "开发",
  },
  {
    id: 8,
    name: "其他",
  },
];

export const professionList = [
  {
    id: 1,
    name: "建筑设计",
  },
  {
    id: 2,
    name: "网页设计",
  },
  {
    id: 3,
    name: "UI设计",
  },
  {
    id: 4,
    name: "WEB前端开发",
  },
  {
    id: 5,
    name: ".NET开发",
  },
  {
    id: 6,
    name: "JAVA开发",
  },
  {
    id: 7,
    name: "PHP开发",
  },
  {
    id: 8,
    name: "其他专业",
  },
];

export default [
  {
    url: "/api/list/job",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: jobList,
      };
    },
  },
  {
    url: "/api/list/profession",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: professionList,
      };
    },
  },
];
