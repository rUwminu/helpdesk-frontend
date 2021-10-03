import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { data } from '../../assets/dumpData/Data'

import { CheckCircle } from '@mui/icons-material'

const JobInfo = () => {
  const { id } = useParams()
  const [isFilter, setIsFilter] = useState(null)

  const getJobDetail = () => {
    if (id) {
      const flitedJob = data.find((job) => job.id == id)
      setIsFilter(flitedJob)
    } else {
      setIsFilter(data[0])
    }
  }

  useEffect(() => {
    getJobDetail()
  }, [id])

  return (
    <>
      {isFilter && (
        <Container>
          <div className='title-container'>
            <div className='title-info'>
              <h1>{isFilter.jobtitle}</h1>
              <p>
                {isFilter.country}, {isFilter.location}
              </p>
            </div>
            <div className='title-postby'>
              <h2>Posted 4 days ago</h2>
              <p>by {isFilter.company}</p>
            </div>
          </div>
          <div className='job-highlight'>
            <div className='list-items'>
              <h3>Experience</h3>
              <p>{isFilter.level}</p>
            </div>
            <div className='list-items'>
              <h3>Location</h3>
              <p>
                {isFilter.country}, {isFilter.location}
              </p>
            </div>
            <div className='list-items'>
              <h3>Experience</h3>
              <p>
                ${isFilter.salarymin} - ${isFilter.salarymax}/hr
              </p>
            </div>
          </div>
          <div className='job-desc'>
            <h2>Company Overview</h2>
            <p>{isFilter.desc}</p>
          </div>
          <div className='job-require'>
            <h2>Company Overview</h2>
            {isFilter.requirement.map((x, index) => (
              <p key={index}>
                <CheckCircle className='icon' />
                {x}
              </p>
            ))}
          </div>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  ${tw`
    p-10
    mt-12
    w-full
    max-w-lg
    bg-gray-800
    rounded-md
  `}

  .title-container {
    ${tw`
      w-full
      flex
      items-center
      justify-between
    `}

    .title-info {
      ${tw`
        flex
        flex-col
        items-start
        justify-center
      `}

      h1 {
        ${tw`
          text-lg
          text-gray-200
          font-bold
        `}
      }

      p {
        ${tw`
          text-lg
          text-gray-400
        `}
      }
    }

    .title-postby {
      ${tw``}

      h2 {
        ${tw`
          text-lg
          text-gray-200
        `}
      }

      p {
        ${tw`
          text-lg
          text-gray-400
        `}
      }
    }
  }

  .job-highlight {
    ${tw`
      my-8
      p-4
      w-full
      flex
      items-center
      justify-between
      bg-gray-900
      rounded-md
    `}

    .list-items {
      h3 {
        ${tw`
          font-semibold
          text-gray-200
        `}
      }

      p {
        ${tw`
          text-gray-400
        `}
      }
    }
  }

  .job-desc {
    ${tw`
      mb-4
    `}

    h2 {
      ${tw`
        mb-4
        text-lg
        font-semibold
        text-gray-200
      `}
    }

    p {
      ${tw`
        text-gray-400
      `}
    }
  }

  .job-require {
    ${tw`
      mb-4
    `}

    h2 {
      ${tw`
        mb-4
        text-lg
        font-semibold
        text-gray-200
      `}
    }

    p {
      ${tw`
        mb-2
        flex
        items-center
        justify-start
        text-gray-400
      `}

      .icon {
        ${tw`
          mr-2
          text-blue-600
        `}
      }
    }
  }
`

export default JobInfo
