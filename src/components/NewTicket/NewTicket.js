import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { Close } from "@mui/icons-material";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const NewTicket = ({ state, toggle }) => {
  const [files, setFiles] = useState([]);
  const [newTicket, setNewTicket] = useState({
    body: "",
    images: [],
  });

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    accept: "image/*",
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="img-container">
      <img src={file.preview} alt="uploaded" />
      <div>{file.size} Bytes</div>
    </div>
  ));

  const uploadAllFile = () => {
    if (files.length > 0) {
      files.forEach((file) => {
        const fileName = new Date().getTime() + file.path + file.name;
        const storageRef = ref(storage, `/items/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        console.log(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setNewTicket((prev) => {
                return { ...prev, images: [...prev.images, url] };
              });
            });
          }
        );
      });
    } else {
      return;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await uploadAllFile();
  };

  //console.log(files)

  return (
    <MainContainer
      className={`${state ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
    >
      <Card className={`${!state && "hidden"}`}>
        <div className="top-card">
          <h1>Create New Ticket</h1>
          <div onClick={() => toggle(false)} className="icons">
            <Close />
          </div>
        </div>

        <div className="input-items">
          <textarea
            onChange={(e) =>
              setNewTicket({ ...newTicket, body: e.target.value })
            }
            type="textarea"
            rows="4"
            cols="50"
            required
          />
          <span>Write Your Description Here...</span>
        </div>
        <Container
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <aside>{thumbs}</aside>
        </Container>
        <div className="btn-container">
          <div className="checkbox">
            <input type="checkbox" />
            <span>Urgent?</span>
          </div>

          <button onClick={(e) => handleUpload(e)} className="submit-btn">
            Upload Image
          </button>
        </div>
      </Card>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${tw`
    fixed
    top-0
    bottom-0
    left-0
    right-0
    w-screen
    h-screen
    flex
    items-center
    justify-center
    px-4
    bg-gray-800
    bg-opacity-50
    transition-all
    duration-500
    ease-in-out
    z-20
  `}
`;

const Card = styled.div`
  ${tw`
        flex
        flex-col
        items-start
        justify-between
        p-4
        w-full
        md:max-w-lg
        bg-gray-700
        rounded-md
        z-30
    `}

  .top-card {
    ${tw`
        mb-4
        w-full
        flex
        items-center
        justify-between
    `}

    h1 {
      ${tw`
        text-xl
        font-semibold
        text-gray-200
    `}
    }

    .icons {
      ${tw`
        p-2
        text-gray-200
        cursor-pointer
        rounded-full
        transition
        duration-200
        ease-in-out
        hover:bg-gray-500
      `}
    }
  }

  .input-items {
    ${tw`
      relative
      w-full
      mb-8
      border
      border-gray-400
      rounded-sm
    `}

    textarea {
      ${tw`
        pt-6
        pb-4
        px-4
        w-full
        text-gray-200
        bg-transparent
        focus:outline-none
      `}
    }

    span {
      ${tw`
        absolute
        py-2
        left-4
        text-gray-400
        transition
        duration-500
        ease-in-out
      `}
      pointer-events: none;
    }

    textarea:focus ~ span,
    textarea:valid ~ span {
      ${tw`
          text-sm
          text-gray-400
          translate-y-[-10px]
        `}
    }
  }

  .btn-container {
    ${tw`
      w-full
      flex
      items-center
      justify-between
    `}

    .checkbox {
      ${tw`
        ml-2
        flex
        items-center
        justify-start
      `}

      span {
        ${tw`
          ml-2
          text-red-500
          font-semibold
        `}
      }
    }

    .submit-btn {
      ${tw`
        py-2
        mt-6
        w-full
        max-w-[15rem]
        text-lg
        text-center
        text-gray-200
        bg-blue-600
        font-semibold
        rounded-sm
        transition
        duration-200
        ease-in-out
        hover:bg-blue-700
        hover:shadow-md
    `}
    }
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;

  aside {
    ${tw`
        mt-2
        flex
        flex-wrap
        items-center
        justify-start
        w-full
    `}
  }

  .img-container {
    ${tw`
        flex
        flex-col
        mr-4
        mt-4
      `}

    img {
      ${tw`
        w-40
        h-40
        border
        object-cover
        rounded-md
      `}
    }
  }
`;

export default NewTicket;
