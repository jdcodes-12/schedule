import { deepEqual } from '../../src/lib/global.utils.js';

describe('Global Utils - deepEquals()', () => {

  test('TRUE - when objects are deeply equal.', () => {
    const objA = { 
      lessonDate: '2024-14-18', 
      lessons: [{ a: 1 }, { a: 2 }]
    }

    const objB = { 
      lessonDate: '2024-14-18', 
        lessons: [{ a: 1 }, { a: 2 }]
      }

    const result = deepEqual(objA, objB);

    expect(result).toBe(true);
  });

  test('FALSE - when objects have different key names.', () => {
    const objA = { 
      lessonDate: '2024-14-18', 
      lessons: [{ a: 1 }, { x: 1 }]
    }

    const objB = { 
      lessonDate: '2024-14-18', 
        lessons: [{ a: 1 }, { a: 2 }]
      }

    const result = deepEqual(objA, objB);

    expect(result).toBe(false);
  });

  test('FALSE - when objects have different key sizes.', () => {
    const objA = { 
      lessonDate: '2024-14-18', 
      lessons: [{ a: 1 }]
    }

    const objB = { 
      lessonDate: '2024-14-18', 
        lessons: [{ a: 1, b: 2 }]
      }

    const result = deepEqual(objA, objB);

    expect(result).toBe(false);
  });

  test('FALSE - when arrays are different sizes.', () => {
    const objA = { 
      lessonDate: '2024-14-18', 
      lessons: [{ a: 1 }, { a: 2 }]
    }

    const objB = { 
      lessonDate: '2024-14-18', 
      lessons: [{ a: 1 }]
    }

    const objC = { 
      lessonDate: '2024-14-18', 
      lessons: []
    }

    const result1 = deepEqual(objA, objB);
    const result2 = deepEqual(objA, objC);
    const result3 = deepEqual(objB, objC);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });

  test('FALSE - when lessons dates are different.', () => {
    const objA = { 
      lessonDate: '2024-14-19', 
      lessons: [{ a: 1 }, { a: 2 }]
    }

    const objB = { 
      lessonDate: '2024-14-18', 
        lessons: [{ a: 1 }]
      }

    const result = deepEqual(objA, objB);

    expect(result).toBe(false);
  });

  test('FALSE - when a key is null or undefined and the other is not.', () => {
    const objA = { 
      lessonDate: '2024-14-18', 
      lessons: [{ a: 1 }, { a: 2 }]
    }

    const objB = { 
      lessonDate: '2024-14-18', 
      lessons: null
    }

    const objC = {
      lessonDate: null,
      lessons: [{ a: 1 }, { a: 2 }]
    }

    const objD = {
      lessonDate: undefined,
      lessons: [{ a: 1 }, { a: 2 }]
    }

    const objE = {
      lessonDate: '2024-14-18',
      lessons: undefined
    }

    const result1 = deepEqual(objA, objB);
    const result2 = deepEqual(objA, objC);
    const result3 = deepEqual(objA, objD);
    const result4 = deepEqual(objA, objE);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });
})