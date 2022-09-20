// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'survey',
      title: 'Survey Data',
      type: 'document',
      fields: [
        {
          name: 'age',
          title: 'Age',
          type: 'number'
        },
        {
          name: 'gender',
          title: 'Gender',
          type: 'string'
        },
        {
          name: 'license',
          title: 'License',
          type: 'string'
        },
        {
          name: 'isFirstCar',
          title: 'Is this your first car ?',
          type: 'string'
        },
        {
          name: 'driveTrain',
          title: 'Which drivetrain do you prefer ?',
          type: 'string'
        },
        {
          name: 'fuelEmission',
          title: 'Are you worried about fuel emission?',
          type: 'string'
        },

        {
          name: 'noOfCars',
          title: 'How many cars do you have in your family?',
          type: 'number'
        },
        {
          name: 'cars',
          title: 'Car Model',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }
  ]),
})

