import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const categories = [
  {
    title: 'State & Data',
    count: 13,
    description: 'Toggle, disclosure, counters, lists, maps, sets, storage, and more.',
    link: '/docs/hooks/state-data/use-toggle',
  },
  {
    title: 'Values & Memoization',
    count: 8,
    description: 'Debounce, throttle, previous values, refs, and constants.',
    link: '/docs/hooks/values-memoization/use-debounce',
  },
  {
    title: 'DOM & Browser',
    count: 19,
    description: 'Click outside, hover, keyboard, gestures, scroll, focus, and observers.',
    link: '/docs/hooks/dom-browser/use-click-outside',
  },
  {
    title: 'Timers & Lifecycle',
    count: 9,
    description: 'Intervals, timeouts, countdowns, stopwatches, and mount lifecycle.',
    link: '/docs/hooks/timers-lifecycle/use-interval',
  },
  {
    title: 'Async & Network',
    count: 9,
    description: 'Fetch, async execution, WebSocket, SSE, polling, and retry.',
    link: '/docs/hooks/async-network/use-fetch',
  },
  {
    title: 'Browser APIs',
    count: 12,
    description: 'Media queries, dark mode, clipboard, online status, and visibility.',
    link: '/docs/hooks/browser-apis/use-media-query',
  },
  {
    title: 'Layout & UI',
    count: 5,
    description: 'Sticky headers, virtual lists, infinite scroll, collapse, and steps.',
    link: '/docs/hooks/layout-ui/use-sticky-header',
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container">
        <h1 className="hero__title" style={{ color: '#fff' }}>
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle" style={{ color: '#e0e0e0' }}>
          {siteConfig.tagline}
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageCategories() {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="install-block">
          <code>npm install @blacksmith-ui/hooks</code>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="category-card">
                <h3>
                  {cat.title}{' '}
                  <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                    ({cat.count})
                  </span>
                </h3>
                <p>{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentation for @blacksmith-ui/hooks — 75 production-ready React hooks"
    >
      <HomepageHeader />
      <main>
        <HomepageCategories />
      </main>
    </Layout>
  );
}
