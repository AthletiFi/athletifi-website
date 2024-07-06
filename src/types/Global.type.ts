export {};

declare global {
  interface HTMLVideoElement {
    pauseListenerAdded?: boolean;
  }
}
