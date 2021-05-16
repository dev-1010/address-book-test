const env = process.env;
module.exports = {
    swaggeroptions :  {
        explore:true,
        swaggerDefinition: {
          openapi: '3.0.0',
          info: {
            title: env.SWAGGER_TITLE || 'Address Book API' ,
            version: env.SWAGGER_VERSION || "2.0" ,
            description: env.SWAGGER_DESCRIPTION || "Address Book API",
            license: 'private',
          },
          servers: [ 
            {
              url: `${env.APP_URL || 'http://localhost:8080'}/{basePath}`,
              description: 'Private Integration Service',
              variables: {
                basePath:{
                  enum:['api'],
                  default: 'api'
                }
              }
            },
          ],
          components: {
            securitySchemes: {
              authorization: {
                type: 'http',
                scheme: 'bearer',
              }
            }
          },          
        },
        apis: ['./app/routes/*.js']
    }
}