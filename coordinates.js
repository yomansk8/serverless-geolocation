import uuid from 'uuid'
import validateSchema from 'helpers/validateSchema'

const COORDINATES_TABLE = process.env.COORDINATES_TABLE

class Coordinates {
  /**
   * Constructor of the Coordinates class
   * @param  {Object} db The database helper providing database access functions
   */
  constructor(db) {
    this.db = db
  }

  /**
   * Return the validated and cleaned payload or throw an error
   * @param  {Object} payload The payload to validate
   * @return {Object}         The new payload
   */
  validateData(payload) {
    return validateSchema({}, payload)
  }

  /**
   * Insert new coordinates in database
   * @param  {number}  latitude  The latitude of the coordinates
   * @param  {number}  longitude The longitude of the coordinates
   */
  async insert(latitude, longitude) {
    const timestamp = new Date().getTime()
    const coordinates = {
      id: uuid.v1(),
      latitude,
      longitude,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    const params = {
      TableName: COORDINATES_TABLE,
      Item: coordinates,
    }

    await this.db.insertItem(coordinates)
    return coordinates
  }
}

export default Coordinates
