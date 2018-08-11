declare module 'ipfs-api' {

    export default class ipfsAPI {

        constructor(host: string, port: number, options: object);

        constructor(multiaddr: string);

        constructor(options: object);

    }

}
