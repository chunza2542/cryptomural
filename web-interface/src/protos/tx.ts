/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "rosenlabs.xchain.xchain";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgSendMsgMintRequest {
  sender: string;
  port: string;
  channelID: string;
  timeoutTimestamp: number;
  reciever: string;
  amount: number;
  fee: number;
  tokenId: number;
  srcChainId: number;
  destChainId: number;
}

export interface MsgSendMsgMintRequestResponse {}

const baseMsgSendMsgMintRequest: object = {
  sender: "",
  port: "",
  channelID: "",
  timeoutTimestamp: 0,
  reciever: "",
  amount: 0,
  fee: 0,
  tokenId: 0,
  srcChainId: 0,
  destChainId: 0,
};

export const MsgSendMsgMintRequest = {
  encode(
    message: MsgSendMsgMintRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.port !== "") {
      writer.uint32(18).string(message.port);
    }
    if (message.channelID !== "") {
      writer.uint32(26).string(message.channelID);
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(32).uint64(message.timeoutTimestamp);
    }
    if (message.reciever !== "") {
      writer.uint32(42).string(message.reciever);
    }
    if (message.amount !== 0) {
      writer.uint32(48).uint64(message.amount);
    }
    if (message.fee !== 0) {
      writer.uint32(56).uint64(message.fee);
    }
    if (message.tokenId !== 0) {
      writer.uint32(64).uint32(message.tokenId);
    }
    if (message.srcChainId !== 0) {
      writer.uint32(72).uint32(message.srcChainId);
    }
    if (message.destChainId !== 0) {
      writer.uint32(80).uint32(message.destChainId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSendMsgMintRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSendMsgMintRequest } as MsgSendMsgMintRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.port = reader.string();
          break;
        case 3:
          message.channelID = reader.string();
          break;
        case 4:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.reciever = reader.string();
          break;
        case 6:
          message.amount = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.fee = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.tokenId = reader.uint32();
          break;
        case 9:
          message.srcChainId = reader.uint32();
          break;
        case 10:
          message.destChainId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendMsgMintRequest {
    const message = { ...baseMsgSendMsgMintRequest } as MsgSendMsgMintRequest;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = String(object.port);
    } else {
      message.port = "";
    }
    if (object.channelID !== undefined && object.channelID !== null) {
      message.channelID = String(object.channelID);
    } else {
      message.channelID = "";
    }
    if (
      object.timeoutTimestamp !== undefined &&
      object.timeoutTimestamp !== null
    ) {
      message.timeoutTimestamp = Number(object.timeoutTimestamp);
    } else {
      message.timeoutTimestamp = 0;
    }
    if (object.reciever !== undefined && object.reciever !== null) {
      message.reciever = String(object.reciever);
    } else {
      message.reciever = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Number(object.amount);
    } else {
      message.amount = 0;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Number(object.fee);
    } else {
      message.fee = 0;
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = Number(object.tokenId);
    } else {
      message.tokenId = 0;
    }
    if (object.srcChainId !== undefined && object.srcChainId !== null) {
      message.srcChainId = Number(object.srcChainId);
    } else {
      message.srcChainId = 0;
    }
    if (object.destChainId !== undefined && object.destChainId !== null) {
      message.destChainId = Number(object.destChainId);
    } else {
      message.destChainId = 0;
    }
    return message;
  },

  toJSON(message: MsgSendMsgMintRequest): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.port !== undefined && (obj.port = message.port);
    message.channelID !== undefined && (obj.channelID = message.channelID);
    message.timeoutTimestamp !== undefined &&
      (obj.timeoutTimestamp = message.timeoutTimestamp);
    message.reciever !== undefined && (obj.reciever = message.reciever);
    message.amount !== undefined && (obj.amount = message.amount);
    message.fee !== undefined && (obj.fee = message.fee);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.srcChainId !== undefined && (obj.srcChainId = message.srcChainId);
    message.destChainId !== undefined &&
      (obj.destChainId = message.destChainId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSendMsgMintRequest>
  ): MsgSendMsgMintRequest {
    const message = { ...baseMsgSendMsgMintRequest } as MsgSendMsgMintRequest;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port;
    } else {
      message.port = "";
    }
    if (object.channelID !== undefined && object.channelID !== null) {
      message.channelID = object.channelID;
    } else {
      message.channelID = "";
    }
    if (
      object.timeoutTimestamp !== undefined &&
      object.timeoutTimestamp !== null
    ) {
      message.timeoutTimestamp = object.timeoutTimestamp;
    } else {
      message.timeoutTimestamp = 0;
    }
    if (object.reciever !== undefined && object.reciever !== null) {
      message.reciever = object.reciever;
    } else {
      message.reciever = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = 0;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = object.fee;
    } else {
      message.fee = 0;
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = object.tokenId;
    } else {
      message.tokenId = 0;
    }
    if (object.srcChainId !== undefined && object.srcChainId !== null) {
      message.srcChainId = object.srcChainId;
    } else {
      message.srcChainId = 0;
    }
    if (object.destChainId !== undefined && object.destChainId !== null) {
      message.destChainId = object.destChainId;
    } else {
      message.destChainId = 0;
    }
    return message;
  },
};

const baseMsgSendMsgMintRequestResponse: object = {};

export const MsgSendMsgMintRequestResponse = {
  encode(
    _: MsgSendMsgMintRequestResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSendMsgMintRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSendMsgMintRequestResponse,
    } as MsgSendMsgMintRequestResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSendMsgMintRequestResponse {
    const message = {
      ...baseMsgSendMsgMintRequestResponse,
    } as MsgSendMsgMintRequestResponse;
    return message;
  },

  toJSON(_: MsgSendMsgMintRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSendMsgMintRequestResponse>
  ): MsgSendMsgMintRequestResponse {
    const message = {
      ...baseMsgSendMsgMintRequestResponse,
    } as MsgSendMsgMintRequestResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SendMsgMintRequest(
    request: MsgSendMsgMintRequest
  ): Promise<MsgSendMsgMintRequestResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SendMsgMintRequest = this.SendMsgMintRequest.bind(this);
  }
  SendMsgMintRequest(
    request: MsgSendMsgMintRequest
  ): Promise<MsgSendMsgMintRequestResponse> {
    const data = MsgSendMsgMintRequest.encode(request).finish();
    const promise = this.rpc.request(
      "rosenlabs.xchain.xchain.Msg",
      "SendMsgMintRequest",
      data
    );
    return promise.then((data) =>
      MsgSendMsgMintRequestResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
