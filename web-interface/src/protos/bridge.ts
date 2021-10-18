/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "rosen_labs.xchain.xchain";

export interface MsgBridgeRequest {
  reciever: string;
  amount: number;
  fee: number;
  destChainId: number;
  signer: string;
}

const baseMsgBridgeRequest: object = {
  reciever: "",
  amount: 0,
  fee: 0,
  destChainId: 0,
  signer: "",
};

export const MsgBridgeRequest = {
  encode(
    message: MsgBridgeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reciever !== "") {
      writer.uint32(10).string(message.reciever);
    }
    if (message.amount !== 0) {
      writer.uint32(16).uint64(message.amount);
    }
    if (message.fee !== 0) {
      writer.uint32(24).uint64(message.fee);
    }
    if (message.destChainId !== 0) {
      writer.uint32(32).uint32(message.destChainId);
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBridgeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgBridgeRequest } as MsgBridgeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reciever = reader.string();
          break;
        case 2:
          message.amount = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.fee = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.destChainId = reader.uint32();
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBridgeRequest {
    const message = { ...baseMsgBridgeRequest } as MsgBridgeRequest;
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
    if (object.destChainId !== undefined && object.destChainId !== null) {
      message.destChainId = Number(object.destChainId);
    } else {
      message.destChainId = 0;
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer);
    } else {
      message.signer = "";
    }
    return message;
  },

  toJSON(message: MsgBridgeRequest): unknown {
    const obj: any = {};
    message.reciever !== undefined && (obj.reciever = message.reciever);
    message.amount !== undefined && (obj.amount = message.amount);
    message.fee !== undefined && (obj.fee = message.fee);
    message.destChainId !== undefined &&
      (obj.destChainId = message.destChainId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgBridgeRequest>): MsgBridgeRequest {
    const message = { ...baseMsgBridgeRequest } as MsgBridgeRequest;
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
    if (object.destChainId !== undefined && object.destChainId !== null) {
      message.destChainId = object.destChainId;
    } else {
      message.destChainId = 0;
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    } else {
      message.signer = "";
    }
    return message;
  },
};

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
