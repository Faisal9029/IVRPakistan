import { type SchemaTypeDefinition } from '@sanity/types'
import { patientReview } from './patientReview'
import { service } from './service'
import { socialVideo } from './socialVideo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [patientReview, service, socialVideo],
}
