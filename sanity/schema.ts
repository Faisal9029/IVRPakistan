import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import youtubeVideo from "./schemas/youtubeVideo";
import patientReview from "./schemas/patientReview";
import procedure from "./schemas/procedure";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([youtubeVideo, patientReview, procedure]),
});
