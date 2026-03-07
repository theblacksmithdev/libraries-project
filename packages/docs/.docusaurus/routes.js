import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '75f'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'feb'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '95a'),
            routes: [
              {
                path: '/docs/hooks/async-network/use-abort-controller',
                component: ComponentCreator('/docs/hooks/async-network/use-abort-controller', '04a'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-async',
                component: ComponentCreator('/docs/hooks/async-network/use-async', '9aa'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-fetch',
                component: ComponentCreator('/docs/hooks/async-network/use-fetch', '40c'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-polling',
                component: ComponentCreator('/docs/hooks/async-network/use-polling', 'b50'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-retry',
                component: ComponentCreator('/docs/hooks/async-network/use-retry', 'e0e'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-script',
                component: ComponentCreator('/docs/hooks/async-network/use-script', '1ed'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-search',
                component: ComponentCreator('/docs/hooks/async-network/use-search', '77f'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-sse',
                component: ComponentCreator('/docs/hooks/async-network/use-sse', 'cfb'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/async-network/use-web-socket',
                component: ComponentCreator('/docs/hooks/async-network/use-web-socket', '1d4'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-breakpoint',
                component: ComponentCreator('/docs/hooks/browser-apis/use-breakpoint', '95c'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-color-scheme',
                component: ComponentCreator('/docs/hooks/browser-apis/use-color-scheme', '90d'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-copy-to-clipboard',
                component: ComponentCreator('/docs/hooks/browser-apis/use-copy-to-clipboard', '0fb'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-dark-mode',
                component: ComponentCreator('/docs/hooks/browser-apis/use-dark-mode', '6e6'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-favicon',
                component: ComponentCreator('/docs/hooks/browser-apis/use-favicon', '6f0'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-is-client',
                component: ComponentCreator('/docs/hooks/browser-apis/use-is-client', '643'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-media-query',
                component: ComponentCreator('/docs/hooks/browser-apis/use-media-query', 'f62'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-online',
                component: ComponentCreator('/docs/hooks/browser-apis/use-online', 'cae'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-page-leave',
                component: ComponentCreator('/docs/hooks/browser-apis/use-page-leave', 'fb8'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-page-visibility',
                component: ComponentCreator('/docs/hooks/browser-apis/use-page-visibility', '1b2'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-reduced-motion',
                component: ComponentCreator('/docs/hooks/browser-apis/use-reduced-motion', 'a82'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/browser-apis/use-window-size',
                component: ComponentCreator('/docs/hooks/browser-apis/use-window-size', '8c7'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-bounding-client-rect',
                component: ComponentCreator('/docs/hooks/dom-browser/use-bounding-client-rect', '2f3'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-click-outside',
                component: ComponentCreator('/docs/hooks/dom-browser/use-click-outside', '53f'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-drag',
                component: ComponentCreator('/docs/hooks/dom-browser/use-drag', '141'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-element-size',
                component: ComponentCreator('/docs/hooks/dom-browser/use-element-size', 'bfb'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-element-visibility',
                component: ComponentCreator('/docs/hooks/dom-browser/use-element-visibility', '61d'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-event-listener',
                component: ComponentCreator('/docs/hooks/dom-browser/use-event-listener', '9a7'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-focus-trap',
                component: ComponentCreator('/docs/hooks/dom-browser/use-focus-trap', '001'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-focus-within',
                component: ComponentCreator('/docs/hooks/dom-browser/use-focus-within', 'bda'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-fullscreen',
                component: ComponentCreator('/docs/hooks/dom-browser/use-fullscreen', '0f7'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-hover',
                component: ComponentCreator('/docs/hooks/dom-browser/use-hover', '9d4'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-intersection-observer',
                component: ComponentCreator('/docs/hooks/dom-browser/use-intersection-observer', '576'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-key-combo',
                component: ComponentCreator('/docs/hooks/dom-browser/use-key-combo', 'eb9'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-key-press',
                component: ComponentCreator('/docs/hooks/dom-browser/use-key-press', '1e5'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-long-press',
                component: ComponentCreator('/docs/hooks/dom-browser/use-long-press', '368'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-mutation-observer',
                component: ComponentCreator('/docs/hooks/dom-browser/use-mutation-observer', '287'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-scroll-lock',
                component: ComponentCreator('/docs/hooks/dom-browser/use-scroll-lock', '139'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-scroll-position',
                component: ComponentCreator('/docs/hooks/dom-browser/use-scroll-position', 'ded'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-swipe',
                component: ComponentCreator('/docs/hooks/dom-browser/use-swipe', 'f8e'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/dom-browser/use-text-selection',
                component: ComponentCreator('/docs/hooks/dom-browser/use-text-selection', '77e'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/getting-started',
                component: ComponentCreator('/docs/hooks/getting-started', 'af4'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/layout-ui/use-collapse',
                component: ComponentCreator('/docs/hooks/layout-ui/use-collapse', '17a'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/layout-ui/use-infinite-scroll',
                component: ComponentCreator('/docs/hooks/layout-ui/use-infinite-scroll', '961'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/layout-ui/use-steps',
                component: ComponentCreator('/docs/hooks/layout-ui/use-steps', '3c7'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/layout-ui/use-sticky-header',
                component: ComponentCreator('/docs/hooks/layout-ui/use-sticky-header', 'ca7'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/layout-ui/use-virtual-list',
                component: ComponentCreator('/docs/hooks/layout-ui/use-virtual-list', 'd8c'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-counter',
                component: ComponentCreator('/docs/hooks/state-data/use-counter', '1db'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-default',
                component: ComponentCreator('/docs/hooks/state-data/use-default', '780'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-disclosure',
                component: ComponentCreator('/docs/hooks/state-data/use-disclosure', '996'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-history-state',
                component: ComponentCreator('/docs/hooks/state-data/use-history-state', '928'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-list',
                component: ComponentCreator('/docs/hooks/state-data/use-list', 'f76'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-local-storage',
                component: ComponentCreator('/docs/hooks/state-data/use-local-storage', '032'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-map',
                component: ComponentCreator('/docs/hooks/state-data/use-map', '718'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-queue',
                component: ComponentCreator('/docs/hooks/state-data/use-queue', 'df2'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-session-storage',
                component: ComponentCreator('/docs/hooks/state-data/use-session-storage', '64d'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-set',
                component: ComponentCreator('/docs/hooks/state-data/use-set', 'b14'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-stack',
                component: ComponentCreator('/docs/hooks/state-data/use-stack', '180'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-toggle',
                component: ComponentCreator('/docs/hooks/state-data/use-toggle', '5d5'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/state-data/use-uncontrolled',
                component: ComponentCreator('/docs/hooks/state-data/use-uncontrolled', '86a'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-countdown',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-countdown', '941'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-idle-timer',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-idle-timer', 'c2a'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-interval',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-interval', '0d8'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-is-first-render',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-is-first-render', 'f2c'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-is-mounted',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-is-mounted', 'de5'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-isomorphic-layout-effect',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-isomorphic-layout-effect', '29b'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-stopwatch',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-stopwatch', '406'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-timeout',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-timeout', 'c66'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/timers-lifecycle/use-update-effect',
                component: ComponentCreator('/docs/hooks/timers-lifecycle/use-update-effect', 'e37'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-const',
                component: ComponentCreator('/docs/hooks/values-memoization/use-const', 'bec'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-debounce',
                component: ComponentCreator('/docs/hooks/values-memoization/use-debounce', '277'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-debounced-callback',
                component: ComponentCreator('/docs/hooks/values-memoization/use-debounced-callback', 'a58'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-latest',
                component: ComponentCreator('/docs/hooks/values-memoization/use-latest', '808'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-previous',
                component: ComponentCreator('/docs/hooks/values-memoization/use-previous', 'ef7'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-synced-ref',
                component: ComponentCreator('/docs/hooks/values-memoization/use-synced-ref', 'edf'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-throttle',
                component: ComponentCreator('/docs/hooks/values-memoization/use-throttle', '8ba'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/hooks/values-memoization/use-throttled-callback',
                component: ComponentCreator('/docs/hooks/values-memoization/use-throttled-callback', '17c'),
                exact: true,
                sidebar: "hooksSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'cc0'),
                exact: true,
                sidebar: "hooksSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
