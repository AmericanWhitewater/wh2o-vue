import { httpClient } from '@/app/global/services'

const fetchAlertsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach(id:${data}){
            posts(post_type: WARNING, first:10, page:1) {
                data {
                    id,
                    title,
                    detail,
                    post_date,
                    revision,
                    post_type,
                    user {
                        uname,
                        uid,
                        image {
                            uri{
                                thumb,
                                medium,
                                big
                            }
                        }
                    }
                }
            }
            }
        }
    
    `
    })
    .then(res => res.data)
}

const createAlert = () => {
  const data = {
    post: {
      title: 'Lorem Ipsum',
      reach_id: 356,
      gauge_id: null,
      metric_id: null,
      reading: null,
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      post_date: Date.now(),
      post_type: 'WARNING',
      user_id: 153461
    }
  }

  return httpClient.post('/graphql', {
    query: `
            mutation newAlert {
                postCreate(${data})
                id
            }
        
        `
  })
}

export { fetchAlertsData, createAlert }
