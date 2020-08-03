import { utils } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

const fetchFee = async (platform: string, network: string) => {
    let apiResult: any = null;
    let apiJSON: any = null;

    switch (platform) {
        case 'ethereum':
            switch (network) {
                case '1':
                    apiResult = await fetch(
                        'https://ethgasstation.info/json/ethgasAPI.json',
                    );

                    apiResult = await apiResult.text();

                    apiJSON = JSON.parse(apiResult);

                    return {
                        average: BigNumber.from(
                            utils.parseUnits(apiJSON.average.toString(), 9),
                        ).div(10),
                        fast: BigNumber.from(
                            utils.parseUnits(apiJSON.fast.toString(), 9),
                        ).div(10),
                        safeLow: BigNumber.from(
                            utils.parseUnits(apiJSON.safeLow.toString(), 9),
                        ).div(10),
                    };
            }
    }

    return {
        average: BigNumber.from(0),
        fast: BigNumber.from(0),
        safeLow: BigNumber.from(0),
    };
};

export default fetchFee;
