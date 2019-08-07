const NumberParser = require('./number-parser');

const COUNTRY_DATABASE = [
  {code: "HK", internationalPrefix: "852"},
  {code: "JP", internationalPrefix: "81"},
  {code: "NZ", internationalPrefix: "64"},
  {code: "UK", internationalPrefix: "44"},
  {code: "US", internationalPrefix: "1", nationalPrefix: "1"},
];

describe("NumberParser tests", () => {

  let parser;

  beforeAll(() => {
    parser = new NumberParser(COUNTRY_DATABASE);
  });

  test('national calls', () => {
    expect(parser.internationalize("051234567", "+85244112233")).toEqual("+85251234567");
    expect(parser.internationalize("07467917137", "+447700900123")).toEqual("+447467917137");
    expect(parser.internationalize("0211234567", "+64287654321")).toEqual("+64211234567");
    expect(parser.internationalize("13215552368", "+13115554321")).toEqual("+13215552368");
    expect(parser.internationalize("+819012345678", "+447700900123")).toEqual("+819012345678");
  });

  test('international calls', () => {
    expect(parser.internationalize("+64211234567", "+819012345678")).toEqual("+64211234567");
    expect(parser.internationalize("+85251234567", "+13115554321")).toEqual("+85251234567");
    expect(parser.internationalize("+13115554321", "+85251234567")).toEqual("+13115554321");
  });

  test('national call with international number', () => {
    expect(parser.internationalize("+447467917137", "+447700900123")).toEqual("+447467917137");
    expect(parser.internationalize("+64211234567", "+64287654321")).toEqual("+64211234567");
  });

  test('unknown national call', () => {
    expect(() => parser.internationalize("07456111234", "+567456111234")).toThrow();
  });

  test('no national prefix', () => {
    expect(() => parser.internationalize("7774123456", "+447700900123")).toThrow();
  });

  test('national reference number', () => {
    expect(() => parser.internationalize("03215552368", "013115554321")).toThrow();
  });
});
