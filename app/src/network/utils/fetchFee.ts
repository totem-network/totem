import { utils } from 'ethers';

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
                        average: utils.bigNumberify(
                            utils.parseUnits(apiJSON.average.toString(), 9),
                        ).div(10),
                        fast: utils.bigNumberify(
                            utils.parseUnits(apiJSON.fast.toString(), 9),
                        ).div(10),
                        safeLow: utils.bigNumberify(
                            utils.parseUnits(apiJSON.safeLow.toString(), 9),
                        ).div(10),
                    };
            }
    }

    return {
        average: utils.bigNumberify(0),
        fast: utils.bigNumberify(0),
        safeLow: utils.bigNumberify(0),
    };
};

export default fetchFee;
