import AWS from 'aws-sdk'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

/**
 * Insert a document inside DynamoDB
 * @param  {Object}  params The params Object containing tablename and item information
 * @return {Promise}        The response from DynamoDB
 */
const insertItem = async (params) => await dynamoDb.put(params)

export default {
  insertItem,
}
