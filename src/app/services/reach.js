import http from "@/app/http"
import moment from 'moment'

export async function getReach(id) {
  return http
    .post('graphql', {
      query: `
              {
                reach(id: ${id}) {
                  avggradient
                  id
                  class
                  description
                  edited
                  edited
                  length
                  maxgradient
                  plat
                  plon
                  geom
                  photo {
                    id
                    post {
                      user {
                        uname
                        uid
                      }
                    }
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }
                  river
                  section
                }
              }
            
            `,
    })
    .then((res) => res.data);
}

export async function getReachReports(id) {

  return http
    .post('graphql', {
      query: `
        query {
            posts(reach_id: "${id}", post_types: JOURNAL, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
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
    .then(res => res.data.data.posts.data)
}

export async function getReachProjects(id) {
  return http
    .post('graphql/', {
      query: `
      {
        linker(source: RIVER, id: "${id}") {
          type
          data {
            __typename
            ... on Project {
              id
              name
              description
            }
          }
        }
      }
      `
    })
    .then(res => res.data)
}

export async function getReachNews(id) {
  return http
    .post('graphql', {
      query: `
              query {
                  getRiverArticles(id: ${id}) {
                      articles {
                      abstract
                      image {
                        uri {
                          thumb
                          medium
                          big
                        }
                      }
                      author
                      posted_date
                      title
                      contents
                      id
                      }
                  }
              }`
    })
    .then(res => res.data)
}

export async function getReachMap(id) {
  return http
    .post('/graphql', {
      query: `
                query {
                    reach(id: "${id}") {
                      direction_default
                      custom_destination
                      county
                      permitid
                      permitinfo
                      permiturl
                      shuttledetails
                      zipcode
                      geom
                    }

              }
              
              `
    })
    .then(res => res.data)
}

export async function getReachGallery(data) {
  return http
    .post('/graphql', {
      query: `
                query {
                  posts(
                    first: ${data.per_page},
                    post_types: [JOURNAL,PHOTO_POST],
                    reach_id: "${data.reach_id}", 
                    page: ${data.page}, 
                    orderBy: {field: REVISION, order: DESC}
                    ) {
                      data {
                        id
                        metric {
                          name
                          unit
                        }
                        gauge {
                          id
                          name
                        }
                        reading
                        photos {
                          image {
                            uri {
                              thumb
                              medium
                              big
                            }
                            file_size
                          }
                          id
                          author
                          caption
                          description
                          photo_date
                          poi_name
                          poi_id
                          subject
                        }
                      }
                      paginatorInfo {
                        count
                        perPage
                        currentPage
                        lastPage
                        total
                      }
                  
                    }  
                  }`
    })
    .then(res => res.data)
}

export async function getReachGages(id) {
  return http
    .post('/graphql', {
      query: `{
        getGaugeInformationForReachID(id: ${id}) {
          gauges {
              # rc
              # epoch
              gauge_reading
              gauge_metric
              gauge_comment
              range_comment
              class
              excluded
              rmin
              rmax
              gauge {
                  name
                  id
              }
              updated
              last_gauge_reading
              last_gauge_updated
              gauge_perfect
              adjusted_reach_class
            }
          }
        }`
    })
    .then(res => res.data)
}

export async function getReachEvents(id) {
  return http
    .post('graphql', {
      query: `
        query {
            linker(source: RIVER, id: "${id}") {    
              __typename,
              data {   
                __typename
                ... on Event {        
                  id,
                  category
                title,
                  dates { id,event_date,min,max,id,metric_id,start_time,end_time }      
                }
              }
            }
        }`
    })
    .then(res => res.data.data.linker)
}

export async function getReachCredits(id) {
  return http
    .post('/graphql', {
      query: `
              query {
                reach( id: ${id}) {
                    revisions(first:100,page:0){
                    data {
                        id
                        revision
                        sk {
                            uname
                            contact {
                                name  
                            }
                        }
                        revision_comment
                        edited
                        }
                    }
                }
            }`
    })
    .then(res => res.data)
}

export async function getReachComments(id) {

  return http
    .post('graphql', {
      query: `
        query Related{
            posts(reach_id: "${id}", post_types: COMMENT, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
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

export async function getReachAlerts(id) {

  return http
    .post('/graphql', {
      query: `
        query {
            posts(reach_id: "${id}", post_types: WARNING, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
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
          }`
    })
    .then(res => res.data)
}

export async function getReachAccidents(id) {

  return http.post('graphql', {
    query: `
      query {
        reach(id: ${id}) {
          accidents(first: 20, page: 1) {
            data {
              accident_date
              water_level
              status
              type
              factors {
                factor
              }
              injuries {
                injury
              }
              causes {
                cause
              }
              id
            }
          }
        }
      }`
  }).then(res => {
    const data = res.data.data.reach.accidents.data.map(a => {
      a.accident_date = moment(a.accident_date, 'YYYY-MM-DD HH:mm:ss')
      return a
    }).sort((a, b) => b.accident_date.unix() - a.accident_date.unix())
    return data
  })
}

export async function updateReach(data) {
  return http.post('graphql', {
    query: `
              mutation ($id:ID!, $reach: ReachInput!) {
                reachUpdate(id: $id, reach: $reach) {
                  river,
                  section,
                  class,
                  length,
                  avggradient,
                  maxgradient
                }
              }
            `,
    variables: data
  }).then(res => res.data)
}

export async function updateReachGeom(data) {
  return http
    .post('graphql', {
      query: `
                mutation ($id:ID!, $reach: ReachInput!) {
                  reachUpdate(id: $id, reach: $reach) {
                    geom,
                    ploc,
                    tloc,
                    length
                  }
                }
              `,
      variables: {
        id: data.id,
        reach: {
          geom: data.geom,
          ploc: data.ploc,
          tloc: data.tloc,
          length: data.length,
        },
      },
    })
    .then(res => res.data);
}

export async function createReach(data) {

  return http.post('graphql', {
    query: `
        mutation ($id:ID!, $reach: ReachInput!) {
          reachUpdate(id: $id, reach: $reach) {
            agency
            altname
            class
            county
            description
            gaugeinfo
            geom
            id
            length
            permitinfo
            permiturl
            ploc
            river
            section
            tloc
            zipcode
          }
        }
            `,
    variables: data
  }).then(res => res.data)
}