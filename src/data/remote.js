import { taggedSum } from "daggy";

const Remote = taggedSum("Remote", {
  NotAsked: [],
  Loading: [],
  Failure: ["error"],
  Success: ["data"]
});

export default Remote;
