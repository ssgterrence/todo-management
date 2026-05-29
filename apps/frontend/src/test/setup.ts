import "@testing-library/jest-dom";
(
  globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

if (typeof globalThis.MessageChannel === "undefined") {
  type MinimalMessagePort = {
    onmessage: ((event: { data: unknown }) => void) | null;
    postMessage: (data: unknown) => void;
  };

  class MessageChannelPolyfill {
    port1: MinimalMessagePort;
    port2: MinimalMessagePort;

    constructor() {
      const port1: MinimalMessagePort = {
        onmessage: null,
        postMessage: (data: unknown) => {
          setTimeout(() => port2.onmessage?.({ data }), 0);
        },
      };

      const port2: MinimalMessagePort = {
        onmessage: null,
        postMessage: (data: unknown) => {
          setTimeout(() => port1.onmessage?.({ data }), 0);
        },
      };

      this.port1 = port1;
      this.port2 = port2;
    }
  }

  globalThis.MessageChannel =
    MessageChannelPolyfill as unknown as typeof MessageChannel;
}

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverPolyfill {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver =
    ResizeObserverPolyfill as unknown as typeof ResizeObserver;
}

if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = () => {};
}
