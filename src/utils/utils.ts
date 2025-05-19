import { decode } from 'cbor2';

export const decodeRecursively = (obj: any): any => {
    if (obj === null || obj === undefined) {
      return obj;
    }
  
    // Handle arrays
    if (Array.isArray(obj)) {
      try {
        const uint8Array = new Uint8Array(obj);
        const decoded = decode(uint8Array);
        // If decoded is a Map, convert to plain object
        return decoded instanceof Map ? Object.fromEntries(decoded) : decoded;
      } catch (error) {
        return obj.map(item => decodeRecursively(item));
      }
      
    }
  
    // Handle objects
    if (typeof obj === 'object') {
      // Check if it's a Uint8Array
      if (obj instanceof Uint8Array || (Array.isArray(obj) && obj.every(x => typeof x === 'number'))) {
        try {
          const uint8Array = new Uint8Array(obj);
          const decoded = decode(uint8Array);
          // If decoded is a Map, convert to plain object
          return decoded instanceof Map ? Object.fromEntries(decoded) : decoded;
        } catch (error) {
          console.error('Failed to decode value:', error);
          return obj;
        }
      }
  
      // Recursively process object properties
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = decodeRecursively(value);
      }
      return result;
    }
  
    return obj;
  };