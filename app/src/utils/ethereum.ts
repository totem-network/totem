import { utils } from 'ethers';

export const containsAddress = (adresses: string[], needleAdress: string): boolean => {
    for (const address of adresses) {
        if (address.toLowerCase() === needleAdress.toLowerCase()) {
            return true;
        }
    }

    return false;
};

export const isAddress = (address: string): boolean => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

export const isChecksumAddress = (address: string): boolean => {
    return (address === utils.getAddress(address));
};
