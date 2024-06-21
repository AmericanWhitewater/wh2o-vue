<template>
  <section class="mt-3 mb-lg">
    <div
        v-if="!loading && data"
        class="bx--data-table-container "

    >
      <table class="bx--data-table no-x-overflow scrollable">
        <thead>
        <tr>
          <th>
            Flow Rate
          </th>
          <th>
            Date / Time
          </th>
          <th>
            Data
          </th>
        </tr>
        </thead>
        <tbody class="gage-data-table">
        <tr
            v-for="(r, rowIndex) in readings"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
        >
          <td v-text="`${ formatReading(r.reading) } ${metric.unit}`"/>
          <td>{{ formatDate(r.updated) }}</td>
          <td><span v-if="r.data" >{{ r.data}}</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <utility-block
        v-if="loading"
        state="loading"
    />
    <utility-block
        v-if="!loading && error"
        state="error"
    />
  </section>
</template>
<script>
import Moment from 'moment'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { formatReadingWithFormat, getEmptyMetric } from '@/app/global/lib/gages'

export default {
  name: 'gage-readings',
  components: {
    UtilityBlock
  },
  props:
      {
        metrics:{type:Array, required:true, default:()=>[]}
      },
  data: () => ({
    columns: ['Reading', 'Updated']
  }),
  computed: {
    ...mapState({
      data: state => state.GageReadings.data,
      loading: state => state.GageReadings.loading,
      error: state => state.GageReadings.error
    }),
    metric () {
      return this.metrics?.find(m => m.id === this.data[0].metric.toString()) ?? getEmptyMetric()
    },
    readings(){
      return cloneDeep(this.data ?? []).sort((a,b)=>b.updated-a.updated)
    }

  },
  methods: {
    formatReading (n) {

      return formatReadingWithFormat(n, this.metric.format)
    },
    formatDate (date) {
      return Moment.unix(date).format('llll')
    }
  },
  created () {
  }
}

// Copied from Apollo to avoid having a dependency.
function cloneDeep(value) {
  return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
  switch (Object.prototype.toString.call(val)) {
    case "[object Array]": {
      seen = seen || new Map;
      if (seen.has(val))
        return seen.get(val);
      var copy_1 = val.slice(0);
      seen.set(val, copy_1);
      copy_1.forEach(function (child, i) {
        copy_1[i] = cloneDeepHelper(child, seen);
      });
      return copy_1;
    }
    case "[object Object]": {
      seen = seen || new Map;
      if (seen.has(val))
        return seen.get(val);
      var copy_2 = Object.create(Object.getPrototypeOf(val));
      seen.set(val, copy_2);
      Object.keys(val).forEach(function (key) {
        copy_2[key] = cloneDeepHelper(val[key], seen);
      });
      return copy_2;
    }
    default:
      return val;
  }
}
</script>
<style scoped lang="scss">

.no-x-overflow
{
  overflow-x: hidden;
}

.scrollable {

  tbody{
    display: block;
    height: 30rem;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }

  thead tr{
    display: block;
  }
}

</style>
