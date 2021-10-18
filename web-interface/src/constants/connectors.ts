import { InjectedConnector } from '@web3-react/injected-connector'

const supportedChainIds: Array<number> = [80001, 1666700000];

export const injected = new InjectedConnector({ supportedChainIds })