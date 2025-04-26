import TextEditor from "../../../../components/text-editor/text-editor";
import TextInput from "../../../../components/text-input/text-input";
import UploadMedia from "../../../../components/uploads/upload-media/upload-media";

import styles from "../../about.module.scss";

const Form = ({ control, image }) => {
  return (
    <>
      <TextInput
        name="title"
        size="small"
        control={control}
        placeholder="Title"
        className={styles.input}
      />
      {["am", "ru", "en"].map((lang, index) => (
        <div key={index}>
          <h3>{`Description (${lang.toUpperCase()})`}</h3>
          <TextEditor
            control={control}
            name={`description_${lang}`}
            className={styles.about_info}
            placeholder={`Description (${lang.toUpperCase()})`}
          />
        </div>
      ))}
      <UploadMedia
        name="image"
        control={control}
        mediaId="about_image"
        mediaList={image?.about_image}
      />
    </>
  );
};

export default Form;

