import TextInput from "../../../../components/text-input/text-input";
import Checkbox from "../../../../components/checkbox/checkbox";
import { FIELDS } from "../../../../constant/news";
import DateInput from "../../../../components/date-input/date-input";
import UploadMedia from "../../../../components/uploads/upload-media/upload-media";

import styles from "./styles.module.scss";

const Form = ({ control, mediaList, errors }) => {
  return (
    <div className={styles.form}>
      {FIELDS.filter((field) => field.type !== "checkbox").map((field, i) => (
        <div key={i}>
          {field.type === "date" ? (
            <DateInput
              name={field.name}
              control={control}
              className={styles.dateInput}
              placeholder={field.placeholder}
            />
          ) : field.type === "img" ? (
            <UploadMedia
              multiple={false}
              control={control}
              name={field.name}
              mediaId={field.mediaId}
              title={field.placeholder}
              mediaList={mediaList[field.mediaId] || []}
              disabled={
                mediaList[field.mediaId] && mediaList[field.mediaId].length > 0
              }
            />
          ) : (
            <TextInput
              size="small"
              name={field.name}
              type={field.type}
              control={control}
              className={styles.input}
              error={errors[field.name]?.message}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      {FIELDS.filter((field) => field.type === "checkbox").map((field, i) => (
        <div key={`checkbox-${i}`}>
          <Checkbox name={field.name} label={field.label} control={control} />
        </div>
      ))}
    </div>
  );
};

export default Form;
