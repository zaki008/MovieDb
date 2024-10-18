import { alertMessage, validateCreateMovie } from "@/utils";
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Image, Modal, Upload } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import TextInput from "../TextInput";
import styles from "./ModalCreate.module.css";
dayjs.extend(customParseFormat);

const ModalCreate = ({
  isModalOpen,
  setIsModalOpen,
  movies,
  handleChangeMovie,
  form,
  setForm,
  idEdit,
}) => {
  const handleReset = () => {
    setForm({
      title: "",
      rating: "",
      image: null,
      preview: null,
      releaseDate: moment(),
    });
  };

  const handleChangeForm = (updates) => {
    setForm((prev) => ({
      ...prev,
      ...(typeof updates === "function" ? updates(prev) : updates),
    }));
  };

  const handleRating = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    const isValidDecimal = /^(\d*\.?\d{0,2})?$/.test(numericValue);

    if (isValidDecimal) {
      const numericRating = parseFloat(numericValue);
      if (numericValue === "" || (numericRating >= 1 && numericRating <= 10)) {
        handleChangeForm({ rating: numericValue });
      }
    }
  };
  const onChangeFromDate = (date, stringDate) => {
    handleChangeForm({ releaseDate: stringDate });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleChange = ({ file }) => {
    if (file.status === "done") {
      handleChangeForm({
        preview: URL.createObjectURL(file.originFileObj),
        image: file,
      });
      return;
    }
    if (file.status === "error") {
      alertMessage("Gagal Upload", "error");
    }
  };

  const handleSubmit = () => {
    console.log("form", form);
    if (!validateCreateMovie(form)) {
      return;
    }
    if (idEdit) {
      const updatedData = movies.results.map((item) => {
        if (item.id === idEdit) {
          return {
            ...item,
            original_title: form.title,
            poster_path: form.image,
            release_date: form.releaseDate,
            title: form.title,
            vote_average: Number(form.rating),
          };
        }
        return item;
      });
      handleChangeMovie({
        results: updatedData,
      });
    } else {
      const data = {
        adult: false,
        backdrop_path: form.image,
        genre_ids: [28, 80, 53],
        id: uuidv4(),
        original_language: "en",
        original_title: form.title,
        overview:
          "When a crime scene clean up crew discovers a briefcase full of money, they must out smart a criminal kingpin and corrupt FBI agents who want it back.",
        popularity: 564.368,
        poster_path: form.image,
        release_date: form.releaseDate,
        title: form.title,
        video: false,
        vote_average: Number(form.rating),
        vote_count: 4,
      };
      handleChangeMovie((prev) => ({
        results: [data, ...prev.results],
      }));
    }
    setIsModalOpen(false);
    handleReset();
  };

  return (
    <>
      <Modal
        title="Create Movie"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <TextInput
          label={"Title"}
          placeholder={"Input Title"}
          value={form.title}
          onChange={(e) => handleChangeForm({ title: e.target.value })}
        />
        <TextInput
          label={"Rating"}
          value={form.rating}
          onChange={handleRating}
          placeholder="Rating (1-10)"
          keyboardType="numeric"
        />
        <div className={styles.containerInput}>
          <p className={styles.labelInput}>{"Release Date"}</p>
          <DatePicker
            style={{ width: "100%", marginBottom: 10 }}
            onChange={onChangeFromDate}
            value={dayjs(moment(form.releaseDate)) || dayjs(moment())}
            allowClear={false}
          />
        </div>
        <div className={styles.containerInput}>
          <p className={styles.labelInput}>{"Image"}</p>
          <Upload
            accept="image/*"
            onChange={handleChange}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {form.preview && (
            <div style={{ marginTop: 16 }}>
              <h3>Image Preview:</h3>
              <Image
                src={form.preview}
                alt="Image Preview"
                style={{ width: "100px", height: "auto" }}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ModalCreate;
