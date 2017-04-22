export default (schema, payload) => {
  if (!schema || typeof schema !== 'object') {
    throw new Error('Invalid schema for validation')
  }
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload for validation')
  }

  const finalPayload = {}

  Object.keys(schema).forEach(key => {
    // First check if the property is present in payload
    if (!payload.hasOwnProperty(key)) {
      throw new Error(`Missing property "${key}" in payload`)
    }

    // Secondly, check if the given value has the right type
    if (typeof payload[key] !== schema[key]) {
      throw new Error(`Incorrect data type for key "${key}". Expected: ${schema[key]}, found: ${typeof payload[key]}`)
    }

    // If there is no problem, had the value to the final payload
    finalPayload[key] = payload[key]
  })

  return finalPayload
}
