declare module "tuef" {
  export type FieldType = "A" | "N" | "AN" | "P";
  export interface FixedLengthFieldSpec {
    name: string;
    type: FieldType;
    length: number;
    val?: number;
    mapKey?: string;
    mapFunc?: any;
    required?: boolean;
    defaultVal?: any;
  }
  export interface VaryLengthFieldSpec {
    name: string;
    type: FieldType;
    tag: string;
    length?: number;
    val?: number;
    mapKey?: string;
    mapFunc?: any;
    required?: boolean;
    defaultVal?: any;
  }
  export type FieldSpec = VaryLengthFieldSpec | FixedLengthFieldSpec;
  export type LengthType = "vary" | "fixed";
  export interface SegmentSpec {
    lengthType: LengthType;
    fieldSpecs: Array<FieldSpec>;
  }
  export interface TuefSpec {
    [key: string]: SegmentSpec;
  }
  export class Field {
    constructor(spec: FieldSpec, val: any, defaultVal: any);
    toString(lengthType?: LengthType): string;
  }
  export class Segment {
    constructor(spec: SegmentSpec, data: string);
    getSemicolonSeparatedHeader(): string;
    toSemicolonSeparatedString(): string;
    toString(): string;
  }
  export function parseTuef(spec: TuefSpec, str: string): object;
}
