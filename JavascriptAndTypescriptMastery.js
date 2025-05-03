

// --- 1.1 schedule(fn, delay) with rate limit ---
type Task = { fn: () => void; time: number };

export function createScheduler(rateLimit: number) {
  let queue: Task[] = [];
  let executing: number[] = [];

  function cleanOldExecutions() {
    const now = Date.now();
    executing = executing.filter(t => now - t < 1000);
  }

  function tryExecute() {
    cleanOldExecutions();
    while (queue.length > 0 && executing.length < rateLimit) {
      const task = queue.shift()!;
      const now = Date.now();
      const delay = Math.max(0, task.time - now);

      setTimeout(() => {
        cleanOldExecutions();
        if (executing.length < rateLimit) {
          executing.push(Date.now());
          task.fn();
          tryExecute();
        } else {
          queue.unshift(task);
        }
      }, delay);
    }
  }

  return function schedule(fn: () => void, delay: number) {
    const time = Date.now() + delay;
    queue.push({ fn, time });
    tryExecute();
  };
}

// --- 1.2 RequiredKeys<T> ---
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];

export function validateRequiredKeys<T>(obj: T): RequiredKeys<T>[] {
  const keys = Object.keys(obj) as (keyof T)[];
  const required: RequiredKeys<T>[] = [];

  for (const key of keys) {
    if (obj[key] !== undefined) {
      required.push(key as RequiredKeys<T>);
    }
  }
  return required;
}

// --- 1.3 compose(fns: Function[]) ---
type MaybePromise<T> = T | Promise<T>;

type AnyFunc = (...args: any[]) => any;

export function compose<T extends AnyFunc[]>(...fns: T): (...args: Parameters<T[0]>) => MaybePromise<ReturnType<T[number]>> {
  return async function composed(...args: any[]): Promise<any> {
    let result = await fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = await fns[i](result);
    }
    return result;
  };
}
