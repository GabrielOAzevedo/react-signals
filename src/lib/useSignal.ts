import { useState } from "react";

export function useSignal<T extends object>(initialValue: T) {
  const [intrinsicValue, setIntrinsicValue] = useState<T>(initialValue);

  const watcher = {
    set: (obj: T, prop: string | symbol, value: any) => {
      const key = prop in obj && prop;
      if (!key) {
        throw new Error(`Invalid property: ${String(prop)}`);
      }
      obj[key as keyof typeof obj] = value;
      const newObj = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
      );
      setIntrinsicValue(newObj);
      return true;
    },
  };

  const proxy = new Proxy(intrinsicValue, watcher);

  return proxy;
}
