import React from 'react'
import Gig from '../../Components/Gig/Gig';

const gigDataArray = [
    {
      username: 'Reetik',
      gigImg: 'https://source.unsplash.com/random/150x150/?nature',
      rating: 4.8,
      noOfRating: 120,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
      price: 1231,
    },
    {
      username: 'John',
      gigImg: 'https://source.unsplash.com/random/150x150/?technology',
      rating: 4.5,
      noOfRating: 90,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
      price: 1500,
    },
    {
      username: 'Emma',
      gigImg: 'https://source.unsplash.com/random/150x150/?food',
      rating: 4.2,
      noOfRating: 80,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
      price: 1100,
    },
    {
      username: 'Michael',
      gigImg: 'https://source.unsplash.com/random/150x150/?food',
      rating: 4.9,
      noOfRating: 150,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
      price: 1800,
    },
    {
        username: 'Emma',
        gigImg: 'https://source.unsplash.com/random/150x150/?food',
        rating: 4.2,
        noOfRating: 80,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
        price: 1100,
      },
      {
        username: 'Michael',
        gigImg: 'https://source.unsplash.com/random/150x150/?food',
        rating: 4.9,
        noOfRating: 150,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
        price: 1800,
      },
      {
        username: 'Emma',
        gigImg: 'https://source.unsplash.com/random/150x150/?food',
        rating: 4.2,
        noOfRating: 80,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
        price: 1100,
      },
      {
        username: 'Michael',
        gigImg: 'https://source.unsplash.com/random/150x150/?food',
        rating: 4.9,
        noOfRating: 150,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
        price: 1800,
      },
      {
        username: 'Emma',
        gigImg: 'https://source.unsplash.com/random/150x150/?food',
        rating: 4.2,
        noOfRating: 80,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
        price: 1100,
      },
      {
        username: 'Michael',
        gigImg: 'https://source.unsplash.com/random/150x150/?food',
        rating: 4.9,
        noOfRating: 150,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius velit voluptates tenetur minus eligendi illum repellendus nisi exercitationem reiciendis alias, tempora, quisquam officiis, optio rem. Officia incidunt dolores ut enim.',
        price: 1800,
      },
  ];

export default function Home() {
  return (
    <div className='h-100 w-100'>
      <div className='d-flex flex-wrap'>
        {
            gigDataArray.map((item) => <Gig gigData={item} />)
        }
      </div>
    </div>
  )
}
