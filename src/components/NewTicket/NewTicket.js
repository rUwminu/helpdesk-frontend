import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { gql, useMutation } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'
import { createNewTicket } from '../../redux/action/ticketAction'

// firebase
import storage from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { CheckCircle, CloudUpload, Cancel, Close } from '@mui/icons-material'
import { async } from '@firebase/util'

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const NewTicket = ({ state, toggle }) => {
  const dispatch = useDispatch()
  const [files, setFiles] = useState([])
  const [newTicket, setNewTicket] = useState({
    body: '',
    images: [],
    isUrgent: false,
  })
  const [isActive, setIsActive] = useState(false)
  const [isError, setIsError] = useState({})
  const [isUploaded, setIsUploaded] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsUploaded(false)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    accept: 'image/*',
  })

  const [saveNewTicket] = useMutation(CREATE_NEW_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data: { createTicket } }) {
      console.log(createTicket)
      dispatch(createNewTicket(createTicket))
    },
    onError(err) {
      console.log(err)
    },
    variables: newTicket,
  })

  const thumbs = files.map((file) => (
    <div key={file.name} className='img-container'>
      <img src={file.preview} alt='uploaded' />
      <div>{file.size} Bytes</div>
    </div>
  ))

  const uploadAllFile = () => {
    if (files.length > 0) {
      files.forEach((file) => {
        const fileName = new Date().getTime() + file.path + file.name
        const storageRef = ref(storage, `/items/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        //console.log(file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          (error) => {
            setIsError({ uploadErr: 'Images Only, or file too big' })
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setNewTicket((prev) => {
                return { ...prev, images: [...prev.images, url] }
              })
            })
          }
        )
      })
    } else {
      return
    }
  }

  const handleCreateTicket = () => {
    if (newTicket.body !== '') {
      saveNewTicket()
    }
  }

  const handleUploadImage = async () => {
    setIsError({})

    if (newTicket.body !== '') {
      setIsActive(true)
      await uploadAllFile()
    }

    setTimeout(() => {
      setIsActive(false)
      setIsUploaded(true)
    }, 13000)
  }

  console.log(newTicket)

  return (
    <MainContainer
      className={`${state ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
    >
      <Card className={`${!state && 'hidden'}`} color={isError}>
        <div className='top-card'>
          <h1>Create New Ticket</h1>
          <div onClick={() => toggle(false)} className='icons'>
            <Close />
          </div>
        </div>

        <div className='input-items'>
          <textarea
            onChange={(e) =>
              setNewTicket({ ...newTicket, body: e.target.value })
            }
            type='textarea'
            rows='4'
            cols='50'
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
        <div className='btn-container'>
          <label
            onChange={() =>
              setNewTicket({ ...newTicket, isUrgent: !newTicket.isUrgent })
            }
            className='checkbox'
          >
            <input type='checkbox' />
            Urgent?
          </label>

          {files.length > 0 ? (
            <>
              {!isUploaded ? (
                <UploadBtn
                  onClick={() => handleUploadImage()}
                  className={`${isActive && 'active'}`}
                >
                  {!Object.keys(isError).length ? (
                    <div className='completed'>
                      <CheckCircle className='icons' />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className='error'>
                      <Cancel className='icons' />
                      <span>Error</span>
                    </div>
                  )}
                  <div className='upload'>
                    <CloudUpload className='icons' />
                    <span>Upload</span>
                  </div>
                </UploadBtn>
              ) : (
                <div
                  onClick={() => handleCreateTicket()}
                  className='submit-btn'
                >
                  Create Ticket
                </div>
              )}
            </>
          ) : (
            <div onClick={() => handleCreateTicket()} className='submit-btn'>
              Create Ticket
            </div>
          )}
        </div>
      </Card>
    </MainContainer>
  )
}

const CREATE_NEW_TICKETS = gql`
  mutation createTicket($body: String!, $images: [String], $isUrgent: Boolean) {
    createTicket(
      ticketInput: { body: $body, images: $images, isUrgent: $isUrgent }
    ) {
      id
      typeTicket
      username
      body
      images
      isUrgent
      isResolved
      comments {
        id
        username
        body
        createdAt
      }
      createdAt
    }
  }
`

const MainContainer = styled.div`
  ${tw`
    fixed
    top-0
    bottom-0
    left-0
    right-0
    w-screen
    h-full
    min-h-[100vh]
    flex
    items-center
    justify-center
    px-4
    py-10
    bg-gray-800
    bg-opacity-30
    transition-all
    duration-500
    ease-in-out
    z-20
  `}
`

const Card = styled.div`
  ${tw`
        flex
        flex-col
        items-start
        justify-between
        p-4
        w-full
        h-full
        max-h-[35rem]
        md:max-w-lg
        bg-gray-700
        rounded-md
        z-30
    `}

  overflow-y: hidden;

  :hover,
  :active,
  :focus {
    overflow-y: auto;
    overflow-y: overlay;
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

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
        mx-2
        flex
        items-center
        justify-start
        text-lg
        text-red-500
        font-semibold
        cursor-pointer
      `}

      input {
        ${tw`
          mr-2
        `}
      }
    }

    .submit-btn {
      ${tw`
        flex
        items-center
        justify-center
        mt-4
        w-[176px]
        h-[40px]
        text-lg
        text-gray-200
        bg-blue-600
        font-semibold
        rounded-3xl
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:bg-blue-700
        hover:shadow-md
    `}
    }

    // Button Animation --------------------
    .active {
      width: 100%;
      height: 15px;
      animation: btn_width 4.5s linear forwards;
      animation-delay: 5s;
    }

    .active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: ${(props) => {
        if (Object.keys(props.color).length) {
          return '#DC143C'
        } else {
          return '#5c5cff'
        }
      }};
      animation: before_active 10s linear forwards;
      animation-delay: 1.5s;
    }

    .active::after {
      content: 'Done';
      position: absolute;
      top: 50%;
      left: 50%;
      color: white;
      font-size: 0.8rem;
      transform: translate(-50%, -50%) scale(0);
      transition: 0.3s;
      animation: check_scale 2s linear forwards;
      animation-delay: 8.5s;
    }

    .active .completed {
      animation: top_bottom 1.3s linear forwards;
      animation-delay: 6.5s;
    }

    .active .error {
      animation: top_bottom 1.3s linear forwards;
      animation-delay: 6.5s;
    }

    .active .upload {
      transform: translate(-50%, 60px);
      animation: bottom_top 0.5s linear forwards;
      animation-delay: 12s;
    }

    @keyframes before_active {
      0% {
        width: 0%;
        height: 100%;
      }
      30%,
      95% {
        width: 100%;
        height: 100%;
      }
      100% {
        width: 100%;
        height: 0%;
      }
    }

    @keyframes btn_width {
      0% {
        width: 100%;
        height: 15px;
      }
      20%,
      70% {
        width: 176px;
        height: 40px;
      }
      80%,
      90% {
        width: 50px;
        height: 50px;
      }
      100% {
        width: 176px;
        height: 40px;
      }
    }

    @keyframes top_bottom {
      0% {
        transform: translate(-50%, -60px);
      }
      20%,
      90% {
        top: 50%;
        transform: translate(-50%, -50%);
      }
      100% {
        top: 130%;
        transform: translate(-50%, -50%);
      }
    }

    @keyframes bottom_top {
      0% {
        transform: translate(-50%, 60px);
      }
      20%,
      90% {
        top: 50%;
        transform: translate(-50%, -50%);
      }
      100% {
        transform: translate(-50%, -50%);
      }
    }

    @keyframes check_scale {
      0% {
        transform: translate(-50%, -50%) scale(0);
      }
      20%,
      90% {
        transform: translate(-50%, -50%) scale(1.3);
      }
      100% {
        transform: translate(-50%, 100px) scale(1.3);
      }
    }
  }
`

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
`

const UploadBtn = styled.div`
  ${tw`
    mt-4
    relative
    w-[176px]
    h-[40px]
    text-lg
    bg-gray-600
    text-gray-400
    font-semibold
    cursor-pointer
    rounded-3xl

    ease-in-out
    overflow-hidden
  `}

  transition: 0.8s;
  transition-delay: 0.5s;

  .icons {
    ${tw`
        w-6
        h-6
        mr-2
    `}
  }

  .completed {
    ${tw`
        absolute
        top-[0%]
        left-[50%]
        flex
        items-center
        justify-center
        text-gray-900
    `}
    transform: translate(-50%, -60px);
    white-space: nowrap;
  }

  .error {
    ${tw`
        absolute
        top-[0%]
        left-[50%]
        flex
        items-center
        justify-center
        text-gray-900
    `}
    transform: translate(-50%, -60px);
    white-space: nowrap;
  }

  .upload {
    ${tw`
        absolute
        top-[50%]
        left-[50%]
        flex
        items-center
        justify-center
    `}
    transition: 0.3s;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
`

export default NewTicket
