import { FIELDS } from "../../../../constant/partner";
import TextInput from "../../../../components/text-input/text-input";
import Checkbox from "../../../../components/checkbox/checkbox";
import UploadMedia from "../../../../components/uploads/upload-media/upload-media";
import TextEditor from "../../../../components/text-editor/text-editor";

import styles from "./styles.module.scss";

const getFieldComponent = (field, control) => {
  const { type, name, label, placeholder } = field;

  const fieldProps = {
    name,
    control,
    placeholder,
    className: styles.input,
    size: "small",
  };

  switch (type) {
    case "textEditor":
      return <TextEditor {...fieldProps} />;
    case "checkbox":
      return <Checkbox {...fieldProps} label={label} />;
    default:
      return <TextInput {...fieldProps} type={type} />;
  }
};

const Form = ({ control, mediaList }) => {
  return (
    <div className={styles.form}>
     {FIELDS.map((field) => (
        <div key={field.name}>{getFieldComponent(field, control)}</div>
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
       
    </div>
  );
};

export default Form;
