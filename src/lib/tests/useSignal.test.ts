import { renderHook } from "@testing-library/react";
import { Counter } from "../../Model/Counter";
import { useSignal } from "../useSignal";

describe("useSignal", () => {
  it("should return a signal", () => {
    const { result } = renderHook(() => useSignal(new Counter()));
    expect(result.current).toBeInstanceOf(Counter);
  });
});
