/**
 * @jest-environment node
 */

import * as Fake from "./mock-data/fake.data";
import FlexApi, { Modes, DelayInterval } from "..";
import { ErrorMessages } from "../src/consts";

describe("Fake modes test suite", () => {
  describe("Fake | GET requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users": Fake.getAllUsersHandler,
            "/api/v1/users/1": Fake.getUserByIdHandler,
            "/api/v1/users?uid=0": Fake.getUserByIdHandler,
            "/api/v1/users?uid=0&uid=1": Fake.getUsersByIdsHandler,
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
        users: [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2],
      });
    });

    it("GET | null config object", async () => {
      const resp = await api.get("/api/v1/users");
      expect(resp).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2],
      });
    });

    it("GET | throw with empty config object", async () => {
      await expect(api.get("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("GET | throw with null config object", async () => {
      await expect(api.get("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("GET | with params", async () => {
      const resp = await api.get("/api/v1/users", {
        params: { uid: "0" },
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.userTest0 });
    });

    it("GET | with array params", async () => {
      const resp = await api.get("/api/v1/users", {
        params: { uid: ["0", "1"] },
      });
      expect(resp).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1],
      });
    });
  });

  describe("Fake | POST requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/register": Fake.registerUserHandler,
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
    });

    it("POST | throw with empty config object", async () => {
      await expect(api.post("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("POST | throw with null config object", async () => {
      await expect(api.post("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("Fake | PUT requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/4": Fake.registerUserHandler,
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
    });

    it("PUT | throw with empty config object", async () => {
      await expect(api.put("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("PUT | throw with null config object", async () => {
      await expect(api.put("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("Fake | PATCH requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/patchUser": Fake.patchUserInfoHandler,
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
      const resp = await api.post("/api/v1/users/patchUser", {
        body: { lastname: "Test Patch", fullname: "Dev 4 Test Patch" },
      });
      expect(resp).toStrictEqual({ userDetails: Fake.data.patchUserTest4 });
    });

    it("PATCH | throw with empty config object", async () => {
      await expect(api.patch("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("PATCH | throw with null config object", async () => {
      await expect(api.patch("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("Fake | DELETE requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/4": Fake.deleteUserInfoHandler,
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
      const resp = await api.delete("/api/v1/users/4", {
        body: { ...Fake.data.userTest4 },
      });
      expect(resp).toStrictEqual({ message: "Success" });
    });

    it("DELETE | throw with empty config object", async () => {
      await expect(api.delete("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("DELETE | throw with null config object", async () => {
      await expect(api.delete("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("Fake | HEAD requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/status": Fake.statusUserHandler,
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
      expect(resp).toBeUndefined();
    });

    it("HEAD | throw with empty config object", async () => {
      await expect(api.head("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("HEAD | throw with null config object", async () => {
      await expect(api.head("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("Fake | OPTIONS requests", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/4": Fake.optionsHandler,
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
      expect(resp).toBeUndefined();
    });

    it("OPTIONS | throw with empty config object", async () => {
      await expect(api.options("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("OPTIONS | throw with null config object", async () => {
      await expect(api.options("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });
});
