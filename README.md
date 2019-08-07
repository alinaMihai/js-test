# VoxSmart JavaScript coding test

Fill in `number-parser.js` to ensure that the tests in `number-parser.test.js` succeed.

Each test case calls `NumberParser.internationalize(givenNumber, referenceNumber)`, which must

* return the `givenNumber` if it's already in international format
* otherwise, internationalize `givenNumber`, assuming it's been given in the national format
  of the `referenceNumber`

In a typical VoxSmart situation, the `referenceNumber` might be the user's own phone number.

The `NumberParser` is initialized with a country database: you are given a small sample database
in the test code.  Each item in the database contains

* a country code
* an international prefix, eg +44 for the UK
* the national prefix, eg 1 for the US; this defaults to 0

The test cases show the required behaviour when valid parameters are given, and also a
couple of cases of invalid data which should cause exceptions.

Your answer must be source code for `number-parser.js`, which can be dropped in as a replacement
for the suppied `number-parser.js` and which will produce a 100% pass with the given test code.
