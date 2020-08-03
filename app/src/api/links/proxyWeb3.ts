import {
    BlockTag,
    Filter,
    TransactionRequest,
} from '@ethersproject/abstract-provider';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { getCurrentNetworkProvider, getCurrentNetworkSigner } from 'utils/blockchain';
import {
    ITransferableTransactionRequest,
    transferBlock,
    transferNetwork,
    transferTransactionReceipt,
    transferTransactionResponse,
} from '../worker/transferParams';
import {
    prepareTransactionRequestParams,
} from './prepareParams';

interface IProviderCallAction {
    type: 'provider/CALL';
    payload: {
        transaction: any;
        blockTag?: any;
    };
}

interface IProviderEstimateGasAction {
    type: 'provider/ESTIMATE_GAS';
    payload: {
        transaction: any;
    };
}

interface IProviderGetBalanceAction {
    type: 'provider/GET_BALANCE';
    payload: {
        addressOrName: string | Promise<string>;
        blockTag?: BlockTag | Promise<BlockTag>;
    };
}

interface IProviderGetBlockAction {
    type: 'provider/GET_BLOCK';
    payload: {
        blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>;
        includeTransactions?: boolean;
    };
}

interface IProviderGetBlockNumberAction {
    type: 'provider/GET_BLOCK_NUMBER';
    payload: {};
}

interface IProviderGetBlockWithTransactionsAction {
    type: 'provider/GET_BLOCK_WITH_TRANSACTIONS';
    payload: {
        blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>,
    };
}

interface IProviderGetCodeAction {
    type: 'provider/GET_CODE';
    payload: {
        addressOrName: string | Promise<string>;
        blockTag?: BlockTag | Promise<BlockTag>;
    };
}

interface IProviderGetGasPriceAction {
    type: 'provider/GET_GAS_PRICE';
    payload: {};
}

interface IProviderGetLogsAction {
    type: 'provider/GET_LOGS';
    payload: {
        filter: Filter;
    };
}

interface IProviderGetNetworkAction {
    type: 'provider/GET_NETWORK';
    payload: {};
}

interface IProviderGetStorageAtAction {
    type: 'provider/GET_STORAGE_AT';
    payload: {
        addressOrName: string | Promise<string>;
        blockTag?: BlockTag | Promise<BlockTag>;
        position: BigNumberish;
    };
}

interface IProviderGetTransactionAction {
    type: 'provider/GET_TRANSACTION';
    payload: {
        transactionHash: string;
    };
}

interface IProviderGetTransactionCountAction {
    type: 'provider/GET_TRANSACTION_COUNT';
    payload: {
        addressOrName: string | Promise<string>;
        blockTag?: BlockTag | Promise<BlockTag>;
    };
}

interface IProviderGetTransactionReceiptAction {
    type: 'provider/GET_TRANSACTION_RECEIPT';
    payload: {
        transactionHash: string;
    };
}

interface IProviderResolveNameAction {
    type: 'provider/RESOLVE_NAME';
    payload: {
        name: string | Promise<string>;
    };
}

interface IProviderLookupAddressAction {
    type: 'provider/LOOKUP_ADDRESS';
    payload: {
        address: string | Promise<string>;
    };
}

interface IProviderSendTransactionAction {
    type: 'provider/SEND_TRANSACTION';
    payload: {
        signedTransaction: string | Promise<string>;
    };
}

interface IProviderWaitForTransactionAction {
    type: 'provider/WAIT_FOR_TRANSACTION';
    payload: {
        transactionHash: string;
        confirmations?: number;
    };
}

interface ISignerGetAddressAction {
    type: 'signer/GET_ADDRESS';
    payload: {};
}

interface ISignerSendTransactionAction {
    type: 'signer/SEND_TRANSACTION';
    payload: {
        transaction: ITransferableTransactionRequest;
    };
}

interface ISignerSignMessageAction {
    type: 'signer/SIGN_MESSAGE';
    payload: {
        message: any;
    };
}

interface ISignerSignTransactionAction {
    type: 'signer/SIGN_TRANSACTION';
    payload: {
        transaction: ITransferableTransactionRequest;
    };
}

