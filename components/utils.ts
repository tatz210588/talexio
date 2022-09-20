import path from "path";
import crypto from "crypto";

export class NRegex extends RegExp {
  nonStickyTest = (str: string) => {
    this.lastIndex = 0;
    let result = this.test(str);
    this.lastIndex = 0;
    return result;
  };
}
export const BMW5Regx = new NRegex(/M?\d\d\d[d,i]?/i);
export const BMW2Regx = new NRegex(/[x,z]\d/i);
