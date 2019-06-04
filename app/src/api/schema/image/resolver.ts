
export default {

    Mutation: {
        addImages: async (schema: any, {
            images,
        }: any) => {
            console.log(images);
        },
    },

    Query: {
        images: async () => {
            //
        },
    },

};
