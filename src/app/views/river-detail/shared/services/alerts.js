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
  // does this need to be sent as JSON

  const data = {
    post: {
      title: 'Lorem Ipsum',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      post_type: 'WARNING',
      post_date: Date.now(),
      reach_id: 356,
      gauge_id: null,
      user_id: 153461,
      metric_id: null,
      reading: null
    }
  }

  return httpClient.post('/graphql', {
    query: `
      mutation {
          postCreate(${data})
          id
      }
        `
  })
}

export { fetchAlertsData, createAlert }
