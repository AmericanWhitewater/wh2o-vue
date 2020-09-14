import projectsData from '@/app/views/river-detail/shared/state/main-tab/projects-data.js'
import { fetchReachProjectsData } from '@/app/views/river-detail/shared/services/projects.js'
import flushPromises from 'flush-promises'

jest.mock('@/app/views/river-detail/shared/services/projects.js')

const commit = jest.fn()

const result = {
  data: {
    linker: [
      {
        type: 'PROJECT',
        data: [
          {
            __typename: 'Project',
            id: '6',
            name: 'White Salmon Restoration (WA)',
            description: "American Whitewater has been engaged in a long-term effort to protect and restore one of the Pacific Northwest's most spectacular year-around whitewater rivers."
          },
          {
            __typename: 'Project',
            id: '96',
            name: 'Volcano Country (OR/WA)',
            description: "The rivers of Volcano Country within and surrounding the Gifford Pinchot National Forest represent some of the nation's most spectacular whitewater resources."
          }
        ]
      }
    ]
  }
}

describe('projectsData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches alerts data and handles success', async () => {
    fetchReachProjectsData.mockResolvedValueOnce(result)

    await projectsData.actions['[PROJECTS] FETCH_PROJECTS_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[PROJECTS] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[PROJECTS] DATA_SUCCESS', result.data.linker[0].data)
  })

  it('fetches alerts data and handles error', async () => {
    const error = {
      errors: ['lorem error']
    }

    fetchReachProjectsData.mockResolvedValueOnce(error)

    await projectsData.actions['[PROJECTS] FETCH_PROJECTS_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[PROJECTS] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[PROJECTS] DATA_ERROR', error.errors)
  })
})
