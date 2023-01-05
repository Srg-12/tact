import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let __tuple: TupleItem[] = [];
    __tuple.push({ type: 'cell', cell: source.code });
    __tuple.push({ type: 'cell', cell: source.data });
    return __tuple;
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounced = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let __tuple: TupleItem[] = [];
    __tuple.push({ type: 'int', value: source.bounced ? -1n : 0n });
    __tuple.push({ type: 'slice', cell: beginCell().storeAddress(source.sender).endCell() });
    __tuple.push({ type: 'int', value: source.value });
    __tuple.push({ type: 'slice', cell: source.raw });
    return __tuple;
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null) {
            b_0.storeBit(true);
            b_0.storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null) {
            b_0.storeBit(true);
            b_0.storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null) {
            b_0.storeBit(true);
            b_0.storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body: Cell | null = null;
    if (sc_0.loadBit()) {
        _body = sc_0.loadRef();
    }
    let _code: Cell | null = null;
    if (sc_0.loadBit()) {
        _code = sc_0.loadRef();
    }
    let _data: Cell | null = null;
    if (sc_0.loadBit()) {
        _data = sc_0.loadRef();
    }
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    const _bounce = source.readBoolean();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let __tuple: TupleItem[] = [];
    __tuple.push({ type: 'int', value: source.bounce ? -1n : 0n });
    __tuple.push({ type: 'slice', cell: beginCell().storeAddress(source.to).endCell() });
    __tuple.push({ type: 'int', value: source.value });
    __tuple.push({ type: 'int', value: source.mode });
    if (source.body !== null) {
        __tuple.push({ type: 'cell', cell: source.body });
    } else {
        __tuple.push({ type: 'null' });
    }
    if (source.code !== null) {
        __tuple.push({ type: 'cell', cell: source.code });
    } else {
        __tuple.push({ type: 'null' });
    }
    if (source.data !== null) {
        __tuple.push({ type: 'cell', cell: source.data });
    } else {
        __tuple.push({ type: 'null' });
    }
    return __tuple;
}

export type Request = {
    $$type: 'Request';
    requested: Address;
    to: Address;
    value: bigint;
    timeout: bigint;
    bounce: boolean;
    mode: bigint;
    body: Cell | null;
}

export function storeRequest(src: Request) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4096439811, 32);
        b_0.storeAddress(src.requested);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.timeout, 32);
        b_0.storeBit(src.bounce);
        b_0.storeUint(src.mode, 8);
        if (src.body !== null) {
            b_0.storeBit(true);
            b_0.storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4096439811) { throw Error('Invalid prefix'); }
    let _requested = sc_0.loadAddress();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _timeout = sc_0.loadUintBig(32);
    let _bounce = sc_0.loadBit();
    let _mode = sc_0.loadUintBig(8);
    let _body: Cell | null = null;
    if (sc_0.loadBit()) {
        _body = sc_0.loadRef();
    }
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function loadTupleRequest(source: TupleReader) {
    const _requested = source.readAddress();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _timeout = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function storeTupleRequest(source: Request) {
    let __tuple: TupleItem[] = [];
    __tuple.push({ type: 'slice', cell: beginCell().storeAddress(source.requested).endCell() });
    __tuple.push({ type: 'slice', cell: beginCell().storeAddress(source.to).endCell() });
    __tuple.push({ type: 'int', value: source.value });
    __tuple.push({ type: 'int', value: source.timeout });
    __tuple.push({ type: 'int', value: source.bounce ? -1n : 0n });
    __tuple.push({ type: 'int', value: source.mode });
    if (source.body !== null) {
        __tuple.push({ type: 'cell', cell: source.body });
    } else {
        __tuple.push({ type: 'null' });
    }
    return __tuple;
}

export type Signed = {
    $$type: 'Signed';
    request: Request;
}

export function storeSigned(src: Signed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(420994549, 32);
        b_0.store(storeRequest(src.request));
    };
}

export function loadSigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 420994549) { throw Error('Invalid prefix'); }
    let _request = loadRequest(sc_0);
    return { $$type: 'Signed' as const, request: _request };
}

function loadTupleSigned(source: TupleReader) {
    const _request = loadTupleRequest(source.readTuple());
    return { $$type: 'Signed' as const, request: _request };
}

