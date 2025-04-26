const DEFAULT_VALUES = {
  active: 0,
  start_of_activity: "",
  end_of_activity: "",
  sort_number: null,

  title_am: "",
  short_description_am: "",
  description_am: "",
  image_am: "",

  title_en: "",
  short_description_en: "",
  description_en: "",
  image_en: "",

  title_ru: "",
  short_description_ru: "",
  description_ru: "",
  image_ru: "",

  detailed_image: "",
};

const FIELDS = [
  {
    name: "active",
    type: "checkbox",
    placeholder: "Active",
    label: "Active",
  },

  {
    name: "start_of_activity",
    type: "date",
    placeholder: "Start of activity",
  },

  {
    name: "end_of_activity",
    type: "date",
    placeholder: "End of activity",
  },

  {
    name: "sort_number",
    type: "number",
    placeholder: "Sort number",
  },

  {
    name: "title_am",
    type: "text",
    placeholder: "Title (AM)",
  },

  {
    name: "short_description_am",
    // is editor ?
    type: "text",
    placeholder: "Short Description (AM)",
  },

  {
    name: "description_am",
    // is editor ?
    type: "text",
    placeholder: "Description (AM)",
  },

  {
    name: "title_en",
    type: "text",
    placeholder: "Title (EN)",
  },

  {
    name: "short_description_en",
    // is editor ?
    type: "text",
    placeholder: "Short Description (EN)",
  },

  {
    name: "description_en",
    // is editor ?
    type: "text",
    placeholder: "Description (EN)",
  },

  {
    name: "title_ru",
    type: "text",
    placeholder: "Title (RU)",
  },

  {
    name: "short_description_ru",
    // is editor ?
    type: "text",
    placeholder: "Short Description (RU)",
  },

  {
    name: "description_ru",
    // is editor ?
    type: "text",
    placeholder: "Description (RU)",
  },

  {
    name: "image_am",
    type: "img",
    mediaId: "am",
    placeholder: "Download image (AM)",
    accept: "image/*",
  },

  {
    name: "image_en",
    type: "img",
    mediaId: "en",
    placeholder: "Download image (EN)",
    accept: "image/*",
  },

  {
    name: "image_am",
    type: "img",
    mediaId: "ru",
    placeholder: "Download image (RU)",
    accept: "image/*",
  },

  {
    name: "detailed_image",
    type: "img",
    mediaId: "detailed_image",
    placeholder: "Detailed Image/video",
    accept: "image/*,video/*",
  },
];

export { DEFAULT_VALUES, FIELDS };
