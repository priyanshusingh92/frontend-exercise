# frontend-exercise
Frontend Work Experience Responses:
1.	Designed and implemented high-performance web applications using React and Angular, optimizing rendering speed, load times, and memory usage.
2.	Leveraged server-side rendering (SSR) and hydration techniques to improve SEO and reduce initial load times for web applications.
3.	Applied advanced bundle optimization strategies, including lazy loading, code splitting, and tree shaking, to reduce JS payload size and improve Core Web Vitals.
4.	Utilized React Profiler, React.memo, and virtualized lists to optimize frontend performance, focusing on minimizing re-renders and ensuring smooth user experiences.

Front End Coding Exercises:
1. JavaScript & TypeScript Mastery
1.1 Async Programming & Event Loop
•	Task: 
o	Implement a function schedule(fn, delay) that:
o	Ensures fn is executed after a given delay while respecting a rate limit: no more than N executions in a rolling 1-second window.
•	Focus:
Async execution, event loop behavior, and Promises. Demonstrate understanding of task/microtask queues and rate-limiting concepts.
1.2 Required Keys Utility Type
•	Task:
Create a utility type RequiredKeys<T> that extracts only the required keys from a given object type. Then implement a function that accepts an object of type T and ensures all RequiredKeys<T> are present and correctly typed.
•	Focus: Mapped types, conditional types, type-level computation.

1.3 Function Composition & Closures
•	Task:
Implement a function composition utility compose(fns: Function[]) that chains multiple functions (either synchronous or asynchronous). The composed function should return a new function where the output of one function becomes the input to the next.
•	Focus: Closures, functional composition, type inference, generics, understanding of synchronous and asynchronous function chains.
2. Angular-Focused Exercises
2.1 Change Detection, OnPush & Lifecycle Hooks
•	Task: Given a parent and child Angular component, implement:
o	The child with ChangeDetectionStrategy.OnPush
o	Track and log change detection runs
o	Demonstrate how ngOnChanges is triggered when parent input changes
•	Then:
o	Optimize unnecessary renders using trackBy, pure pipes, and input immutability
•	Focus: Change detection, OnPush, immutability, lifecycle hooks
2.2 NgRx (or NGXS) State Handling
•	Task: Create a state management flow for a shopping cart using NgRx or NGXS:
o	Implement actions to add/remove/update cart items.
o	Use selectors to derive total price and item count
o	Persist the cart state to localStorage.
•	Focus: NgRx/NGXS patterns, selectors, and side effects. 
•	Bonus: Implement lazy-loaded modules with isolated state.












3. React-Focused Exercises
3.1 Custom Hooks & useMemo/useCallback
•	Task: Build a custom hook useFetchWithCache(url) that:
o	Caches fetched results in memory
o	Avoids re-fetching if the same URL is passed again
o	Uses useCallback and useMemo to avoid unnecessary re-renders
•	Focus: Hook composition, memoization, cache handling, performance tuning
3.2 Performance Optimization & Virtualized Lists
•	Task: Render a list of 10,000 items using a virtualization strategy (e.g., react-window):
o	Profile the performance using React Profiler before and after optimization.
o	Optimize unnecessary re-renders using React.memo and useCallback.
•	Focus: Virtualization, re-render minimization, profiling
3.3 Higher-Order Components (HoC)
•	Task: Create a Higher-Order Component withErrorBoundary that wraps any component and catches rendering errors.
•	Add fallback UI and optional retry mechanism.
•	Focus: HoC patterns, error boundaries, reusable patterns in React











4. End-to-End Frontend Integration
4.1 Micro-Frontend Router Strategy
•	Task:
o	Design a micro-frontend router strategy (can be Angular or React).
o	Each micro-frontend should have its own route and be loaded dynamically at runtime.
o	Implement a shell app that lazy-loads remote apps based on route.
•	Focus: Dynamic routing, lazy-loading, inter-app communication
4.2 Bundle Optimization & SSR Hydration
•	Task: Configure a simple React or Angular app with:
o	Code splitting using dynamic imports.
o	Lazy loading for routes/components.
o	SSR hydration for the first page load.
•	Focus: Bundle optimization, SSR hydration, lazy loading, and code-splitting.















5. Helm & CI Integration
5.1 Helm Chart for SPA
•	Task:
o	Write a Helm chart for deploying a frontend SPA.
o	Include service.enabled, ingress.enabled, and extraEnvVars from values.yaml.
o	Use conditionals and named templates in _helpers.tpl
•	Focus: Helm templating, conditionals, DRY templates, deployment config
5.2 Helm Hooks for Frontend Cache Busting
•	Task: Write a Helm post-upgrade hook that:
o	Sends a request to Cloudflare/AWS to purge CDN cache or update an S3 website deployment with cache-busted filenames.
•	Include helm.sh/hook, hook-weight, and hook-delete-policy
•	Focus: Deployment automation, hooks, CDN/cache invalidation

