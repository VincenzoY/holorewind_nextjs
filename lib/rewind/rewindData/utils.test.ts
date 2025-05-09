/*
import { describe, it, expect } from 'vitest';
import { nLargestArray, nLargestObjects } from './recap_helper';
import type { HeapInfo } from "./recap_helper"

describe('nLargestArray', () => {
  it('finds n largest', () => {
    expect(nLargestArray([5,6,2,3,6,6,7], 4, (i) => i)).toEqual([6,6,6,7])
  })

  it('finds n largest when n > array.length', () => {
    expect(nLargestArray([7,5,6], 10, (i) => i)).toEqual([5,6,7])
  })

  it('finds n largest when n < 0', () => {
    expect(nLargestArray([7,5,6], 0, (i) => i)).toEqual([])
  })

  it('finds n largest with custom lambda', () => {
    expect(nLargestArray([5,6,2,3,6,6,7], 4, (i) => -i)).toEqual([6,5,3,2])
  })
});

describe('nLargestObjects with single property', () => {
    const test_data = {
        1: {count: 0},
        2: {count: 0},
        3: {count: 3},
        4: {count: 4},
        5: {count: 7} 
    }
    
    const heap_property: (x: number, largest?: boolean) => Record<string, HeapInfo<{count: number}>> = (x, largest = true) => {
      return {
        "count": {
          "n": x,
          "type": largest ? "largest": "smallest",
          "lambda": (i) => i.count,
        }
      }  
    }

    it('finds n largest', () => {
      expect(nLargestObjects(test_data, heap_property(3))).toEqual({
        "count": [
          {"key": 3, "value": "3"},
          {"key": 4, "value": "4"},
          {"key": 7, "value": "5"}
        ]
      })
    })
  
    it('finds n largest when n > array.length', () => {
      expect(nLargestObjects(test_data, heap_property(10))).toEqual({
        "count": [
          {"key": 0, "value": "1"},
          {"key": 0, "value": "2"},
          {"key": 3, "value": "3"},
          {"key": 4, "value": "4"},
          {"key": 7, "value": "5"}
        ]
      })
    })
  
    it('finds n largest when n < 0', () => {
      expect(nLargestObjects(test_data, heap_property(0))).toEqual({
        "count": []
      })
    })

    it('finds n smallest', () => {
        expect(nLargestObjects(test_data, heap_property(3, false))).toEqual({
          "count": [
            {"key": 3, "value": "3"},
            {"key": 0, "value": "1"},
            {"key": 0, "value": "2"},
          ]
        })
      })
    
      it('finds n smallest when n > array.length', () => {
        expect(nLargestObjects(test_data, heap_property(10, false))).toEqual({
          "count": [
            {"key": 7, "value": "5"},
            {"key": 4, "value": "4"},
            {"key": 3, "value": "3"},
            {"key": 0, "value": "1"},
            {"key": 0, "value": "2"},
          ]
        })
      })
    
      it('finds n smallest when n < 0', () => {
        expect(nLargestObjects(test_data, heap_property(0, false))).toEqual({
          "count": []
        })
      })
  });

  describe('nLargestObjects with multiple properties', () => {
    const test_data = {
        1: {a: 0, b: 2},
        2: {a: 1, b: 2},
        3: {a: 4, b: 6},
        4: {a: 5, b: -10},
        5: {a: -2, b: 9},
        6: {a: 0, b: 1},
    }

    const filters: Record<string, HeapInfo<{a: number, b:number}>> = {
      "a": {
        "n": 3,
        "type": 'largest',
        "lambda": (i) => i.a
      },
      "b": {
        "n": 4,
        "type": "smallest",
        "lambda": (i) => i.b
      },
      "a+b": {
        "n": 4,
        "type": "smallest",
        "lambda": (i) => i.a + i.b
      },
      "a-b": {
        "n": 6,
        "type": "largest",
        "lambda": (i) => i.a - i.b
      }
    }
    
    it('finds n largest', () => {
      //console.log(nLargestObjects(test_data, filters))
      expect(nLargestObjects(test_data, filters)).toEqual({
        'a': [
          { key: 1, value: '2' },
          { key: 4, value: '3' },
          { key: 5, value: '4' }
        ],
        'b': [
          { key: 2, value: '2' },
          { key: 2, value: '1' },
          { key: 1, value: '6' },
          { key: -10, value: '4' }
        ],
        'a+b': [
          { key: 3, value: '2' },
          { key: 2, value: '1' },
          { key: 1, value: '6' },
          { key: -5, value: '4' }
        ],
        'a-b': [
          { key: -11, value: '5' },
          { key: -2, value: '1' },
          { key: -2, value: '3' },
          { key: -1, value: '6' },
          { key: -1, value: '2' },
          { key: 15, value: '4' }
        ]
      })
    })
  });
*/