function storeTupleSigned(source: Signed) {
    let __tuple: TupleItem[] = [];
    __tuple.push({ type: 'tuple', items: storeTupleRequest(source.request) });
    return __tuple;
}

async function Multisig_init(members: Cell, totalWeight: bigint, requiredWeight: bigint) {
    const __code = 'te6ccgECJwEABAUAART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAhIgIBSAYHAgEgDg8CAUgICQIBWAwNAoEcCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghD0KrYDuuMCghAZF931uuMCMPLAgoAoLAAsIG7y0ICAA3DDtRNDUAfhigQEB1wD0BIEBAdcAgQEB1wBVMGwUBNMfAYIQ9Cq2A7ry4IH6QAEB+kABAfoA0x/SANMHbQHSAAGSMdTeVWA3EJoQiRB4VQXwGsj4QgHMVTBQNIEBAc8A9ACBAQHPAIEBAc8Aye1UAPTtRNDUAfhigQEB1wD0BIEBAdcAgQEB1wBVMGwUBNMfAYIQGRfd9bry4IHTHwGCEPQqtgO68uCB+kABAfpAAQH6ANMf0gDTB20B0gABkjHU3lVgNxCaEIkQeFUF8BvI+EIBzFUwUDSBAQHPAPQAgQEBzwCBAQHPAMntVABHMhwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQgAB0QTP0Cm+hlAHXADDgW22ACASAQEQIBSBscAgFYEhMCASAUFQAVJR/AcoA4HABygCAACRwWfAGgAgEgFhcCASAZGgH3MhxAcoBUAfwEnABygJQBc8WUAP6AnABymgjbrMlbrOxjj1/8BLIcPAScPASJG6zmX/wEgTwAVAEzJU0A3DwEuIkbrOZf/ASBPABUATMlTQDcPAS4nDwEgJ/8BICyVjMljMzAXDwEuIhbrOYf/ASAfABAcyUMXDwEuLJAYBgAsRwcAzIzAwHBVCTUAgGRBRQy88WGfQAF4EBAc8AFYEBAc8AE8oAyEYXEDUYghD0KrYDUAjLH1AGzxZQBM8WWPoCyx/KAMsHIW6UcDLKAJV/AcoAzOLJAczJgAAT7AAA7ArQ9AQwggCTuQGAEPQPb6Hy4GRtyPQAyVWQC/AVgAD0MW1wBMjMUERDE1A0gQEBzwD0AIEBAc8AgQEBzwDJgAgEgHR4CASAfIAAXDRbgQELWIEBAfAHgAAkECNfA4AB1PhBbyQQI18DgQELKwKBAQHwB/ABggC04wHCAPL0+EL4KFQYe1F6B1Uj8BZc8BN/cFBCgEJQQm0C8BSAAZz4QW8kECNfA/hC+ChUIMNUW7pUephTqfAW8BOBEU0IxwUX8vSBEpMD+CO8E/L0BG1t8BSAARbykL2omhqAPwxQICA64B6AkCAgOuAQICA64AqmDYKKoH4DEAgEgIyQCASAlJgAJuzX/AXgAQbcoPaiaGoA/DFAgIDrgHoCQICA64BAgIDrgCqYNgp4DMABNt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcw';
    const __system = 'te6cckECJQEABGYAAQHAAQEFoSdzAgEU/wD0pBP0vPLICwMCAWIJBAIBIAgFAgFmBwYATbL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYACzsL+7UTQ1AH4YvpAAQH0BIEBAdcAgQEB1wDSANQB0NMfAYIQ9Cq2A7ry4IH6QAEB+kABAfoA0x/SANMHbQHSAAGSMdTeVWA3EHwQexB6EHkQeFUFbBzwFfAPgAA28FueAd4CkAgLLFgoCAUgSCwIBIA8MAgEgGA0BdSBEpMk+CO88vSCAJ9qKLPy9PhBbyQQI18DK4EBCyKBAQHwB/ABHIEBC1ANbYEBAfAGUKugUwi+4wAJgDgCeN39wcIEAglR5h1R5h1YSyFVgghAZF931UAjLHweCEPQqtgNQCMsfUAbPFlAEzxZY+gLLH8oAywchbpRwMsoAlX8BygDM4skvVSBtbfATBwIBIBEQAAUbFeAAsRwcAzIzAwHBVCTUAgGRBRQy88WGfQAF4EBAc8AFYEBAc8AE8oAyEYXEDUYghD0KrYDUAjLH1AGzxZQBM8WWPoCyx/KAMsHIW6UcDLKAJV/AcoAzOLJAczJgAgFYFRMB9zIcQHKAVAH8BJwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY49f/ASyHDwEnDwEiRus5l/8BIE8AFQBMyVNANw8BLiJG6zmX/wEgTwAVAEzJU0A3DwEuJw8BICf/ASAslYzJYzMwFw8BLiIW6zmH/wEgHwAQHMlDFw8BLiyQGAUAAT7AAAVJR/AcoA4HABygCACASAaFwIB9BkYAAEgAAUbyeACASAeGwIBWB0cAB0QTP0Cm+hlAHXADDgW22AAIwhbpVbWfRZMODIAc8AQTP0QYAIBSCAfAAsIG7y0ICACfzt+3Ah10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIMAAItdJwSGw4wLAAJEw4w3ywIKAjIQH6+QGC8CKu5tCm3BRldyd91Y0GrjCQo83T2KiFYRhCCK5fbrA5uo7V7UTQ1AH4YvpAAQH0BIEBAdcAgQEB1wDSANQB0NMfAYIQ9Cq2A7ry4IH6QAEB+kABAfoA0x/SANMHbQHSAAGSMdTeVWA3EHwQexB6EHkQeFUFbBzwF+AiAKjI+EIBzFWwUMvPFhn0ABeBAQHPABWBAQHPABPKAMhGFxA1GIIQ9Cq2A1AIyx9QBs8WUATPFlj6AssfygDLByFulHAyygCVfwHKAMziyQHMye1U2zEBrFvtRNDUAfhi+kABAfQEgQEB1wCBAQHXANIA1AHQ0x8BghD0KrYDuvLggfpAAQH6QAEB+gDTH9IA0wdtAdIAAZIx1N5VYDcQfBB7EHoQeRB4VQVsHPAWJACkyPhCAcxVsFDLzxYZ9AAXgQEBzwAVgQEBzwATygDIRhcQNRiCEPQqtgNQCMsfUAbPFlAEzxZY+gLLH8oAywchbpRwMsoAlX8BygDM4skBzMntVBQ8sic=';
    let systemCell = Cell.fromBase64(__system);
    let __tuple: TupleItem[] = [];
    __tuple.push({ type: 'cell', cell: systemCell });
    __tuple.push({ type: 'cell', cell: members });
    __tuple.push({ type: 'int', value: totalWeight });
    __tuple.push({ type: 'int', value: requiredWeight });
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: codeCell, data: new Cell() }, system);
    let res = await executor.get('init_Multisig', __tuple);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (Multisig_errors[res.exitCode]) {
            throw new ComputeError(Multisig_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const Multisig_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    4429: { message: `Invalid sender` },
    4755: { message: `Timeout` },
    40810: { message: `Completed` },
    46307: { message: `Not a member` },
}

export class Multisig implements Contract {
    
    static async init(members: Cell, totalWeight: bigint, requiredWeight: bigint) {
        return await Multisig_init(members,totalWeight,requiredWeight);
    }
    
    static async fromInit(members: Cell, totalWeight: bigint, requiredWeight: bigint) {
        const init = await Multisig_init(members,totalWeight,requiredWeight);
        const address = contractAddress(0, init);
        return new Multisig(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Multisig(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Multisig_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Request | Signed) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Request') {
            body = beginCell().store(storeRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Signed') {
            body = beginCell().store(storeSigned(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMember(provider: ContractProvider, address: Address) {
        let __tuple: TupleItem[] = [];
        __tuple.push({ type: 'slice', cell: beginCell().storeAddress(address).endCell() });
        let result = await provider.get('member', __tuple);
        return result.stack.readBigNumberOpt();
    }
    
    async getMembers(provider: ContractProvider) {
        let __tuple: TupleItem[] = [];
        let result = await provider.get('members', __tuple);
        return result.stack.readCellOpt();
    }
    
}