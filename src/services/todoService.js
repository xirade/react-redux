import httpService from "./httpService";
import faker from "@faker-js/faker";

const todoEndpoint = "todos/";

const todoService = {
  fetch: async () => {
    const { data } = await httpService.get(todoEndpoint, {
      params: {
        _page: 1,
        _limit: 10
      }
    });

    return data;
  },
  post: async () => {
    const { data } = await httpService.post(todoEndpoint, {
      title: faker.random.words(4),
      completed: false
    });
    return data;
  }
};

export default todoService;