type ActionType = ISignerGetAddressAction | ISignerSendTransactionAction | ISignerSignMessageAction | ISignerSignTransactionAction
    | IProviderCallAction | IProviderEstimateGasAction | IProviderGetBalanceAction | IProviderGetBlockAction
    | IProviderGetBlockNumberAction | IProviderGetBlockWithTransactionsAction | IProviderGetCodeAction | IProviderGetGasPriceAction
    | IProviderGetLogsAction | IProviderGetNetworkAction | IProviderGetStorageAtAction
    | IProviderGetTransactionAction | IProviderGetTransactionCountAction | IProviderGetTransactionReceiptAction
    | IProviderLookupAddressAction | IProviderResolveNameAction | IProviderSendTransactionAction
    | IProviderWaitForTransactionAction;

const proxyWeb3 = async (action: ActionType) => {
    const signer = await getCurrentNetworkSigner();

    if (!signer) {
        throw new Error('No Signer in ProxySigner');
    }

    const provider = await getCurrentNetworkProvider();

    if (!provider) {
        throw new Error('No Provider in ProxySigner');
    }

    switch (action.type) {
        case 'provider/CALL':
            return provider.call(
                action.payload.transaction,
                action.payload.blockTag,
            );
        case 'provider/ESTIMATE_GAS':
            return (await provider.estimateGas(
                action.payload.transaction,
            )).toString();
        case 'provider/GET_BALANCE':
            return (await provider.getBalance(
                action.payload.addressOrName,
                action.payload.blockTag,
            )).toString();
        case 'provider/GET_BLOCK':
            return transferBlock(
                await provider.getBlock(
                    action.payload.blockHashOrBlockTag,
                ),
            );
        case 'provider/GET_BLOCK_NUMBER':
            return provider.getBlockNumber();
        case 'provider/GET_BLOCK_WITH_TRANSACTIONS':
            return provider.getBlockWithTransactions(
                action.payload.blockHashOrBlockTag,
            );
        case 'provider/GET_CODE':
            return provider.getCode(
                action.payload.addressOrName,
                action.payload.blockTag,
            );
        case 'provider/GET_GAS_PRICE':
            return (await provider.getGasPrice()).toString();
        case 'provider/GET_LOGS':
            return provider.getLogs(
                action.payload.filter,
            );
        case 'provider/GET_NETWORK':
            return transferNetwork(await provider.getNetwork());
        case 'provider/GET_STORAGE_AT':
            return provider.getStorageAt(
                action.payload.addressOrName,
                BigNumber.from(action.payload.position),
                action.payload.blockTag,
            );
        case 'provider/GET_TRANSACTION':
            return transferTransactionResponse(
                await provider.getTransaction(
                    action.payload.transactionHash,
                ),
            );
        case 'provider/GET_TRANSACTION_COUNT':
            return provider.getTransactionCount(
                action.payload.addressOrName,
                action.payload.blockTag,
            );
        case 'provider/GET_TRANSACTION_RECEIPT':
            return transferTransactionReceipt(
                await provider.getTransactionReceipt(
                    action.payload.transactionHash,
                ),
            );
        case 'provider/LOOKUP_ADDRESS':
            return provider.lookupAddress(
                action.payload.address,
            );
        case 'provider/RESOLVE_NAME':
            return provider.resolveName(
                action.payload.name,
            );
        case 'provider/SEND_TRANSACTION':
            return transferTransactionResponse(
                await provider.sendTransaction(
                    action.payload.signedTransaction,
                ),
            );
        case 'provider/WAIT_FOR_TRANSACTION':
            return transferTransactionReceipt(
                await provider.waitForTransaction(
                    action.payload.transactionHash,
                    action.payload.confirmations,
                ),
            );

        case 'signer/GET_ADDRESS':
            return signer.getAddress();
        case 'signer/SEND_TRANSACTION':
            const transaction = prepareTransactionRequestParams(action.payload.transaction);
            return transferTransactionResponse(
                await signer.sendTransaction(
                    transaction,
                ),
            );
        case 'signer/SIGN_MESSAGE':
            return signer.signMessage(
                action.payload.message,
            );
        case 'signer/SIGN_TRANSACTION':
            return signer.signTransaction(
                prepareTransactionRequestParams(action.payload.transaction),
            );
    }
};

export default proxyWeb3;
