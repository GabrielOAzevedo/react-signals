import { act, renderHook } from "@testing-library/react";
import { Counter } from "../../Model/Counter";
import { useSignal } from "../useSignal";

describe("useSignal", () => {
  it("should return a signal", () => {
    const { result } = renderHook(() => useSignal(new Counter()));
    expect(result.current).toBeInstanceOf(Counter);
  });

  it("should update the proxy value when the signal changes", () => {
    const { result } = renderHook(() => useSignal(new Counter()));
    const counter = result.current;
    const value = counter.getCount();
    act(() => {
      counter.increment();
    });
    expect(result.current.getCount()).toEqual(value + 1);
  });

  it("should throw an error when trying to set an invalid property", () => {
    const fakeCounter: any = {
      count: 2,
    };
    const { result } = renderHook(() => useSignal(fakeCounter));
    const counter = result.current;
    expect(() => {
      act(() => {
        counter["p"] = 2;
      });
    }).toThrowError("Invalid property: p");
  });
});
