import Coordinates from './coordinates.js'
import database from './helpers/dynamoDbHelper.js'

const mCoordinates = Coordinates(database)

const processPostCoordinates = async (rawPayload) => {
  const validatedPayload = await Coordinates.validateData(rawPayload)
  const coordinates = await Coordinates.insert(validatedPayload)
  const response = {
    statusCode: 200,
    body: JSON.stringify(coordinates)
  }
  return response
}

/**
 * Use this to check the service health
 * @param  {Object}   event    The event Object
 * @param  {Object}   context  The context Object
 * @param  {Function} callback The callback function
 */
const health = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'The geolocation service is running well! ;)',
      input: event,
    }),
  }

  callback(null, response)
}

/**
 * Handler for coordinates insertion
 * @param  {Object}   event    The event Object
 * @param  {Object}   context  The context Object
 * @param  {Function} callback The callback function
 */
const postCoordinates = (event, context, callback) => {
  try {
    const rawPayload = JSON.parse(event.body);
    processPostCoordinates(rawPayload)
      .then(response => {
        callback(null, response)
      })
  } catch (e) {
    callback(e)
  }
}

export default {
  health,
  postCoordinates,
}
