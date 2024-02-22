import { generateClient } from 'aws-amplify/api'

let instance: AmplifyAPI

class AmplifyAPI {
  constructor() {
    if (instance) {
      throw new Error('Amplify API already initialized!')
    }
    instance = this
  }
}

const amplifyAPI = Object.freeze(generateClient())

export default amplifyAPI
