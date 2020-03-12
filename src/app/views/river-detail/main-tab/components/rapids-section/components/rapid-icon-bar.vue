<template>
  <div class="rapid-icon-bar">
    <ul :class="{'edit-mode':editMode}">
      <template v-if="data.ishazard">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <title>warning--solid</title>
            <g fill="#232323">
              <g
                id="warning--solid"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <path
                  id="warning"
                  d="M.75 16a.75.75 0 0 1-.67-1.085L7.33.415a.75.75 0 0 1 1.34 0l7.25 14.5A.75.75 0 0 1 15.25 16H.75zm6.5-10v5h1.5V6h-1.5zM8 13.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0 1.5z"
                  fill="#232323"
                  fill-rule="nonzero"
                />
              </g>
            </g>
          </svg>
        </li>
      </template>
      <template v-if="data.isplayspot">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <title>surf</title>
            <g fill="#232323">
              <path
                fill="#232323"
                d="M15.7653856,0.2346146C12.4518032-0.8197008,6.1000485,1.4653728,0,11.4814663 c0.7344549,0.7344542,1.5143322,1.5143318,2.2592671,2.2592669S3.7840793,15.2655449,4.5185342,16 C14.534627,9.899951,16.8197002,3.548197,15.7653856,0.2346146z"
              />
            </g>
          </svg>
        </li>
      </template>
      <template v-if="data.isportage">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <title>walk</title>
            <g fill="#232323">
              <path
                d="M8.433,9.019l-.53,2.3,1.1,1.1V15h2V12a1,1,0,0,0-.293-.707Z"
                data-color="color-2"
              />
              <path
                d="M4.9,6.557l.5-2.188L2.757,5.03a1,1,0,0,0-.464.263L.586,7,2,8.414,3.511,6.9Z"
                data-color="color-2"
              />
              <path
                d="M12.684,5.052,10.148,5.9,8.4,4.729,8.587,3.9a2,2,0,1,0-1.95-.445L4.025,14.775l1.949.449L7.916,6.812l1.529,1.02A1,1,0,0,0,10,8a.981.981,0,0,0,.316-.052l3-1Z"
                fill="#232323"
              />
            </g>
          </svg>
        </li>
      </template>
      <template v-if="data.isputin">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <title>download-data</title>
            <g fill="#232323">
              <rect
                x="6"
                y="14"
                fill="#232323"
                width="4"
                height="2"
              />
              <rect
                x="6"
                fill="#232323"
                width="4"
                height="2"
              />
              <rect
                x="14"
                y="6"
                fill="#232323"
                width="2"
                height="4"
              />
              <rect
                y="6"
                fill="#232323"
                width="2"
                height="4"
              />
              <polygon
                data-color="color-2"
                points="12,8 9,8 9,4 7,4 7,8 4,8 8,12 "
              />
              <path
                fill="#232323"
                d="M2,2h2V0H1C0.4,0,0,0.4,0,1v3h2V2z"
              />
              <path
                fill="#232323"
                d="M15,0h-3v2h2v2h2V1C16,0.4,15.6,0,15,0z"
              />
              <path
                fill="#232323"
                d="M14,14h-2v2h3c0.6,0,1-0.4,1-1v-3h-2V14z"
              />
              <path
                fill="#232323"
                d="M2,12H0v3c0,0.6,0.4,1,1,1h3v-2H2V12z"
              />
            </g>
          </svg>
        </li>
      </template>
      <template v-if="data.istakeout">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <title>upload-data</title>
            <g fill="#232323">
              <rect
                x="6"
                y="14"
                fill="#232323"
                width="4"
                height="2"
              />
              <rect
                x="6"
                fill="#232323"
                width="4"
                height="2"
              />
              <rect
                x="14"
                y="6"
                fill="#232323"
                width="2"
                height="4"
              />
              <rect
                y="6"
                fill="#232323"
                width="2"
                height="4"
              />
              <polygon
                data-color="color-2"
                points="7,12 9,12 9,8 12,8 8,4 4,8 7,8 "
              />
              <path
                fill="#232323"
                d="M2,2h2V0H1C0.4,0,0,0.4,0,1v3h2V2z"
              />
              <path
                fill="#232323"
                d="M15,0h-3v2h2v2h2V1C16,0.4,15.6,0,15,0z"
              />
              <path
                fill="#232323"
                d="M14,14h-2v2h3c0.6,0,1-0.4,1-1v-3h-2V14z"
              />
              <path
                fill="#232323"
                d="M2,12H0v3c0,0.6,0.4,1,1,1h3v-2H2V12z"
              />
            </g>
          </svg>
        </li>
      </template>
      <template v-if="data.iswaterfall">
        <li>waterfall</li>
      </template>
    </ul>
    <template v-if="editMode">
      <cv-button
        size="small"
        kind="secondary"
        class="mr-spacing-sm"
        @click.exact="$emit('editRapid', data.name)"
      >
        Edit
      </cv-button>
      <cv-button
        size="small"
        kind="danger"
        @click.exact="$emit('deleteRapid', data.name)"
      >
        Delete
      </cv-button>
    </template>
  </div>
</template>
<script>
export default {
  name: 'rapid-icon-bar',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    editMode () {
      return this.$store.state.appGlobalState.appGlobalData.editMode
    }
  }
}
</script>
<style lang="scss" scoped>
.rapid-icon-bar {
  display: flex;
  align-items: center;
  ul {
    &.edit-mode {
      margin-right: $spacing-md;
    }
    li {
      display: inline;
      margin-left: 0.5rem;
    }
  }
}
</style>
