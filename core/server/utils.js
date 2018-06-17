module.exports = () => {

    const _generateMetadataFilename = (originalName) => {
        try {
            const __SPLITTEDNAME = originalName.split('.');

            if(__SPLITTEDNAME.length <= 0) return undefined;

            const __EXTENSION = __SPLITTEDNAME[__SPLITTEDNAME.length - 1];

            __SPLITTEDNAME.splice(__SPLITTEDNAME.length-1, 1);
            __SPLITTEDNAME.push('metadata');
            __SPLITTEDNAME.push('json');
            return __SPLITTEDNAME.join('.');

        } catch(err) {
            return undefined;
        }
    };

    const _getCustomFieldsMetadata = () => ['category', 'tags', 'description'];

    const _getAvailableExtensions = () => ['jpg','jpeg','png','gif'];

    const _getAvailableMimetypes = () => ['image/jpg','image/jpeg','image/png','image/gif'];

    const _getDefaultThumbSize = () => { return { width: 160 } };

    return {
        generateMetadataFilename: _generateMetadataFilename,
        getCustomFieldsMetadata: _getCustomFieldsMetadata,
        getAvailableExtensions: _getAvailableExtensions,
        getAvailableMimetypes: _getAvailableMimetypes,
        getDefaultThumbSize: _getDefaultThumbSize
    }
};