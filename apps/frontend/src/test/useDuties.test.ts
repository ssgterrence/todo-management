import { act, renderHook, waitFor } from "@testing-library/react";
import { useDuties } from "../hooks/useDuties";
import type { IDuty } from "../types";

jest.mock("../config/env", () => ({
  env: {
    apiUrl: "http://localhost:4001",
  },
}));

describe("useDuties", () => {
  const setFetchMock = (impl: typeof fetch) => {
    globalThis.fetch = impl;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setFetchMock(jest.fn() as unknown as typeof fetch);
  });

  it("initializes with empty duties and starts loading", () => {
    setFetchMock(
      jest.fn(() => new Promise<Response>(() => {})) as unknown as typeof fetch,
    );

    const { result } = renderHook(() => useDuties());

    expect(result.current.duties).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches duties successfully on mount", async () => {
    const mockDuties: IDuty[] = [
      { id: "1", title: "Test Duty 1" },
      { id: "2", title: "Test Duty 2" },
    ];

    setFetchMock(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ data: mockDuties }),
        } as unknown as Response),
      ) as unknown as typeof fetch,
    );

    const { result } = renderHook(() => useDuties());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.duties).toEqual(mockDuties);
    expect(result.current.error).toBeNull();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:4001/duties/list",
    );
  });

  it("sets error when response is not ok", async () => {
    setFetchMock(
      jest.fn(() =>
        Promise.resolve({ ok: false } as unknown as Response),
      ) as unknown as typeof fetch,
    );

    const { result } = renderHook(() => useDuties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.duties).toEqual([]);
    expect(result.current.error).toBe("failed to fetch duties");
  });

  it("sets error for thrown Error", async () => {
    setFetchMock(
      jest.fn(() =>
        Promise.reject(new Error("Network error")),
      ) as unknown as typeof fetch,
    );

    const { result } = renderHook(() => useDuties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
  });

  it("refetch updates duties", async () => {
    const initialDuties: IDuty[] = [{ id: "1", title: "Initial Duty" }];
    const updatedDuties: IDuty[] = [
      { id: "1", title: "Initial Duty" },
      { id: "2", title: "New Duty" },
    ];

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: initialDuties }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: updatedDuties }),
      });

    setFetchMock(fetchMock as unknown as typeof fetch);

    const { result } = renderHook(() => useDuties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.duties).toEqual(initialDuties);

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.duties).toEqual(updatedDuties);
    });
  });
});
