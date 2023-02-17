import FlowTab from "@/app/views/river-detail/components/flow-tab/flow-tab.vue";
import { createWrapper } from "@/utils";
import { GageChartControls } from "@/app/views/river-detail/components/flow-tab/components";

const mockStore = {
  state: {
    Global: {
      editMode: false,
    },
    User: {
      data: null,
    },
    GageReadings: {
      error: null,
      data: null,
      loading: null,
    },
    RiverDetail: {
      data: { id: 123, gaugeinfo: "This is ta test" },
    },
    RiverGages: {
      data: [],
      error: null,
      loading: false,
    },
    GageMetrics: {
      data: null,
    },
    RiverEvents: {
      data: null,
    },
  },
  dispatch: jest.fn(),
  getters: {
    "RiverEvents/releases": () => null,
  },
};

const options = {
  mocks: {
    $titleCase: jest.fn(),
    $store: mockStore,
    $route: {
      params: {
        id: "123",
      },
    },
  },

  stubs: ["FlowChart", "FlowStats"],
  methods: {
    setActiveGageId: jest.fn(),
  },
};

describe("FlowTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it loads gages when component created", () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(FlowTab, options);

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(
      1,
      "RiverGages/getProperty",
      "123"
    );
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it("it shows loading gages block and gauge description text when loading gages", () => {
    mockStore.state.RiverGages.loading = true;

    const wrapper = createWrapper(FlowTab, options);

    expect(wrapper.find(".bx--inline-loading__text").text()).toBe(
      "loading gages..."
    );
    expect(wrapper.findAll(".gage-description").length).toBe(1);
  });

  it("it shows no gages block when reach has no linked gages", () => {
    mockStore.state.RiverGages.loading = false;

    const wrapper = createWrapper(FlowTab, options);

    expect(wrapper.find(".utility-block-wrapper .utility-block-title").text()).toBe(
      "No Gages"
    );
    expect(wrapper.find(".utility-block-wrapper .utility-block-text").text()).toBe(
      "this reach doesn't have any associated gages"
    );
  });

  it("it shows gage description", () => {
    mockStore.state.RiverGages.loading = false;
    mockStore.state.RiverGages.data = {
      ranges: [
        {
          range_min: "R0",
          range_max: "R9",
          min: 2.3,
          max: 3.3,
          time_adjustment: null,
          range_comment: null,
          gauge_perfect: false,
          gauge_estimated: false,
          adjusted_reach_class: null,
          gauge_important: false,
          gauge_metric: 8,
          gauge_id: 7470,
        },
      ],
      gauges: [
        {
          rc: 0.4500000000000002,
          epoch: 1614274175.60862,
          time_adjustment: null,
          gauge_reading: 2.75,
          gauge_metric: 8,
          gauge_comment: null,
          delay_update: 0,
          range_comment: null,
          class: "med",
          excluded: false,
          rmin: 2.3,
          rmax: 3.3,
          gauge: {
            name: "PINEY CREEK AT RALEIGH, WV",
            id: "7470",
            source: "usgs",
            source_id: "03185000",
            updates: [
              { metric: { id: "8", name: "Feet Stage" } },
              { metric: { id: "2", name: "Flow" } },
            ],
          },
          updated: 355655.39138,
          last_gauge_reading: 2.75,
          last_gauge_updated: 896,
          gauge_perfect: false,
          adjusted_reach_class: null,
        },
      ],
    };
    mockStore.state.GageReadings.loading = true;

    const wrapper = createWrapper(FlowTab, options);

    expect(wrapper.find(".gage-description").text()).toBe("This is ta test");
  });

  it("shows no results block when no gage readings available", async () => {
    mockStore.state.GageReadings.loading = false;
    mockStore.state.GageReadings.data = [];
    options.data = () => ({
      activeGageId: "7470",
      activeMetricId: 8,
      selectedTimespan: "h:mm a",
      viewMode: "chart",

      refreshedDescription: "",
      updatedDescription: "",
    });

    const wrapper = createWrapper(FlowTab, options);
    wrapper.vm.setActiveGageId("7470");
    wrapper.vm.setActiveMetricId(8);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".utility-block-text").text()).toBe(
      "no gage readings for your chosen parameters, please try again"
    );
  });

  it("builds flow chart when readings available", () => {
    mockStore.state.GageReadings.data = [
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588464896,
        reading: "1580",
        updated: 1588464896,
        data: null,
        id: 17777068196257,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588468480,
        reading: "1560",
        updated: 1588468480,
        data: null,
        id: 17777068196707,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588472064,
        reading: "1560",
        updated: 1588472064,
        data: null,
        id: 17777068197157,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588475648,
        reading: "1550",
        updated: 1588475648,
        data: null,
        id: 17777068197607,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588479232,
        reading: "1550",
        updated: 1588479232,
        data: null,
        id: 17777068198057,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588482816,
        reading: "1550",
        updated: 1588482816,
        data: null,
        id: 17777068198507,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588486400,
        reading: "1540",
        updated: 1588486400,
        data: null,
        id: 17777068198957,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588489984,
        reading: "1540",
        updated: 1588489984,
        data: null,
        id: 17777068199407,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588493696,
        reading: "1540",
        updated: 1588493696,
        data: null,
        id: 17777068199857,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588497280,
        reading: "1550",
        updated: 1588497280,
        data: null,
        id: 17777068200307,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588500864,
        reading: "1550",
        updated: 1588500864,
        data: null,
        id: 17777068200757,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588504448,
        reading: "1560",
        updated: 1588504448,
        data: null,
        id: 17777068201207,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588508032,
        reading: "1560",
        updated: 1588508032,
        data: null,
        id: 17777068201657,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588511616,
        reading: "1580",
        updated: 1588511616,
        data: null,
        id: 17777068202107,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588515200,
        reading: "1580",
        updated: 1588515200,
        data: null,
        id: 17777068202557,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588518784,
        reading: "1600",
        updated: 1588518784,
        data: null,
        id: 17777068203007,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588522496,
        reading: "1610",
        updated: 1588522496,
        data: null,
        id: 17777068203457,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588526080,
        reading: "1620",
        updated: 1588526080,
        data: null,
        id: 17777068203907,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588529664,
        reading: "1650",
        updated: 1588529664,
        data: null,
        id: 17777068204357,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588533248,
        reading: "1660",
        updated: 1588533248,
        data: null,
        id: 17777068204807,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588536832,
        reading: "1670",
        updated: 1588536832,
        data: null,
        id: 17777068205257,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588540416,
        reading: "1700",
        updated: 1588540416,
        data: null,
        id: 17777068205707,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588544000,
        reading: "1710",
        updated: 1588544000,
        data: null,
        id: 17777068206157,
      },
      {
        gauge_id: 4139,
        metric: 2,
        nv: 1588547584,
        reading: "1720",
        updated: 1588547584,
        data: null,
        id: 17777068206607,
      },
    ];

    const wrapper = createWrapper(FlowTab, options);

    expect(wrapper.find(".gage-grid").exists()).toBe(true);
  });

  it("sets active gage", async () => {
    mockStore.state.GageReadings.loading = false;
    mockStore.state.GageReadings.data = [];
    options.data = () => ({
      activeGageId: "7470",
      activeMetricId: 8,
      selectedTimespan: "h:mm a",
      viewMode: "chart",

      refreshedDescription: "",
      updatedDescription: "",
    });
    mockStore.state.RiverGages.data = {
      ranges: [
        {
          range_min: "R0",
          range_max: "R9",
          min: 2.3,
          max: 3.3,
          time_adjustment: null,
          range_comment: null,
          gauge_perfect: false,
          gauge_estimated: false,
          adjusted_reach_class: null,
          gauge_important: false,
          gauge_metric: 8,
          gauge_id: 7470,
        },
      ],
      gauges: [
        {
          rc: 0.4500000000000002,
          epoch: 1614274175.60862,
          time_adjustment: null,
          gauge_reading: 2.75,
          gauge_metric: 8,
          gauge_comment: null,
          delay_update: 0,
          range_comment: null,
          class: "med",
          excluded: false,
          rmin: 2.3,
          rmax: 3.3,
          gauge: {
            name: "PINEY CREEK AT RALEIGH, WV",
            id: "7470",
            source: "usgs",
            source_id: "03185000",
            updates: [
              { metric: { id: "8", name: "Feet Stage" } },
              { metric: { id: "2", name: "Flow" } },
            ],
          },
          updated: 355655.39138,
          last_gauge_reading: 2.75,
          last_gauge_updated: 896,
          gauge_perfect: false,
          adjusted_reach_class: null,
        },
      ],
    };
    const wrapper = createWrapper(FlowTab, options);
    const controls = wrapper.findComponent(GageChartControls);
    controls.vm.$emit("gage-change", "4139");

    await wrapper.vm.$nextTick();

    expect(options.methods.setActiveGageId).toHaveBeenNthCalledWith(1, "4139");
    //expect(options.methods.setActiveGageId).toHaveBeenNthCalledWith(2, "4139");
  });
});
