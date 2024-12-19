/**
 * Decompose permutation into disjoint cycles.
 * @param {string[]} cycles - Input cycles as strings, e.g., ['5234', '135', '437'].
 * @returns {string} - Decomposed permutation as disjoint cycles, e.g., "(1 7 4)(2 5)".
 */
export function decomposePermutation(cycles: string[]): string {
  const elements = new Set<string>();
  cycles.forEach((cycle) => cycle.split('').forEach((el) => elements.add(el)));

  // Convert string cycles into arrays of numbers for easier handling
  const parsedCycles = cycles.map((cycle) => cycle.split(''));

  // Function to find the next element by applying all cycles in order
  const applyPermutation = (element: string): string => {
    let current = element;
    for (const cycle of parsedCycles) {
      const index = cycle.indexOf(current);
      if (index !== -1) {
        current = cycle[(index + 1) % cycle.length];
      }
    }
    return current;
  };

  // Start constructing disjoint cycles
  const result: string[] = [];
  const visited = new Set<string>();

  for (const element of elements) {
    if (!visited.has(element)) {
      const cycle: string[] = [];
      let current = element;

      do {
        cycle.push(current);
        visited.add(current);
        current = applyPermutation(current);
      } while (current !== element);

      if (cycle.length > 1) {
        result.push(`(${cycle.join(' ')})`);
      }
    }
  }
  console.log(result);
  return result.join('');
  // const mappings: Record<number, number> = {};
  // const allNumbers = new Set<number>();

  // // Step 1: Parse cycles into mappings
  // cycles.forEach((cycle) => {
  //   const elements = cycle.split('').map(Number);
  //   for (let i = 0; i < elements.length; i++) {
  //     const current = elements[i];
  //     const next = elements[(i + 1) % elements.length]; // Circular indexing
  //     mappings[current] = next;
  //     allNumbers.add(current);
  //   }
  // });

  // // Step 2: Generate disjoint cycles
  // const visited = new Set<number>();
  // const result: string[] = [];

  // for (const start of allNumbers) {
  //   if (!visited.has(start)) {
  //     const cycle: number[] = [];
  //     let current = start;

  //     // Follow the mapping to form a cycle
  //     while (!visited.has(current)) {
  //       cycle.push(current);
  //       visited.add(current);
  //       current = mappings[current];
  //     }

  //     // Add the cycle to the result if it's valid
  //     if (cycle.length > 1) {
  //       result.push(`(${cycle.join(' ')})`);
  //     }
  //   }
  // }

  // // Step 3: Combine all cycles into a single string
  // return result.join('');
}
