export const ozAttributes = (
  data:
    | Record<string, string | ISpecsOzRes | ISpecsOzRes[] | undefined>
    | undefined
) =>
  data != null
    ? Object.keys(data)
        .filter((key) => {
          const val = data != null ? (data[key] != null ? data[key] : "") : "";
          return Array.isArray(val) ? val.length > 0 : val;
        })
        .map((key) => {
          const val = data != null ? (data[key] != null ? data[key] : "") : "";
          if (Array.isArray(val)) {
            return {
              id: +key,
              values: val.map((v) => ({
                dictionary_value_id: v.attribute_id,
                value: v.attribute_value,
              })),
            };
          } else if (typeof val === "string") {
            return {
              id: +key,
              values: [{ value: val }],
            };
          } else if (val) {
            return {
              id: +key,
              values: [
                {
                  dictionary_value_id: val.attribute_id,
                  value: val.attribute_value,
                },
              ],
            };
          } else {
            return {
              id: +key,
              values: [{ value: "" }],
            };
          }
        })
    : [];
