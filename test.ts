import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { parseISODate, formatToISODate } from './main.ts';

const testParseISODate = (isoDateString: string, utcDate?: number) => () => {
  assertEquals(parseISODate(isoDateString), utcDate || new Date(isoDateString).getTime());
}

const testFormatToISODate = (isoDateString: string, utcDate?: number) => () => {
  assertEquals(isoDateString, formatToISODate(utcDate || new Date(isoDateString).getTime()));
}

Deno.test('parseISODate #1', () => {
  testParseISODate('1970-01-01T00:00:00.000Z', 0);
  testParseISODate('2001-09-09T01:46:40.000Z');
  testParseISODate('1999-01-01T00:00:00.000Z');
  testParseISODate('1973-03-03T09:46:40.000Z');
  testParseISODate('2009-02-13T23:31:30.000Z');
  testParseISODate(new Date().toISOString());
});

Deno.test('formatToISODate #1', () => {
  testFormatToISODate('1970-01-01T00:00:00.000Z', 0);
  testFormatToISODate('2001-09-09T01:46:40.000Z');
  testFormatToISODate('1999-01-01T00:00:00.000Z');
  testFormatToISODate('1973-03-03T09:46:40.000Z');
  testFormatToISODate('2009-02-13T23:31:30.000Z');
  testFormatToISODate(new Date().toISOString());
});

