"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processor = exports.CONTRACT_ADDRESS = exports.SS58_NETWORK = void 0;
const util_internal_1 = require("@subsquid/util-internal");
const ss58 = __importStar(require("@subsquid/ss58"));
const substrate_processor_1 = require("@subsquid/substrate-processor");
exports.SS58_NETWORK = 'aleph-zero-testnet';
const CONTRACT_ADDRESS_SS58 = '5G12m7C274qk6MVuW9Vb5Dno31EBVcRuPt85yYE1wQ5ZRTnq';
exports.CONTRACT_ADDRESS = ss58.codec(42).decode(CONTRACT_ADDRESS_SS58);
exports.processor = new substrate_processor_1.SubstrateBatchProcessor()
    .setGateway('https://v2.archive.subsquid.io/network/aleph-zero-testnet')
    .setRpcEndpoint({
    url: (0, util_internal_1.assertNotNull)(process.env.RPC_ENDPOINT),
    rateLimit: 10
})
    .addContractsContractEmitted({
    contractAddress: [exports.CONTRACT_ADDRESS],
    extrinsic: true
})
    .setFields({
    block: {
        timestamp: true
    },
    extrinsic: {
        hash: true
    }
})
    .setBlockRange({
    // genesis block happens to not have a timestamp, so it's easier
    // to start from 1 in cases when the deployment height is unknown
    from: 58879836
});
//# sourceMappingURL=processor.js.map