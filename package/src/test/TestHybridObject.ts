import { FilamentProxy } from '../native/FilamentProxy'

const FIBONACCI_LIMIT = 70

export async function testHybridObject(): Promise<void> {
  // 1. Creation
  console.log('Creating HybridObject...')
  const hybridObject = FilamentProxy.createTestObject()
  console.log('Created HybridObject!')

  // 2. Logging the entire thing as JSON
  console.log(hybridObject)

  // 3. Int Getter & Setter
  console.log(`Int: ${hybridObject.int}`)
  hybridObject.int = 6723
  console.log(`New Int: ${hybridObject.int}`)

  // 4. Enum Getter & Setter
  console.log(`Enum: ${hybridObject.enum}`)
  hybridObject.enum = 'second'
  console.log(`New Enum: ${hybridObject.enum}`)

  // 5. String Getter & Setter
  console.log(`String: ${hybridObject.string}`)
  hybridObject.string = 'new string value!'
  console.log(`New String: ${hybridObject.string}`)

  // 6. Nullable String Getter & Setter
  console.log(`Nullable String: ${hybridObject.nullableString}`)
  hybridObject.nullableString = 'now its not null!'
  console.log(`New Nullable String: ${hybridObject.nullableString}`)

  // 7. Testing multiple arguments and maps
  const result = hybridObject.multipleArguments(5, true, 'hahah!')
  console.log(`multipleArguments() -> ${JSON.stringify(result)}`)

  // 8. Testing callbacks
  hybridObject.sayHelloCallback(() => 'hello from JS!')
  const getter = hybridObject.getIntGetter()
  console.log(`Int getter: ${getter()}`)

  // 9. Create a new one
  const newObject = hybridObject.createNewHybridObject()
  console.log(`Created new hybrid object!`, newObject)

  // 10. Test Promises
  console.log(`Calculating Fibonacci up to number ${FIBONACCI_LIMIT}...`)
  const start = performance.now()
  const fibonacci = await hybridObject.calculateFibonacciAsync(FIBONACCI_LIMIT)
  const end = performance.now()
  console.log(`Calculated Fibonacci for ${FIBONACCI_LIMIT} = ${fibonacci} (took ${(end - start).toFixed(0)}ms)`)
}

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fib(count: number): BigInt {
  let prev = 0n
  let current = 1n
  for (let i = 2; i <= count; ++i) {
    let next = prev + current
    prev = current
    current = next
  }
  return current
}
