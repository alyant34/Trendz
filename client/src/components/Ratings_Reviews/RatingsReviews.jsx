import React, { useState, useEffect } from 'react';
import ReviewSummary from './ReviewSummary.jsx';
import ReviewDetail from './ReviewDetail.jsx';
import axios from 'axios';


const RatingsReviews = ({productId}) => {
  const [data, setData] = useState({
    'product_id': '19089',
    'ratings': {
      '1': '100',
      '2': '1',
      '3': '30',
      '4': '0',
      '5': '0'
    },
    'recommended': {
      'false': '21',
      'true': '41'
    },
    'characteristics': {
      'Fit': {
        'id': 64059,
        'value': '5'
      },
      'Length': {
        'id': 64060,
        'value': '5'
      },
      'Comfort': {
        'id': 64061,
        'value': '5'
      },
      'Quality': {
        'id': 64062,
        'value': '5'
      }
    }});

  const [reviewDetailData, setReviewDetailData] = useState({
    'product': '19089',
    'page': 0,
    'count': 5,
    'results': [
      {
        'review_id': 348034,
        'rating': 3,
        'summary': 'I\'m enjoying wearing these shades',
        'recommend': false,
        'response': null,
        'body': 'Comfortable and practical.',
        'date': '2021-04-21T00:00:00.000Z',
        'reviewer_name': 'debugger',
        'helpfulness': 8,
        'photos': [
          {
            'id': 614222,
            'url': 'urlplaceholder/review_5_photo_number_2.jpg'
          },
          {
            'id': 614223,
            'url': 'urlplaceholder/review_5_photo_number_1.jpg'
          }
        ]
      },
      {
        'review_id': 348032,
        'rating': 3,
        'summary': 'I\'m enjoying wearing these shades',
        'recommend': false,
        'response': null,
        'body': 'Comfortable and practical.',
        'date': '2021-04-21T00:00:00.000Z',
        'reviewer_name': 'debugger',
        'helpfulness': 1,
        'photos': [
          {
            'id': 614218,
            'url': 'urlplaceholder/review_5_photo_number_2.jpg'
          },
          {
            'id': 614219,
            'url': 'urlplaceholder/review_5_photo_number_1.jpg'
          }
        ]
      },
      {
        'review_id': 348031,
        'rating': 3,
        'summary': '',
        'recommend': true,
        'response': null,
        'body': '',
        'date': '2021-04-21T00:00:00.000Z',
        'reviewer_name': 'debugger',
        'helpfulness': 0,
        'photos': [
          {
            'id': 614216,
            'url': 'urlplaceholder/review_5_photo_number_1.jpg'
          },
          {
            'id': 614217,
            'url': 'urlplaceholder/review_5_photo_number_2.jpg'
          }
        ]
      },
      {
        'review_id': 406633,
        'rating': 3,
        'summary': 'nice',
        'recommend': true,
        'response': null,
        'body': 'ver nice',
        'date': '2021-06-07T00:00:00.000Z',
        'reviewer_name': 'bob',
        'helpfulness': 0,
        'photos': []
      },
      {
        'review_id': 406632,
        'rating': 3,
        'summary': 'nice',
        'recommend': true,
        'response': null,
        'body': 'ver nice',
        'date': '2021-06-07T00:00:00.000Z',
        'reviewer_name': 'bob',
        'helpfulness': 0,
        'photos': []
      }
    ]
  });

  const getAllReviewsMeta = () => {
    axios.get(`/reviews/meta/?product_id=${productId}`)
      .then(({data}) => {
        setData(data);
      });
  };

  useEffect(() => {
    getAllReviewsMeta();
  }, []);

  return (
    <div className='ratings_reviews'>
      <h3>RATINGS & REVIEWS</h3>
      <div className='parentReview'>
        <ReviewSummary data={data}/>
        <ReviewDetail detail={reviewDetailData}/>
      </div>
    </div>
  );
};

export default RatingsReviews;