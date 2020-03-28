import { httpClient } from '@/app/global/services'

const fetchRiverSearchData = data => {
  return httpClient.get('/content/River/search/.json', {
    params: {
      state: data.state ? data.state : '',
      river: data.river,
      level: data.level,
      include: data.include,
      atLeast: data.atLeast,
      atMost: data.atMost
    }
  })
}

export { fetchRiverSearchData }
