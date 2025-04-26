import clsx from "clsx";
import TextInput from "../../../../components/text-input/text-input";
import UploadMedia from "../upload/videos-images";
import TextEditor from "../../../../components/text-editor/text-editor";
import { bannerFields } from "../../../../utils/home-banner";

import styles from "../../styles.module.scss";

const Form = ({ control, status, banners }) => {
  return (
    <>
      <div className={styles.home_banner_inp}>
        {bannerFields.map((field) => {
          const FieldComponent = field.component;
          return (
            <div key={field.id} className={field.wrapperClass || ""}>
              <FieldComponent
                {...field.props}
                control={control}
                className={clsx(styles[field.wrapperClass])}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.banner_video_block}>
        {["am", "ru", "en"].map((lang) => (
          <div key={lang} className={styles.home_banner_video}>
            <TextInput
              type="text"
              name={`title_${lang}`}
              placeholder={`Title_${lang}`}
              control={control}
              className={styles.banner_title}
              size="small"
            />
            <TextEditor
              name={`description_${lang}`}
              placeholder={`Description ${lang}`}
              control={control}
            />
            <UploadMedia
              status={status}
              multiple={false}
              control={control}
              name={`path_${lang}`}
              images={banners[`path_${lang}`]}
              title={`Choose video / image for ${lang}`}
              className={styles.video_inp}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Form;
