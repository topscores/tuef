# tuef

In TUEF format (TransUnion Enquiry Format), a files might consist of several segments, each segment contains several fields. Based on provided `spec` this utility provides and easy way to write or read tuef stream

## Installation

`yarn add tuef` or `npm -i tuef`

## Sample spec

1.  Fixed length segment

```
const spec = {
  lengthType: 'fixed',
  fieldSpecs: [
    { name: 'field1', type: 'N', val: 10, length: 10, required: true }, // Field field1 is a require field
    { name: 'field2', type: 'A', val: 'Hello', length: 10 }, // Field field2 is an optional field
  ],
}
```

2.  Variable length segment
    Note: tag is a required field for variable length segment fieldSpec

```
const spec = {
  lengthType: 'vary',
  fieldSpecs: [
    { name: 'field1', tag: 'T01', type: 'N', val: 10, length: 10, required: true }, // Field field1 is a require field
    { name: 'field2', tag: 'T02', type: 'A', val: 'Hello', length: 10 }, // Field field2 is an optional field
  ],
}
```

3.  Using mapKey to map value from data object instead of fieldSpec.val

```
const spec = {
  lengthType: 'vary',
  fieldSpecs: [
    { name: 'field1', tag: 'T01', type: 'N', val: 5, length: 10, required: true }, // Field field1 is a require field
    { name: 'field2', tag: 'T02', type: 'A', mapKey: f2, length: 10 }, // Field field2 is an optional field
  ],
}
const data = {
  f2: 'Hello',
}
```

4.  Using mapFunc to map data[fieldSpec.mapKey] to other value

```
const spec = {
  lengthType: 'vary',
  fieldSpecs: [
    { name: 'field1', tag: 'T01', type: 'N', mapKey: f1, mapFunc: val => val* 10, length: 10, required: true }, // Field field1 is a require field
    { name: 'field2', tag: 'T02', type: 'A', val: 10, length: 10 }, // Field field2 is an optional field
  ],
}
const data = {
  f1: 5,
}
```

## Parsing TUEF string

Coming soon

## Convert an object to TUEF string

Coming soon
