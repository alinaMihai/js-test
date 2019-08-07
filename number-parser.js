class NumberParser {
    constructor(countryDatabase) {
        this.countryDatabase = countryDatabase;
        this.maxIntlPrefixLength = this.getMaxPrefix(countryDatabase).internationalPrefix.length;
    }

    getMaxPrefix(countryDatabase) {
        return countryDatabase.reduce(
            (maxPrefix, currentPrefix) => {
                const maxPrefixLength = maxPrefix.internationalPrefix.length;
                const currentPrefixLength = currentPrefix.internationalPrefix.length;
                return currentPrefixLength > maxPrefixLength ? currentPrefix : maxPrefix;
            },
            { internationalPrefix: '' },
        );
    }

    isInternationalized(givenNumber) {
        return givenNumber.indexOf('+') !== -1;
    }

    isNational(givenNumber, intlPrefix) {
      const countryInfo = this.countryDatabase.find(item => item.internationalPrefix === intlPrefix) || {};
      const nationalPrefix = countryInfo.nationalPrefix || '0';
      return givenNumber.indexOf(nationalPrefix) === 0;
    }

    getInternationalPrefix(referenceNumber) {
        if (typeof referenceNumber !== 'string') {
            throw new Error('Incorrect format');
        }
        const referenceNumberPrefix = this.countryDatabase.find((item) => {
            return referenceNumber.substring(1, this.maxIntlPrefixLength + 1).indexOf(item.internationalPrefix) != -1;
        });
        return referenceNumberPrefix && referenceNumberPrefix.internationalPrefix;
    }

    internationalize(givenNumber, referenceNumber) {
        if (this.isInternationalized(givenNumber)) {
            return givenNumber;
        }
        const intlPrefix = this.getInternationalPrefix(referenceNumber);
        if (intlPrefix && this.isNational(givenNumber, intlPrefix)) {
            return `+${intlPrefix}${givenNumber.substring(1)}`;
        }
        throw new Error('Could not parse number');
    }
}

module.exports = NumberParser;
