import TextInput from "../components/text-input/text-input";
import Checkbox from "../components/checkbox/checkbox";
import DateInput from "../components/date-input/date-input";

/**
 * bannerFields
 *
 * This array defines all "top-level" fields for your banner form.
 * Each object in this array describes:
 *   1. An `id` for a unique React key
 *   2. Which component to render (TextInput, DateInput, Checkbox, etc.)
 *   3. Any props needed by that component (type, name, placeholder, etc.)
 *   4. (Optional) a `wrapperClass` string that can be mapped to a CSS module class
 *      or used with a utility like clsx for styling.
 *
 * By storing these field definitions in one place, you can easily:
 *   - Add or remove fields without modifying the JSX structure in your form
 *   - Dynamically map over them in a component (e.g., <FormBanner />)
 *   - Keep your form logic organized and consistent
 */

export const bannerFields = [
  {
    id: "sort_number",
    component: TextInput,
    props: {
      type: "number",
      name: "sort_number",
      placeholder: "Order",
      size: "small",
    },
    wrapperClass: "home_banner_inp",
  },
  {
    id: "start",
    component: DateInput,
    props: {
      name: "start",
      placeholder: "Start",
    },
    wrapperClass: "banner_date",
  },
  {
    id: "end",
    component: DateInput,
    props: {
      name: "end",
      placeholder: "End",
    },
  },
  {
    id: "url",
    component: TextInput,
    props: {
      type: "text",
      name: "url",
      placeholder: "URL",
      size: "small",
    },
  },
  {
    id: "active",
    component: Checkbox,
    props: {
      name: "active",
      label: "active",
    },
  },
];

/**
 * accumulateBannerData
 *
 * This function merges the existing `banners` data (which might be stored in Redux or elsewhere)
 * with the initial form data for language-specific fields (like 'path_am', 'file_type_en', etc.).
 *
 * It loops through the languages array ["am", "ru", "en"], and for each language:
 *   - Looks up the relevant data in `banners` (e.g., banners['path_am']?.[0]?.['path_am'])
 *   - Merges that data into the `acc` object (which starts as a clone of `initialData`).
 *
 * In other words, this function ensures that your form data for each language-specific field
 * is kept in sync with any previously selected banners or file metadata.
 *
 * @param {Object} banners - An object containing banner data for each language (e.g., from Redux).
 * @param {Object} initialData - The initial form data object.
 * @returns {Object} - A new object containing initialData + the merged language-specific banner data.
 */

function accumulateBannerData(banners, initialData = {}) {
  const languages = ["am", "ru", "en"];

  return languages.reduce(
    (acc, lang) => {
      acc[`path_${lang}`] =
        banners[`path_${lang}`]?.[0]?.[`path_${lang}`] || "";
      acc[`file_type_${lang}`] =
        banners[`path_${lang}`]?.[0]?.[`file_type_${lang}`] || "";
      return acc;
    },
    { ...initialData }
  );
}

export { accumulateBannerData };
