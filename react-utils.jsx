// File: react-utils.jsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
  lazy
} from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';

// --- 3.1 useFetchWithCache Hook ---
const fetchCache = new Map();

export function useFetchWithCache(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (fetchCache.has(url)) {
      setData(fetchCache.get(url));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();
      fetchCache.set(url, json);
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(() => ({ data, error, loading }), [data, error, loading]);
}

// --- 3.2 Virtualized List ---
export const VirtualizedList = React.memo(({ items }) => {
  const Row = useCallback(({ index, style }) => (
    <div style={style} key={index}>
      {items[index]}
    </div>
  ), [items]);

  return (
    <List height={600} itemCount={items.length} itemSize={30} width={300}>
      {Row}
    </List>
  );
});

// --- 3.3 withErrorBoundary HoC ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    this.props.onRetry && this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <p>Something went wrong.</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function withErrorBoundary(Component, fallback, onRetry) {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary fallback={fallback} onRetry={onRetry}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// --- 4.1 Micro-Frontend Router Shell ---
const RemoteApp1 = lazy(() => import('remoteApp1/App'));
const RemoteApp2 = lazy(() => import('remoteApp2/App'));

function ShellRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/app1" element={<RemoteApp1 />} />
        <Route path="/app2" element={<RemoteApp2 />} />
        <Route path="*" element={<div>Home or 404</div>} />
      </Routes>
    </Suspense>
  );
}

export function MicroFrontendShell() {
  return (
    <Router>
      <ShellRoutes />
    </Router>
  );
}

// --- 4.2 SSR Hydration and Lazy Load Entry ---
const App = lazy(() => import('./App'));

if (typeof window !== 'undefined') {
  hydrateRoot(document.getElementById('root'), (
    <Suspense fallback={<div>Loading app...</div>}>
      <App />
    </Suspense>
  ));
}
