import { FIELDS } from "../../../../constant/partner";
import TextInput from "../../../../components/text-input/text-input";
import Checkbox from "../../../../components/checkbox/checkbox";
import UploadMedia from "../../../../components/uploads/upload-media/upload-media";

import styles from "./styles.module.scss";

const Form = ({ control }) => {
  return (
    <div className={styles.form}>
      {FIELDS.map((field) => (
        <div key={field.id}>
          {field.type === "checkbox" ? (
            <Checkbox name={field.name} label={field.label} control={control} />
          ) : (
            <TextInput
              name={field.name}
              type={field.type}
              control={control}
              placeholder={field.placeholder}
              size="small"
              className={styles.input}
            />
          )}
        </div>
      ))}
      <UploadMedia control={control} name="image" />
    </div>
  );
};

export default Form;
