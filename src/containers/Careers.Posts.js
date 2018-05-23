import React from 'react'
import { CareersPostContainer, CareersPost } from '../components/Careers.Post'

export const CareerPosts = ({ posts }) => {
  return (
    <CareersPostContainer>
      {posts.map((edge, index) => {
        const { node } = edge

        return <CareersPost node={node} open={index === 0} />
      })}
    </CareersPostContainer>
  )
}
