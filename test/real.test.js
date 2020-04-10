/**
 * @jest-environment node
 */

import axios from "axios";
import qs from "qs";
import * as Fake from "./mock-data/fake.data";
import { Clients, Modes } from "../src/consts";
import FlexApi from "../src";

describe("Real client test suite", () => {
  const baseURL = "https://flexapi-mock-server.herokuapp.com";
  // const baseURL = "http://localhost:5000";

  describe("Real with Axios | GET requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("GET | empty config object", async () => {
      const resp = await api.get("/api/v1/users", {});
      expect(resp).toStrictEqual({
        users: [
          Fake.data.userTest0,
          Fake.data.userTest1,
          Fake.data.userTest2,
          Fake.data.userTest3,
        ],
      });
    }, 15000);

    it("GET | object with null config", async () => {
      const resp = await api.get("/api/v1/users");
      expect(resp).toStrictEqual({
        users: [
          Fake.data.userTest0,
          Fake.data.userTest1,
          Fake.data.userTest2,
          Fake.data.userTest3,
        ],
      });
    }, 15000);

    it("GET | throw with empty config object", async () => {
      await expect(api.get("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making a GET request"
      );
    }, 15000);

    it("GET | throw with null config object", async () => {
      await expect(api.get("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making a GET request"
      );
    }, 15000);

    it("GET | with params", async () => {
      const resp = await api.get("/api/v1/users-filter", {
        params: { uid: "0" },
      });
      expect(resp).toStrictEqual({ users: [Fake.data.userTest0] });
    }, 15000);

    it("GET | with array params", async () => {
      const resp = await api.get("/api/v1/users-filter", {
        params: { uid: [0, 1] },
      });
      expect(resp).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1],
      });
    }, 15000);
  });

  describe("Real with Axios | POST requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("POST | with body", async () => {
      const resp = await api.post("/api/v1/users/register", {
        body: { ...Fake.data.userTest4 },
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it("POST | throw with empty config object", async () => {
      await expect(api.post("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making a POST request"
      );
    });

    it("POST | throw with null config object", async () => {
      await expect(api.post("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making a POST request"
      );
    });
  });

  describe("Real with Axios | PUT requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("PUT | with body", async () => {
      const resp = await api.put("/api/v1/users/4", {
        body: { ...Fake.data.userTest4 },
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it("PUT | throw with empty config object", async () => {
      await expect(api.put("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making a PUT request"
      );
    });

    it("PUT | throw with null config object", async () => {
      await expect(api.put("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making a PUT request"
      );
    });
  });

  describe("Real with Axios | PATCH requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("PATCH | with body", async () => {
      const resp = await api.patch("/api/v1/users/4", {
        body: { ...Fake.data.userTest4 },
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it("PATCH | throw with empty config object", async () => {
      await expect(api.patch("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making a PATCH request"
      );
    });

    it("PATCH | throw with null config object", async () => {
      await expect(api.patch("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making a PATCH request"
      );
    });
  });

  describe("Real with Axios | DELETE requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("DELETE | with body", async () => {
      const resp = await api.delete("/api/v1/users/4");
      expect(resp).toStrictEqual({ message: "Success" });
    }, 15000);

    it("POST | register user call real endpoint", async () => {
      const resp = await api.post("/api/v1/users/register", {
        body: { ...Fake.data.userTest4 },
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest4 });
    }, 15000);

    it("DELETE | throw with empty config object", async () => {
      await expect(api.delete("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making a DELETE request"
      );
    });

    it("DELETE | throw with null config object", async () => {
      await expect(api.delete("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making a DELETE request"
      );
    });
  });

  describe("Real with Axios | HEAD requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("HEAD | with body", async () => {
      const resp = await api.head("/api/v1/users/status");
      expect(resp).toHaveProperty("content-length");
    }, 15000);

    it("HEAD | throw with empty config object", async () => {
      await expect(api.head("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making a HEAD request"
      );
    });

    it("HEAD | throw with null config object", async () => {
      await expect(api.head("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making a HEAD request"
      );
    });
  });

  describe("Real with Axios | OPTIONS requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.REAL,
        real: {
          client: Clients.AXIOS,
          axios: {
            instance: axios,
            bearerToken: null,
            baseURL: baseURL,
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: "repeat" }),
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("OPTIONS | with body", async () => {
      const resp = await api.options("/api/v1/users/4");
      expect(resp).toHaveProperty("access-control-allow-headers");
    }, 15000);

    it("OPTIONS | throw with empty config object", async () => {
      await expect(api.options("/api/v1/pathNotExisted", {})).rejects.toThrow(
        "Error occurred while making OPTIONS request"
      );
    });

    it("OPTIONS | throw with null config object", async () => {
      await expect(api.options("/api/v1/pathNotExisted")).rejects.toThrow(
        "Error occurred while making OPTIONS request"
      );
    });
  });
});
