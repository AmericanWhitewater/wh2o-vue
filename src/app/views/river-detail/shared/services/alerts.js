import { httpClient } from '@/app/global/services'

const fetchAlertsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
        query {
            posts(reach_id: "${data}", post_types: WARNING, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
              data {
                id
                title
                detail
                post_date
                revision
                post_type
                permissions {
                  domain
                  permission
                  result
                }
                user {
                  uname
                  uid
                  contact {
                    name
                  }
                  image {
                    uri {
                      thumb
                      medium
                      big
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

  return httpClient.post('/graphql', {
    query: `
      mutation {
          postUpdate(
            id: "123456789", 
            post: { 
              post_type: COMMENT, 
              reach_id: "356", 
              title: "test", 
              user_id: "0", 
              detail: "test", 
              gauge_id: "sdf", 
              metric_id: "sdf", 
              post_date: "sdf", 
              reading: 1.5
            }
            ) {
            id
            uid
          }
        }`
  })
}

export { fetchAlertsData, createAlert }
