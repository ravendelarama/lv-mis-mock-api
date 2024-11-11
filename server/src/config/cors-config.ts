import environment from "../constants/environment"

const corsOptions = { 
  origin: [ 
    environment.clientUrl, environment.serviceUrl, environment.samsClientUrl, environment.samsServiceUrl
  ],
  credentials: true, 
}

export default corsOptions