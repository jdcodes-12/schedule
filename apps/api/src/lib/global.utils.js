export function deepEqual(objA, objB) {
  // Check if both are the same reference
  if (objA === objB) return true;

  // Check if either is null or not an object (base case)
  if (
    objA === null || 
    objB === null || 
    typeof objA !== 'object' || 
    typeof objB !== 'object'
  ) {
    return false;
  }
    
  // Get keys of both objects
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Check if they have the same number of keys
  if (keysA.length !== keysB.length) return false;

  // Check if all keys and values are deeply equal
  for (let key of keysA) {
    if (!keysB.includes(key)) return false; // Key exists in objA but not in objB
    if (!deepEqual(objA[key], objB[key])) return false; // Recursively check values
  }

  return true;
}