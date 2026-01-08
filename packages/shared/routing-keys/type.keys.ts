import {
  DOMAIN_EVENT_KEYS,
  DOMAIN_SIGNAL_KEYS,
  SIGNAL_KEYS,
  EVENT_KEYS,
  SOCKET_EVENT_KEYS,
  SOCKET_SIGNAL_KEYS
} from "./label.keys";

export type DomainEventKey = typeof DOMAIN_EVENT_KEYS[keyof typeof DOMAIN_EVENT_KEYS]
export type DomainSignalKey = typeof DOMAIN_SIGNAL_KEYS[keyof typeof DOMAIN_SIGNAL_KEYS]
export type SignalKey = typeof SIGNAL_KEYS[keyof typeof SIGNAL_KEYS]
export type EventKey = typeof EVENT_KEYS[keyof typeof EVENT_KEYS]
export type SocketEventKey = typeof SOCKET_EVENT_KEYS[keyof typeof SOCKET_EVENT_KEYS]
export type SocketSignalKey = typeof SOCKET_SIGNAL_KEYS[keyof typeof SOCKET_SIGNAL_KEYS]
