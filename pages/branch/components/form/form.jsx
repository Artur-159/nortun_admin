import { FORM_FIELDS } from "../../../../constant/branch";
import TextInput from "../../../../components/text-input/text-input";
import Checkbox from "../../../../components/checkbox/checkbox";
import UploadMedia from "../../../../components/uploads/upload-media/upload-media";

import styles from "./styles.module.scss";

const Form = ({ control, mediaList }) => {
  return (
    <div className={styles.form}>
      {FORM_FIELDS.filter((field) => field.type !== "checkbox").map((field) => (
        <div key={field.id}>
          <TextInput
            name={field.name}
            type={field.type}
            control={control}
            placeholder={field.placeholder}
            size="small"
          />
        </div>
      ))}
      <UploadMedia
        control={control}
        name="image"
        multiple={false}
        mediaId="main_image"
        mediaList={mediaList["main_image"]}
        disabled={mediaList["main_image"]?.length > 0}
      />
      <UploadMedia
        name="images"
        control={control}
        mediaId="images"
        className={styles.video_inp}
        mediaList={mediaList["images"] || []}
      />
          {FORM_FIELDS.filter((field) => field.type === "checkbox").map((field) => (
        <div key={`checkbox-${field.id}`}>
          <Checkbox name={field.name} label={field.label} control={control} />
        </div>
      ))}
    </div>
  );
};

export default Form;
