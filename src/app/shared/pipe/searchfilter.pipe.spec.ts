import { describe, expect, it } from "vitest";
import { SearchfilterPipe } from './searchfilter.pipe';

describe('SearchfilterPipe', () => {
    it('create an instance', () => {
        const pipe = new SearchfilterPipe();
        expect(pipe).toBeTruthy();
    });
});
